import React, { Component } from 'react';
import { Table, Button } from 'react-darui';

export default class index extends Component {
  colsConfig = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'age',
      title: 'Age',
    },
    {
      key: 'address',
      title: 'Address',
    },
    {
      key: 'tags',
      title: 'Tags',
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, rowData) => <>
        <Button className={''}>Edit {rowData.name}</Button>
        {' '}
        <Button className={''}>Delete</Button>
      </>
    },
  ];
  data = [
    {
      name: 'Eason',
      age: '18',
      address: '辽宁，大连',
      tags: 'NICE',
    },
    {
      name: 'Joshon',
      age: '120',
      address: '江苏，南京',
      tags: 'DEVELOPER',
    },
    {
      name: 'Joshon',
      age: '120',
      address: '江苏，南京',
      tags: 'DEVELOPER',
    },
    {
      name: 'Joshon',
      age: '120',
      address: '江苏，南京',
      tags: 'DEVELOPER',
    },
    {
      name: 'Joshon',
      age: '120',
      address: '江苏，南京',
      tags: 'DEVELOPER',
    },
    {
      name: 'Joshon',
      age: '120',
      address: '江苏，南京',
      tags: 'DEVELOPER',
    },
  ];
  render() {
    return <Table colsConfig={this.colsConfig} data={this.data}></Table>;
  }
}
