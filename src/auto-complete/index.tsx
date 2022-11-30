import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Input, Menus } from 'react-darui';
import { createPortal } from 'react-dom';
import './index.css';
type dropdownItem = {
  key: string | number;
  title: string;
} | string;
type IProps = {
  /**
   * @description 下拉菜单
   * @default []
   */
  items?: dropdownItem[];
};
export function AutoComplete({ items = [] }: any) {
  const [visible, setvisible] = useState(false);
  const [position, setposition] = useState<{ x?: number; y?: number; w?: number }>({});
  const [typeCode, settypeCode] = useState('');
  const myRef = useRef<{ setinputValue: (value: string) => void }>({ setinputValue: () => {} });
  const onChange = (value: any, e: any) => {
    const position = (e.target as any).getBoundingClientRect();
    const { offsetHeight, offsetWidth } = e.target as any;
    setposition({
      x: position.x,
      y: position.y + offsetHeight,
      w: offsetWidth,
    });
    settypeCode(value);
    setvisible(true);
  };
  const handleClick = (item: any) => {
    if (typeof item === 'string') {
      return myRef.current.setinputValue(item);
    } else {
      return myRef.current.setinputValue(item.title);
    }
  };
  useEffect(() => {
    const callback = () => {
      setvisible(false);
    };
    if (visible) {
      document.addEventListener('click', callback);
    }

    return () => {
      document.removeEventListener('click', callback);
    };
  }, [visible]);

  return (
    <>
      <Input onRef={myRef} onChange={onChange}></Input>
      <Menus
        visible={visible}
        position={position}
        items={items?.filter((item: any) => {
          if (typeof item === 'string') {
            return item.indexOf(typeCode) > -1;
          } else {
            return item.title.indexOf(typeCode) > -1;
          }
        })}
        onClick={handleClick}
      ></Menus>
    </>
  );
}
