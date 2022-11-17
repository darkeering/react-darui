import React, { Component } from 'react';
import { Segmented } from 'react-darui';

export default class index extends Component {
  options = [
    {
      key: 1,
      value: <div>
        <div>123</div>
        <div>456</div>
      </div>,
    },
    {
      key: 2,
      value: 'age',
    },
    {
      key: 3,
      value: 'height',
      selected: true
    },
  ];
  render() {
    return (
      <>
        <Segmented options={this.options}></Segmented>
      </>
    );
  }
}
