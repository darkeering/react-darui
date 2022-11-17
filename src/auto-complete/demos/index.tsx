import React from 'react';
import { AutoComplete } from 'react-darui';

export default function dButtonDemo() {
  const onChange = (value: any) => {
    console.log(value);
    
  }
  const items = [
    '111 item click',
    '222 item click',
    '333 item click',
  ]
  return (
    <AutoComplete items={items}></AutoComplete>
  )
}