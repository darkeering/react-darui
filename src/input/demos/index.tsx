import React from 'react';
import { Input } from 'react-darui';

export default function dButtonDemo() {
  const onChange = (value: any, evt: any) => {
    console.log(value);
    
  }
  return (
    <Input onChange={onChange}></Input>
  )
}