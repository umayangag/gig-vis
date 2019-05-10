import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './AreaLegend.css';

export default class AreaLegend extends Component {
  render() {
    const n = this.props.valueDimList.length;
    const nValues = 7;
    const gap = Math.round((n + 1) / (nValues - 1));

    return (
      <div>
        <span className="AreaLegendTitle">
          {this.props.title}
        </span>
        {
          this.props.valueDimList.map(
            function ([value, dim], i) {
              if (i % gap !== 0) {
                return null;
              }
              const dim2 = Math.sqrt(dim);
              const style = {
                width: dim2,
                height: dim2,
                backgroundColor: this.props.color,
              };
              return (
                <div style={style} key={i} className="AreaLegendItem">
                  <div className="AreaLegendText">
                    {this.props.formatValueFunc(value)}
                  </div>
                </div>
              );
            }.bind(this),
          )
        }
      </div>
    );
  }
}

AreaLegend.propTypes = {
  valueDimList: PropTypes.array,
  formatValueFunc: PropTypes.func,
  color:PropTypes.string,
  title:PropTypes.string
};
