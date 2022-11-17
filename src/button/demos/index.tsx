import React from 'react';
import { Button } from 'react-darui';

export default function dButtonDemo() {
  const onClick = (evt: any) => {
    console.log(evt);
    
  }
  return (
    <Button onClick={onClick}>Primary</Button>
  )
}