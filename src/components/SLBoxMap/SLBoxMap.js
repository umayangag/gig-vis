import React, {Component} from 'react';

import './SLBoxMap.css'
import customBoxData from '../../data/json/lk.svg.parsed.json.box50.json';
import districtStatsData from '../../data/json/district_stats.json';

function dataToSVG(boxData, nameToStyleMap) {
  const STEP = boxData.STEP;
  const boxGroupList = boxData.box_group_list;
  return (
    <svg className="SLBoxMap">
      {
        boxGroupList.map(
          function (boxGroup, i) {
            const name = boxGroup.name;
            let style = {};
            if (nameToStyleMap[name]) {
              style = nameToStyleMap[name];
            }
            return boxGroup.box_points.map(
              function ([x, y]) {
                return <rect key={'text' + boxGroup.name + x + y} className="SLBoxMapRect" style={style}
                             x={x - STEP / 2} y={y - STEP / 2} width={STEP} height={STEP}/>
              },
            );
          },
        )
      }
      {
        boxGroupList.map(
          function (boxGroup, i) {
            const [cx, cy] = boxGroup.centre_point;
            return <text key={'text' + boxGroup.name + i} className="SLBoxMapText" x={cx - STEP / 2}
                         y={cy - STEP / 2}>{boxGroup.name}</text>;
          },
        )
      }
    </svg>
  );
}

function getColorStyles(data, keyField, attrField) {
  const valueList = data.map(
    function (datum) {
      return [datum[attrField], datum[keyField]];
    }
  ).sort(
    function (a, b) {
      return a[0] < b[0];
    }
  );

  const n = valueList.length;
  let keyToStyleMap = {};
  let valueColorList = [];
  for (let i = 0; i < valueList.length; i++) {
    const [value, key] = valueList[i];
    const h = Math.round(240 * i / n);
    const color = 'hsla(' + h + ', 80%, 60%, 0.9)';
    keyToStyleMap[key] = {fill: color};
    valueColorList.push([value, color]);
  }
  return [keyToStyleMap, valueColorList.reverse()];
}


export default class SLBoxMap extends Component {
  render() {
    const [nameToStyleMap,] = getColorStyles(districtStatsData, 'district', 'population_density');
    return dataToSVG(customBoxData, nameToStyleMap);
  }

}
