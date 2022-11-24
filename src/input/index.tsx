import React, { PropsWithChildren, Ref, useEffect, useImperativeHandle, useState } from 'react';
import './index.css';
type IProps = {
  /**
   * @description 输入事件
   */
  onChange?: (value: any, evt: any) => void;
  /**
   * @description placeholder
   * @default 'please input'
   */
  placeholder?: string;
  onRef?: Ref<{ setinputValue: (value: string) => void }>;
};
function Input({ onChange, placeholder, onRef }: IProps, ref: any) {
  const [inputValue, setinputValue] = useState('');
  useImperativeHandle(onRef, () => {
    return {
      setinputValue,
    };
  });
  return (
    <input
      className="dar-input"
      type="text"
      value={inputValue}
      onChange={(evt) => {
        onChange?.(evt.target.value, evt);
        setinputValue(evt.target.value);
      }}
      placeholder={placeholder ? placeholder : 'please input'}
      ref={ref}
    ></input>
  );
}

export default React.forwardRef(Input);
