import json
import xml.etree.ElementTree as ETree

fin = open('../data/json/name_map.json')
tokenTypes = ['l', 'L', 'm', 'M', 'Z', 's', 'v', 'c', 'h', 'H', 'V', 'C', 'S']


def parse(file_name, scale):
    tree = ETree.parse(file_name)
    svg = tree.getroot()
    polygon_group_list = []

    for path in svg:
        if 'path' in path.tag:
            polygon_list = []
            current_polygon = None

            d = path.attrib['d']
            d = d.replace('-', ' -')
            d = d.replace(',', ' ')
            d = d.replace('M', 'M ')
            d = d.replace('z', ' Z')
            d = d.replace('Z', ' Z')
            d = d.replace('s', ' s ')
            d = d.replace('l', ' l ')
            d = d.replace('m', ' m ')
            d = d.replace('v', ' v ')
            d = d.replace('c', ' c ')
            d = d.replace('C', ' C ')
            d = d.replace('h', ' h ')
            d = d.replace('H', ' H ')
            d = d.replace('V', ' V ')
            d = d.replace('L', ' L ')
            d = d.replace('S', ' S ')
            tokens = list(filter(lambda t: t.strip(), d.split(' ')))
            if tokens[len(tokens) - 1] not in ['z', 'Z']:
                tokens.append('Z')
            print(tokens)

            i = 0

            def round_f(f):
                return int(f * 100 + 0.5) / 100.0

            def s_to_f(s):
                return round_f(float(s)) * scale

            def get_point(j):
                return s_to_f(tokens[j]), s_to_f(tokens[j + 1])

            x = None
            y = None
            while True:
                current_token = tokens[i]
                print(current_token)
                if current_token == 'M':
                    (x, y) = get_point(i + 1)
                    current_polygon = [(x, y)]
                    i += 3

                elif current_token == 'm':
                    (dx, dy) = get_point(i + 1)
                    x = round_f(x + dx)
                    y = round_f(y + dy)
                    current_polygon = [(x, y)]
                    i += 3

                elif current_token in ['h']:
                    (dx, dy) = s_to_f(tokens[i + 1]), 0
                    x = round_f(x + dx)
                    y = round_f(y + dy)
                    current_polygon.append((x, y))
                    i += 2

                elif current_token in ['v']:
                    (dx, dy) = 0, s_to_f(tokens[i + 1])
                    x = round_f(x + dx)
                    y = round_f(y + dy)
                    current_polygon.append((x, y))
                    i += 2

                elif current_token in ['l', 'c', 's']:
                    i += 1
                    while tokens[i] not in tokenTypes:
                        (dx, dy) = get_point(i)
                        x = round_f(x + dx)
                        y = round_f(y + dy)
                        current_polygon.append((x, y))
                        i += 2

                elif current_token in ['V']:
                    i += 1
                    while tokens[i] not in tokenTypes:
                        (x, y) = current_polygon[len(current_polygon) - 1][0], s_to_f(tokens[i])
                        current_polygon.append((x, y))
                        i += 1

                elif current_token in ['H']:
                    i += 1
                    while tokens[i] not in tokenTypes:
                        (x, y) = s_to_f(tokens[i]), current_polygon[len(current_polygon) - 1][1]
                        current_polygon.append((x, y))
                        i += 1

                elif current_token in ['L', 'C', 'S']:
                    i += 1
                    print(tokens[i], get_point(i))
                    while tokens[i] not in tokenTypes:
                        print(i)
                        (x, y) = get_point(i)
                        current_polygon.append((x, y))
                        i += 2

                elif current_token == 'Z':
                    polygon_list.append(current_polygon)
                    i += 1

                else:
                    print("token not handled", tokens[i])

                if i >= len(tokens):
                    break

            polygon_group_list.append({
                'polygon_list': polygon_list,
                'name': path.attrib['name'],
            })
        f_out = open('%s.parsed.json' % file_name, 'w')
        f_out.write(json.dumps(polygon_group_list, indent=4))
        f_out.close()


if __name__ == '__main__':
    SCALE_X = 400.0 / 1000
    SCALE_Y = 600.0 / 1750
    SCALE = min(SCALE_X, SCALE_Y)
    print(SCALE * SCALE * 1000 * 1750)
    parse('../data/svg/test.svg', SCALE)
