import React, { Component } from 'react';
import './index.css';

type IProps = {
  /**
   * @description 默认开关
   * @default false
   */
  on?: boolean;
  /**
   * @description 禁用
   * @default false
   */
  disabled?: boolean;
};
export class Switch extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      on: !!props.on,
    };
  }
  toggle = () => {
    if (!this.props.disabled) {
      this.setState({ on: !this.state.on });
    }
  };
  render() {
    const { toggle } = this;
    const { on } = this.state;
    const { disabled } = this.props;
    return (
      <div
        className={`dar-switch-container ${on ? 'dar-switch-on' : 'dar-switch-close'} ${
          disabled ? 'dar-switch-disabled' : ''
        }`}
        onClick={toggle}
      >
        <div className={`dar-switch-bg`}>
          <div className={`dar-switch-circle`}></div>
        </div>
      </div>
    );
  }
}
