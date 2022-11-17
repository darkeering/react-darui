import React, { Component } from 'react';
import { Collspan } from 'react-darui';

export default class index extends Component {
  render() {
    const items = [
      {
        key: 'menu1',
        title: 'Navigation 1',
        open: true,
        children: [
          {
            key: '1-1',
            title: 'option 1-1',
            children: [
              {
                key: '1-1-1',
                title: 'option 1-1-1',
              },
              {
                key: '1-1-2',
                title: 'option 1-1-2',
              },
              {
                key: '1-1-3',
                title: 'option 1-1-3',
              },
            ],
          },
          {
            key: '1-2',
            title: 'option 1-2',
          },
          {
            key: '1-3',
            title: 'option 1-3',
          },
        ],
      },
      {
        key: 'menu2',
        title: 'Navigation 2',
        children: [
          {
            key: '2-1',
            title: 'option 2-1',
          },
          {
            key: '2-2',
            title: 'option 2-2',
          },
          {
            key: '2-3',
            title: 'option 2-3',
          },
        ],
      },
      {
        key: 'menu3',
        title: 'Navigation 3',
      },
    ];
    return <Collspan items={items} style={{width: '300px'}}></Collspan>;
  }
}
