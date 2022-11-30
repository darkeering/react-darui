import React, { cloneElement, Component, createRef, ReactNode } from 'react';
import { Context } from './context';
import { CollspanList } from 'react-darui';
import './index.css';
import { MenuItem } from './types';
type IProps = {
  /**
   * @description 树形数据
   */
  items: MenuItem[];
  /**
   * @description 高度
   * @default '24px'
   */
  height?: number;
  /**
   * @description 高度
   */
  style?: Object;
};
type IState = {
  items: MenuItem[];
};
export class Collspan extends Component<any, IState> {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.initData(this.props.items, 1);
    this.setState({ items: this.props.items });
  }

  initData = (items: MenuItem[], level: number, parent?: MenuItem) => {
    items.forEach((item) => {
      item['level'] = level;
      item['open'] = !!item['open'];
      item['active'] = !!item['active'];
      item['subNum'] = 0;
      if (parent) {
        item['parent'] = parent;
      }
      item['add'] = function () {
        if (this.parent && this.parent.open) {
          (this.parent.subNum as number)++;
          this.parent.add();
        }
      };
      item['setActive'] = function () {
        if (this.parent) {
          this.parent.active = true;
          this.parent.setActive();
        }
      };
      item['add']();
      if (item.children) this.initData(item.children, level + 1, item);
    });
  };

  clickMenu = (menu: any) => {
    this.setOpen(this.state.items, menu.key);
    this.calculateNum(this.state.items);
    this.setState({ items: this.state.items });
  };
  clickItem = (menu: any) => {
    this.setActiveFalse(this.state.items, menu.key);
    this.setActive(this.state.items, menu.key);
    this.setState({ items: this.state.items });
  };

  setActiveFalse = (items: MenuItem[], key: number) => {
    items.forEach((item) => {
      item['active'] = false;
      if (item.key === key) item['active'] = true;
      if (item.children) this.setActiveFalse(item.children, key);
    });
  };
  setActive = (items: MenuItem[], key: number) => {
    items.forEach((item) => {
      if (item.key === key) {
        item['active'] = true;
        item['setActive']();
      }
      if (item.children) this.setActive(item.children, key);
    });
  };

  calculateNum(items: MenuItem[]) {
    items.forEach((item) => {
      item['subNum'] = 0;
      item['add']();
      if (item.children) this.calculateNum(item.children);
    });
  }

  setOpen(items: MenuItem[], key: number) {
    items.forEach((item) => {
      if (item.key === key) item['open'] = !item['open'];
      if (item.children) this.setOpen(item.children, key);
    });
  }

  render() {
    const { clickMenu, clickItem } = this;
    const { items } = this.state;
    const { height, style } = this.props;
    return (
      <Context.Provider value={{ clickMenu, clickItem, height: height || 40 }}>
        <div style={style}>
          <CollspanList items={items}></CollspanList>
        </div>
      </Context.Provider>
    );
  }
}
