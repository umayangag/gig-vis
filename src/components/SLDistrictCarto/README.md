Basic Cartogram

```js
<div>
  <SLDistrictCarto
    nameToStyleMap={{
      "Jaffna": {fill: 'green'},  
      "Anuradhapura": {fill: 'red'},
      "Hambantota": {fill: 'blue'},
    }}
    nameToScaleMap={{
      "Jaffna": 2.0,
      "Anuradhapura": 2.0,
      "Hambantota": 0.5,
    }}
  />
</div>
```

Cartogram weighted by population

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteRedGreenBlue, getScale} from '../../data/DataUtils.js';

const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => (x['population'] / x['total_area']),
    getPaletteRedGreenBlue(),
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
    title="Pop. Density (People/Sq.K.m.)"
    valueColorList={valueColorList}
    formatValueFunc={(x) => Math.round(x)}
  />
  <SLDistrictCarto
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={nameToScaleMap}
  />
</div>
```

<!--
Seats

```js
import Legend from '../CommonComponents/Legend/Legend.js';
import {DISTRICT_STATS, getColorStyles, getPaletteBlend, getScale} from '../../data/DataUtils.js';

const [nameToStyleMap, valueColorList] =
  getColorStyles(
    DISTRICT_STATS,
    (x) => x['district'],
    (x) => (x['seats']),
    getPaletteBlend(112, 243),
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
    title="Seats"
    valueColorList={valueColorList}
    formatValueFunc={(x) => x}
  />
  <SLDistrictCarto
    nameToStyleMap={nameToStyleMap}
    nameToScaleMap={nameToScaleMap}
  />
</div>
``` -->
