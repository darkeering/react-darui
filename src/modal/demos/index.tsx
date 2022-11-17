import React, { Component } from 'react';
import { Button, Modal } from 'react-darui';

export default class index extends Component<any, any> {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  setShow = () => {
    Modal.open({
      title: 'Modal Title',
      content: (
        <div>
          <p>112233</p>
          <p>112233</p>
          <p>112233</p>
          <p>112233</p>
          <p>112233</p>
        </div>
      ),
    });
  };
  render() {
    return (
      <>
        <Button onClick={this.setShow}>open modal</Button>
      </>
    );
  }
}
