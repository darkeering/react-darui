import { CheckOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import './index.css';
type IProps = {
    /**
   * @description 默认选中状态
   * @default false
   */
     checked?: boolean;
    /**
   * @description 是否不可用
   * @default false
   */
     disabled?: boolean;
}
export class Checkbox extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      checked: !!props.checked || false,
    };
  }
  onClick = () => {
    if (!this.props.disabled) {
      this.setState({ checked: !this.state.checked });
    }
  };
  render() {
    const { onClick } = this;
    const { checked } = this.state;
    const { children, disabled } = this.props;
    return (
      <div
        className={`dar-checkbox-container ${
          checked ? 'dar-checkbox-checked' : 'dar-checkbox-unchecked'
        } ${disabled ? 'dar-checkbox-disabled' : ''}`}
        onClick={onClick}
      >
        <input
          className="dar-checkbox-input"
          type="checkbox"
          name=""
          id="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={() => {}}
        />
        <span className={`dar-checkbox-span`}>
          <CheckOutlined className={`dar-checkbox-icon`} />
        </span>
        <label className='dar-checkbox-label' htmlFor="checkbox">{children}</label>
      </div>
    );
  }
}
