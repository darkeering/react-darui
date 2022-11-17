import React from 'react';
import { Dropdown } from 'react-darui';

export default function dButtonDemo() {
  const items = [
    '111 item click',
    '222 item click',
    '333 item click',
  ]
  return (
    <Dropdown items={items} onClick={(item: any) => console.log(item)}></Dropdown>
  )
}