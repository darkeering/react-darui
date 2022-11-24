import React from 'react';
import { createPortal } from 'react-dom';
import './index.css';

const doc = document.body;
export type dropdownItem = {
  key: string | number;
  title: string;
} & string;
type IProps = {
  /**
   * @description 下拉框数组
   * @default []
   */
  items?: dropdownItem[];
  /**
   * @description 点击事件
   */
  onClick?: (item: any) => void;
  visible?: boolean;
  position?: { x?: number; y?: number; w?: number };
};
export function Menus({
  visible = false,
  position = { x: -1000, y: -1000 },
  items = [],
  onClick,
}: IProps) {
  return (
    <>
      {createPortal(
        <ul
          className="dar-dropdown-ul"
          style={{
            display: visible ? 'block' : 'none',
            top: position?.y,
            left: position?.x,
            width: position?.w + 'px',
          }}
        >
          {items.map((item) => {
            return (
              <li
                className="dar-dropdown-li"
                key={typeof item === 'string' ? item : item.key}
                onClick={() => onClick?.(item)}
              >
                <span>{typeof item === 'string' ? item : item.title}</span>
              </li>
            );
          })}
        </ul>,
        doc,
      )}
    </>
  );
}
