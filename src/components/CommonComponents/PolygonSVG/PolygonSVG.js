import React, {Component} from 'react';

import './PolygonSVG.css'


function getDims(polygonGroupList) {
  return polygonGroupList.reduce(
    function([width, height], polygonGroup) {
      return polygonGroup.polygon_list.reduce(
        function([width, height], polygon) {
          return polygon.reduce(
            function([width, height], [x, y]) {
              return [Math.max(width, x), Math.max(height, y)];
            },
            [width, height],
          );
        },
        [width, height],
      );
    },
    [0, 0],
  );
}

function getCentrePoint(polygonGroup) {
  const [sx, sy, sw] = polygonGroup.polygon_list.reduce(
    function([sx, sy, sw], polygon) {
      const n = polygon.length;
      for (var i in polygon) {
        const [x1, y1] = polygon[i];
        const [x2, y2] = polygon[(i + 1) % n];
        const [x, y] = [(x1 + x2) * 0.5, (y1 + y2) * 0.5];

        const dx = (x2 - x1);
        const dy = (y2 - y1);
        const d = Math.sqrt(dx * dx + dy * dy);

        // const [x, y] = polygon[i];
        // const d = 1;

        [sx, sy, sw] = [sx + x * d, sy + y * d, sw + d];
      }
      return [sx, sy, sw];
    },
    [0, 0, 0],
  );
  return [sx * 1.0 / sw, sy * 1.0 / sw];
}


class Polygon extends Component {
  getCentrePoint() {
    const [sx, sy, n] = this.props.points.reduce(
      function([sx, sy, n], [x, y]) {
        return [sx + x, sy + y, n + 1];
      },
      [0, 0, 0],
    );
    return [sx * 1.0 / n, sy * 1.0 / n];
  }
  render() {
    const style = this.props.style;
    const scale2 = this.props.scale;
    const scale = Math.sqrt(scale2);
    const [cx, cy] = this.getCentrePoint();
    const pointsStr = this.props.points.map(
      function([x, y]) {
        return [
          cx + (x - cx) * scale,
          cy + (y - cy) * scale
        ].join(',');
      },
    ).join(' ');
    return <polygon className="Polygon" style={style} points={pointsStr} />;
  }
}

class PolygonGroup extends Component {
  render() {
    const polygonGroup = this.props.polygonGroup;
    const [cx, cy] = getCentrePoint(polygonGroup);

    return (
      <svg className="PolygonGroup">
        {
          polygonGroup.polygon_list.map(
            function(points) {
              return (
                <Polygon
                  points={points}
                  style={this.props.style}
                  scale={this.props.scale}
                />
              );
            }.bind(this),
          )
        }
        <text
          className="PolygonText"
          x={cx}
          y={cy}>
            {polygonGroup.label ? polygonGroup.label : polygonGroup.name}
        </text>
      </svg>
    );
  }
}

export default class PolygonGroupList extends Component {
  render() {
    const polygonGroupList = this.props.polygonGroupList;
    const nameToStyleMap = this.props.nameToStyleMap;
    const nameToScaleMap = this.props.nameToScaleMap;

    const [width, height] = getDims(polygonGroupList);

    return (
      <svg
        style={{width: width, height: height}}
        className="PolygonGroupList"
        onClick={this.props.onClick}
      >
        {
          polygonGroupList.map(
            function(polygonGroup, i) {
              var style = {};
              const name = polygonGroup.name;
              if (nameToStyleMap[name]) {
                style = nameToStyleMap[name];
              }

              var scale = 1.0;
              if (nameToScaleMap[name]) {
                scale = nameToScaleMap[name];
              }

              return (
                <PolygonGroup
                  polygonGroup={polygonGroup}
                  style={style}
                  scale={scale}
                />
              );
            },
          )
        }
        <div className="Info">(Click to toggle scaling)</div>
      </svg>
    );
  }
}
