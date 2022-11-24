import React, { PropsWithChildren, useState } from 'react';
import './index.css';
type IProps = PropsWithChildren & {
  /**
   * @description 点击事件
   */
  onClick?: (event: any) => void;
  /**
   * @description 类型
   * @default 'primary'
   */
  type?: string;
  className: any;
};
export function Button(props: IProps) {
  const [wave, setwave] = useState(false);
  let timer = 0;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (timer) {
      clearTimeout(timer);
      setwave(false);
    }
    setwave(true);
    timer = setTimeout(() => {
      setwave(false);
    }, 400);
    props.onClick?.(e);
  };
  return (
    <button
      className={`dar-button dar-button-${wave ? 'wave' : ''} dar-button-${
        props.type ? props.type : 'primary'
      } ${props.className}`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
