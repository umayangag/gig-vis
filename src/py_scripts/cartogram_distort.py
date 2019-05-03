import json
ORIGINAL_FILE_NAME = 'lk.svg.parsed.json'
fin = open(ORIGINAL_FILE_NAME)
polygon_group_list = json.loads(fin.read())

DISTORT_WEIGHTS = {
    'Colombo': 7.0,
    # 'Kandy': 2.0,
    # 'Anuradhapura': 2.0,
}

sum_scale = 0
n_scale = 0
for (h, polygon_group) in enumerate(polygon_group_list):
    # computer centroid
    sx = 0
    sy = 0
    n = 0
    for (i, polygon) in enumerate(polygon_group["polygon_list"]):
        for (j, [x, y]) in enumerate(polygon):
            sx += x
            sy += y
            n += 1
    cx = sx * 1.0 / n
    cy = sy * 1.0 / n
    polygon_group["centre"] = [cx, cy]
    polygon_group_list[h] = polygon_group

    name = polygon_group["name"]
    scale = DISTORT_WEIGHTS.get(name, 1.0)
    sum_scale += scale
    n_scale += 1

for (h, polygon_group) in enumerate(polygon_group_list):
    name = polygon_group["name"]
    scale = DISTORT_WEIGHTS.get(name, 1.0)
    scale_w = scale * n_scale / sum_scale
    print (name, scale_w)

    for (i, polygon) in enumerate(polygon_group["polygon_list"]):
        for (j, [x, y]) in enumerate(polygon):
            dx = 0
            dy = 0
            sum_f = 0
            for (h2, polygon_group2) in enumerate(polygon_group_list):
                [cx, cy] = polygon_group2["centre"]
                name = polygon_group2["name"]
                scale = DISTORT_WEIGHTS.get(name, 1.0)
                scale_w = scale * n_scale / sum_scale

                d2 = (x - cx) ** 2 + (y - cy) ** 2
                f = 1.0 / d2
                sum_f += f

                dx += (x - cx) * (scale_w - 1) * f
                dy += (y - cy) * (scale_w - 1) * f

            x1 = x + dx / sum_f
            y1 = y + dy / sum_f
            polygon[j] = [x1, y1]
        polygon_group["polygon_list"][i] = polygon
    polygon_group_list[h] = polygon_group

fout  = open('%s.carto.json' % (ORIGINAL_FILE_NAME), 'w')
fout.write(json.dumps(polygon_group_list, indent=2))
fout.close()
