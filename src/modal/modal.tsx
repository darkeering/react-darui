import { CloseOutlined } from '@ant-design/icons';
import React, { Component, createRef, useState } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { Button } from 'react-darui';
import './index.css';

export class ModalContainer extends Component<any, any> {
  myRef = createRef<any>();
  x = 0;
  y = 0;
  constructor() {
    super();
    this.state = {
      config: { content: '' },
      origin: { x: 0, y: 0 },
      show: false,
      display0: false,
      hidden: false,
      enter: false,
      leave: false,
    };
    window.addEventListener('click', (event) => {
      this.x = event.x;
      this.y = event.y;
    });
  }
  open = (config) => {
    this.setState(() => {
      setTimeout(() => {
        this.setDisplay0();
      }, 100);
      return { config, show: true, display0: true, hidden: false, enter: false, leave: false };
    });
  };

  setDisplay0 = () => {
    console.log();

    const x = this.x - this.myRef.current.offsetLeft + this.myRef.current.offsetWidth / 2;
    const y = this.y - this.myRef.current.offsetTop;
    this.setState(() => {
      setTimeout(() => {
        this.setState({ show: true, display0: false, hidden: false, enter: true, leave: false });
      }, 100);
      return {
        origin: { x, y },
        show: true,
        display0: false,
        hidden: true,
        enter: false,
        leave: false,
      };
    });
  };

  setHidden = () => {};

  remove = () => {
    this.setState({ show: false });
  };

  close = () => {
    this.setState(() => {
      setTimeout(() => {
        this.remove();
      }, 250);
      return { show: true, display0: false, hidden: false, enter: false, leave: true };
    });
  };

  render() {
    const { config, show, animate, display0, origin, enter, leave, hidden } = this.state;
    const { close, myRef } = this;
    return (
      <>
        {show && (
          <>
            <div className={`dar-modal-mask ${enter ? 'dar-modal-mask-in' : ''} ${
                  leave ? 'dar-modal-mask-out' : ''
                }`}></div>
            <div
              className={`dar-modal-container ${display0 ? 'dar-modal-display0' : ''} ${
                hidden ? 'dar-modal-hidden' : ''
              }`}
              ref={myRef}
            >
              <div
                className={`dar-modal-item ${enter ? 'dar-modal-item-in' : ''} ${
                  leave ? 'dar-modal-item-out' : ''
                }`}
                style={{ transformOrigin: `calc(${origin.x}px) calc(${origin.y}px)` }}
              >
                <div className={`dar-modal-item-header`}>
                  <span className={`dar-modal-item-title`}>{config.title}</span>
                  <CloseOutlined className={`dar-modal-item-close`} onClick={() => close()} />
                </div>
                <div className={`dar-modal-item-content`}>{config.content}</div>
                <div className={`dar-modal-item-bottom`}>
                  <Button className={`dar-modal-item-button`}>Confirm</Button>
                  <Button className={`dar-modal-item-button`}>Cancle</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export const Modal = (() => {
  let container = document.getElementById('modal-container');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'modal-container');
    document.body.appendChild(container);
  }

  const instance = ReactDOM.render(<ModalContainer></ModalContainer>, container);
  return {
    open: (config) => instance.open(config),
  };
})();
