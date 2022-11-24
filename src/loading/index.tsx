import React, { Component } from 'react';
import './index.css';

export class Loading extends Component {
  render() {
    return (
      <div className={`dar-load-container`}>
        <span className={`dar-load-span`}>
          <i className={`dar-load-item`}></i>
          <i className={`dar-load-item`} style={{ animationDelay: '0.25s' }}></i>
          <i className={`dar-load-item`} style={{ animationDelay: '0.75s' }}></i>
          <i className={`dar-load-item`} style={{ animationDelay: '0.5s' }}></i>
        </span>
      </div>
    );
  }
}
