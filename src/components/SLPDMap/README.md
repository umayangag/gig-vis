
Basic, un-styled, SLPDMap example:

```js
<SLPDMap
  nameToStyleMap={{}}
  nameToScaleMap={{}}
/>
```
With Colombo highlighted:

```js
<SLPDMap
  nameToStyleMap={{
    Colombo: {fill: 'red'}
  }}
  nameToScaleMap={{}}
/>
```

By population density:

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteRedGreenBlue} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['population'] * 1.0 / x['total_area'],
    getPaletteRedGreenBlue(),
  );

<div>
  <Legend
    title="Pop. per sq.km."
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x)}
  />
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={{}}
  />
</div>
```

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteOnLight} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['population'] * 1.0 / x['total_area'],
    getPaletteOnLight(0),
  );

  <div>
    <Legend
      title="Pop. per sq.km."
      valueColorList={valueColorList}
      formatValueFunc={(x) => Math.round(x)}
    />
    <SLPDMap
      nameToStyleMap={nameToStyleMap}
      nameToScaleMap={{}}
    />
  </div>
```

By scaled population, and population density:

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import AreaLegend from '../CommonComponents/AreaLegend/AreaLegend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteOnLight, getScale} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['population'] * 1.0 / x['total_area'],
    getPaletteOnLight(0),
  );

const [nameToScaleMap, valueDimList] =
  getScale(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['population'],
    (x) => x['total_area'],
  );

<div>
  <Legend
    title="Pop. per sq.km."
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x)}
  />
  <AreaLegend
    title="Population"
    valueDimList={valueDimList}
    formatValueFunc={(x) => ((x > 1000000) ? Math.round(x / 100000) / 10 +
    'M' : Math.round(x / 10000) * 10 + 'K')}
    color={'hsla(0, 100%, 50%, 0.6)'}
  />
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={nameToScaleMap}
  />

</div>
```

By scaled and colored by inland water area:

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import AreaLegend from '../CommonComponents/AreaLegend/AreaLegend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteOnLight, getScale} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['inland_water_area'] / x['total_area'],
    getPaletteOnLight(210),
  );

const [nameToScaleMap, valueDimList] =
  getScale(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['inland_water_area'],
    (x) => x['total_area'],
  );

<div>
  <Legend
    title="Inland Water"
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x * 100) + '%' }
  />
  <AreaLegend
    title="Inland Water (sq. km)"
    valueDimList={valueDimList}
    formatValueFunc={(x) => Math.round(x)}
    color={'hsla(210, 100%, 50%, 0.6)'}
  />
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={nameToScaleMap}
  />

</div>
```
Poverty

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteOnLight, getScale} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['poverty'] / x['population'],
    getPaletteOnLight(0),
  );

<div>
  <Legend
    title="Poverty %"
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x * 100) + '%' }
  />
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={{}}
  />
</div>
```

Mahinda Rajapakse Vote Share

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteOnLight, getScale} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['raja']  / (x['siri'] + x['raja']),
    getPaletteOnLight(243),
  );

<div>
  <Legend
    title="Rajapakse %"
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x * 100) + '%' }
  />
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={{}}
  />
</div>
```

Maitripala Sirisena Vote Share

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteOnLight, getScale} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['siri'] / (x['siri'] + x['raja']),
    getPaletteOnLight(112),
  );

<div>
  <Legend
    title="Sirisena %"
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x * 100) + '%' }
  />
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={{}}
  />
</div>
```

Sirisena - Rajapakse Vote Share

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteBlend, getScale} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => (x['siri'] - x['raja'])/ (x['siri'] + x['raja']),
    getPaletteBlend(112, 243),
  );

<div>
  <Legend
    title="Sirisena - Rajapakse %"
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x * 100) + '%' }
  />
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={{}}
  />
</div>
```

Computer Literacy

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteOnLight, getScale} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => (x['computer_literate_pop']) / (x['population']),
    getPaletteOnLight(0),
  );

<div>
  <Legend
    title="Computer Literacy %"
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x * 100) + '%' }
  />
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={{}}
  />
</div>
```


Seats for the UNFGG in the 2015 Parlimentary Elections

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import AreaLegend from '../CommonComponents/AreaLegend/AreaLegend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteBlend, getScale} from '../../data/DataUtils.js';
const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => (x['unfgg'] - x['upfa']) * 1.0 / x['seats'],
    getPaletteBlend(114, 243),
  );

const [nameToScaleMap, valueDimList] =
  getScale(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => x['seats'],
    (x) => x['total_area'],
  );

<div>
  <Legend
    title="Seats %"
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x * 100) + '%' }
  />
  <AreaLegend
    title="UNFGG - UPFA Seats"
    valueDimList={valueDimList}
    formatValueFunc={(x) => (x)}
  />  
  <SLPDMap
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={nameToScaleMap}
  />

</div>
```
