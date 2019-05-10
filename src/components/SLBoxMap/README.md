SLBoxMap example:

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
<SLBoxMap nameToStyleMap={nameToStyleMap} />
```
