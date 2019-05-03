import json
import math

def is_on_segment(p, q, r):
    if (q[0] <= max(p[0], r[0]) and q[0] >= min(p[0], r[0]) and q[1] <= max(p[1], r[1]) and q[1] >= min(p[1], r[1])):
        return True
    return False

def orientation(p, q, r):
    val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
    if (val == 0):
         return 0
    if (val > 0):
        return 1
    return 2

def is_do_intersect(p1, q1, p2, q2):
    o1 = orientation(p1, q1, p2)
    o2 = orientation(p1, q1, q2)
    o3 = orientation(p2, q2, p1)
    o4 = orientation(p2, q2, q1)

    if (o1 != o2 and o3 != o4):
        return True

    if (o1 == 0 and is_on_segment(p1, p2, q1)):
        return True

    if (o2 == 0 and is_on_segment(p1, q2, q1)):
        return True

    if (o3 == 0 and is_on_segment(p2, p1, q2)):
        return True

    if (o4 == 0 and is_on_segment(p2, q1, q2)):
        return True

    return False

INF = 100000
def is_inside(polygon, p):
    n = len(polygon)
    if (n < 3):
        return False

    extreme = (INF, p[1])

    count = 0
    i = 0
    while True:
        next = i + 1
        if is_do_intersect(polygon[i], polygon[next], p, extreme):
            if (orientation(polygon[i], p, polygon[next]) == 0):
               return is_on_segment(polygon[i], p, polygon[next])
            count += 1
        i = next
        if i == n - 1:
            break
    return count % 2 == 1

def get_centre_point(box_points):
    min_x = INF
    max_x = 0
    min_y = INF
    max_y = 0

    for [x, y] in box_points:
        min_x = min(min_x, x)
        max_x = max(max_x, x)
        min_y = min(min_y, y)
        max_y = max(max_y, y)

    return ((min_x + max_x) * 0.5, (min_y + max_y) * 0.5 )


def build_boxmap(STEP):
    POLYON_GROUP_LIST_FILE_NAME = 'lk.svg.parsed.json'
    fin = open(POLYON_GROUP_LIST_FILE_NAME)
    polygon_group_list = json.loads(fin.read())

    max_x = 0
    max_y = 0
    for polygon_group in polygon_group_list:
        for polygon in polygon_group["polygon_list"]:
            for [x, y] in polygon:
                max_x = max(x, max_x)
                max_y = max(y, max_y)
    width = math.ceil(max_x / STEP) * STEP
    height = math.ceil(max_y / STEP) * STEP
    print(width, height)

    box_group_map = {}
    for x in range(0, width, STEP):
        for y in range(0, height, STEP):
            for polygon_group in polygon_group_list:
                for polygon_i, polygon in enumerate(polygon_group["polygon_list"]):
                    if is_inside(polygon, [x, y]):
                        name = polygon_group["name"]
                        if name not in box_group_map:
                            box_group_map[name] = {
                                'name': name,
                                'box_points': [],
                            }
                        box_group_map[name]['box_points'].append([x, y])

    box_group_list = list(box_group_map.values())
    n_boxes = 0
    for i, box_group in enumerate(box_group_list):
        box_group["centre_point"] = get_centre_point(box_group["box_points"])
        box_group_list[i] = box_group
        n_boxes += len(box_group["box_points"])

    box_data = {
        "box_group_list": box_group_list,
        "n_boxes": n_boxes,
        "STEP": STEP,
    }
    print('n_boxes = %d' % n_boxes)

    fout = open('%s.box%d.json' % (POLYON_GROUP_LIST_FILE_NAME, STEP), 'w')
    fout.write(json.dumps(box_data, indent=2))
    fout.close()

if __name__ == '__main__':
    build_boxmap(10)
