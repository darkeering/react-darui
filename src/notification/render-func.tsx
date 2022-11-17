import { CloseOutlined } from '@ant-design/icons';
import React, { Component, useState } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { Button } from 'react-darui';
import './index.less';

export class NotificationContainer extends Component<any, any> {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }
  open = (item) => {
    this.state.list.push(item);
    this.setState(() => {
      setTimeout(() => {
        this.close(item.message);
      }, 3000);
      return { list: this.state.list };
    });
  };
  remove = (message) => {
    this.setState({ list: this.state.list.filter((item) => item.message !== message) });
  };

  close = (message) => {
    const find = this.state.list.find((item) => item.message === message);
    if (find) {
      find['out'] = true;
      this.setState(() => {
        setTimeout(() => {
          this.remove(message);
        }, 250);
        return this.state.list;
      });
    }
  };

  render() {
    const { list } = this.state;
    const { close } = this;
    return (
      <div className={`dar-noti-container`}>
        {list.map((item, index) => (
          <div
            key={item.message}
            className={`dar-noti-item ${item['out'] ? 'dar-noti-item-out' : ''}`}
          >
            <div className={`dar-noti-item-header`}>
              <span className={`dar-noti-item-title`}>{item.title || 'title'}</span>
              <CloseOutlined className={`dar-noti-item-close`} onClick={() => close(item.message)} />
            </div>
            <div className={`dar-noti-item-content`}>{item.message}</div>
          </div>
        ))}
      </div>
    );
  }
}

export const Notification = (() => {
  let container = document.getElementById('message-container');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'message-container');
    document.body.appendChild(container);
  }

  const instance = ReactDOM.render(<NotificationContainer></NotificationContainer>, container);
  return {
    info: (message) => instance.open(message),
  };
})();
