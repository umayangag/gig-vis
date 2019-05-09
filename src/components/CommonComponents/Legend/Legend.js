import React, {Component} from 'react';
import './Legend.css';

export default class Legend extends Component {
  render() {
    const n = this.props.valueColorList.length;
    const nValues = 7;
    const gap = Math.round((n + 1) / (nValues - 1));
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td>
                <span className="LegendTitle">
                  {this.props.title}
                </span>
            </td>
            {
              this.props.valueColorList.map(
                function ([value, color], i) {
                  if (i % gap !== 0) {
                    return null;
                  }
                  return (
                    <td key={i}
                      className="LegendItem"
                      style={{backgroundColor: color}}
                    >
                      {Math.round(value)}
                    </td>
                  )
                },
              )
            }
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
