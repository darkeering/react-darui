import React, { Component } from 'react';
import { Checkbox } from 'react-darui';

export default class index extends Component {
  render() {
    return (
      <>
        <Checkbox disabled={true} checked={true}>checked disabled</Checkbox>
        <br />
        <Checkbox disabled={true} checked={false}>unchecked disabled</Checkbox>
        <br />
        <Checkbox disabled={false}>can check</Checkbox>
      </>
    );
  }
}
