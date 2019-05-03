import React, {Component} from 'react';

import PolygonGroupList from '../CommonComponents/PolygonSVG/PolygonSVG.js';

import SL_DISTRICT_POLYGON_GROUP_LIST from '../../py_scripts/lk.svg.parsed.json';

export default class SLDistrictMap extends Component {
  render() {
    return (
      <PolygonGroupList
        polygonGroupList={SL_DISTRICT_POLYGON_GROUP_LIST}
        nameToStyleMap={this.props.nameToStyleMap}
        nameToScaleMap={this.props.nameToScaleMap}
      />
    );
  }
}
