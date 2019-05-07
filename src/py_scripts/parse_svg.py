import json
import xml.etree.ElementTree as ET

fin = open('name_map.json')
NAME_MAP = json.loads(fin.read())


def parse(file_name, scale):
    tree = ET.parse(file_name)
    svg = tree.getroot()
    polygon_group_list = []

    for path in svg:
        if 'path' in path.tag:
            polygon_list = []
            current_polygon = None

            d = path.attrib['d']
            d = d.replace('-', ' -')
            d = d.replace('M', 'M ')
            d = d.replace('z', ' Z')
            d = d.replace('l', ' l ')
            d = d.replace('m', ' m ')
            tokens = list(filter(lambda x: x.strip(), d.split(' ')))

            i = 0
            path_info_list = []

            def round_f(f):
                return (int)(f * 100 + 0.5) / 100.0

            def s_to_f(s):
                return round_f((float)(s)) * scale

            def get_point(j):
                return (s_to_f(tokens[j]), s_to_f(tokens[j + 1]))

            x = None
            y = None
            while (True):
                current_token = tokens[i]
                if current_token == 'M':
                    (x, y) = get_point(i + 1)
                    current_polygon = [(x, y)]
                    i += 3

                if current_token == 'm':
                    (dx, dy) = get_point(i + 1)
                    x = round_f(x + dx)
                    y = round_f(y + dy)
                    current_polygon = [(x, y)]
                    i += 3

                if current_token == 'l':
                    point_list = []
                    i += 1
                    while (tokens[i] not in ['l', 'L', 'm', 'M', 'Z']):
                        (dx, dy) = get_point(i)
                        x = round_f(x + dx)
                        y = round_f(y + dy)
                        current_polygon.append((x, y))
                        i += 2

                if current_token == 'L':
                    point_list = []
                    i += 1
                    while (tokens[i] not in ['l', 'L', 'm', 'M', 'Z']):
                        (x, y) = get_point(i)
                        current_polygon.append((x, y))
                        i += 2

                if current_token == 'Z':
                    polygon_list.append(current_polygon)
                    i += 1

                if i >= len(tokens):
                    break

            polygon_group_list.append({
                'polygon_list': polygon_list,
                'name': NAME_MAP[path.attrib['name']],
            })
        fout = open('%s.parsed.json' % (file_name), 'w')
        fout.write(json.dumps(polygon_group_list, indent=4))
        fout.close()


if __name__ == '__main__':
    SCALE_X = 400.0 / 1000
    SCALE_Y = 600.0 / 1750
    SCALE = min(SCALE_X, SCALE_Y)
    print(SCALE * SCALE * 1000 * 1750);
    parse('lk.svg', SCALE)
