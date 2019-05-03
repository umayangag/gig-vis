import React, {Component} from 'react';

import PolygonGroupList from '../CommonComponents/PolygonSVG/PolygonSVG.js';

import SL_DISTRICT_POLYGON_GROUP_LIST from '../../py_scripts/lk.svg.parsed.json';


function getCartoDistort(nameToScaleMap) {
  var polygonGroupList = JSON.parse(JSON.stringify(SL_DISTRICT_POLYGON_GROUP_LIST));
  var sumScale = 0;
  var nScale = 0;

  polygonGroupList = polygonGroupList.map(
    function(polygonGroup, i) {
      // Compute Scale Stats
      const name = polygonGroup.name
      var scale = 1.0;
      if (nameToScaleMap[name]) {
        scale = nameToScaleMap[name];
      }
      sumScale += scale;
      nScale += 1;
      polygonGroup.scale = scale;

      // Compute Centre
      const [sx, sy, n] = polygonGroup.polygon_list.reduce(
        function([sx, sy, n], polygon) {
          for (var i in polygon) {
            const [x, y] = polygon[i];
            [sx, sy, n] = [sx + x, sy + y, n + 1];
          }
          return [sx, sy, n];
        },
        [0, 0, 0],
      );
      polygonGroup.centre = [sx * 1.0 / n, sy * 1.0 / n];
      return polygonGroup;
    },
  );

  var minX = 0, minY = 0;
  polygonGroupList = polygonGroupList.map(
    function(polygonGroup, i) {
      polygonGroup.polygon_list = polygonGroup.polygon_list.map(
        function(polygon) {
          return polygon.map(
            function([x, y]) {
              var dx = 0;
              var dy = 0;
              var sumR = 0;
              for (var j in polygonGroupList) {
                const [cx, cy] = polygonGroupList[j].centre;
                const scale = polygonGroupList[j].scale;
                const scaleW = 1 * scale * nScale / sumScale;

                const d = Math.pow(x - cx, 2) + Math.pow(y - cy, 2);
                const r = 1.0 / d;

                // if (i == j) {
                //   r *= 1;
                // }

                const f = (scaleW - 1) * r;
                sumR += r;

                dx += f * (x - cx);
                dy += f * (y - cy);
              }

              const k = 1.0 / sumR;
              const [x1, y1] = [x + dx * k, y + dy * k];
              minX = Math.min(minX, x1);
              minY = Math.min(minY, y1);
              return [x1, y1];
            },
          );
        }
      );
      return polygonGroup;
    },
  );

  polygonGroupList = polygonGroupList.map(
    function(polygonGroup, i) {
      polygonGroup.polygon_list = polygonGroup.polygon_list.map(
        function(polygon) {
          return polygon.map(
            function([x, y]) {
              return [x - minX, y - minY];
            }
          );
        },
      );
      return polygonGroup;
    },
  );

  return polygonGroupList;
}

export default class SLDistrictCarto extends Component {
  constructor(props) {
    super(props);
    this.state = {doScale: true};
  }
  render() {
    const polygonGroupList = this.state.doScale ? getCartoDistort(this.props.nameToScaleMap) : SL_DISTRICT_POLYGON_GROUP_LIST;
    return (
      <PolygonGroupList
        polygonGroupList={polygonGroupList}
        nameToStyleMap={this.props.nameToStyleMap}
        nameToScaleMap={{}}
        onClick={function(e) {
          this.setState({doScale: !this.state.doScale});
        }.bind(this)}
      />
    );
  }
}
