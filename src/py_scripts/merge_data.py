import json

fin1 = open('../data/json/district_stats.json')
fin2 = open('../data/json/district_stats2.json')
data1 = json.loads(fin1.read())
data2 = json.loads(fin2.read())

cdata = {}
for datum1 in data1:
    district = datum1['district']
    cdata[district] = datum1

for datum2 in data2:
    district = datum2['district']
    cdata[district].update(datum2)

data3 = list(cdata.values())
f_out = open('../data/json/district_stats3.json', 'w')
f_out.write(json.dumps(data3, indent=2))
