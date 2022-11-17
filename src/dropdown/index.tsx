import React, { useEffect, useState } from 'react';
import { Button, Menus } from 'react-darui';
import { createPortal } from 'react-dom';
export type dropdownItem = {
  key: string | number;
  title: string;
};
type IProps = {
  /**
   * @description 下拉菜单
   * @default []
   */
  items?: string[] | dropdownItem[];
  /**
   * @description 点击事件
   */
  onClick?: (item: any) => void;
};
export function Dropdown({ items = [], onClick }: IProps) {
  const [visible, setvisible] = useState(false);
  const [position, setposition] = useState<{ x?: number; y?: number }>({});

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.persist();
    const position = (e.target as any).getBoundingClientRect();
    const { offsetHeight } = e.target as any;
    setposition({
      x: position.x,
      y: position.y + offsetHeight,
    });

    setvisible(!visible);
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
      <Button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(e)}>
        Dropdown
      </Button>
      <Menus visible={visible} position={position} items={items} onClick={onClick}></Menus>
    </>
  );
}
