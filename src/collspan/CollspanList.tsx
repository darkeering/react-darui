import { RightOutlined } from '@ant-design/icons';
import React, { cloneElement, Component, createRef, ReactNode } from 'react';
import { Context } from './context';
import './index.less';
import { MenuItem } from './types';
type IProps = {
  items: MenuItem[];
  height?: number;
};
export class CollspanList extends Component<IProps, any> {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { items } = this.props;
    return (
      <Context.Consumer>
        {({ clickMenu, clickItem, height }) => (
          <>
            {items.map((item) => (
              <div key={item.key}>
                {item.children ? (
                  <div
                    className={`dar-collspan-menu ${item.active ? 'dar-collspan-halfActive' : ''}`}
                    style={{
                      height: `${height}px`,
                      lineHeight: `${height}px`,
                      padding: `0 20px 0 ${(item.level || 0) * 20}px`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onClick={() => clickMenu(item)}
                  >
                    {item.title}
                    <RightOutlined
                      className={`dar-collspan-rotate ${item.open ? 'dar-collspan-rotate90' : ''}`}
                    />
                  </div>
                ) : (
                  <div
                    className={`dar-collspan-item ${item.active ? 'dar-collspan-active' : ''}`}
                    style={{
                      height: `${height}px`,
                      lineHeight: `${height}px`,
                      padding: `0 20px 0 ${(item.level || 0) * 20}px`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onClick={() => clickItem(item)}
                  >
                    {item.title}
                  </div>
                )}
                {item.children && (
                  <div
                    className={`dar-collspan-container ${
                      item.open ? 'dar-collspan-open' : 'dar-collspan-close'
                    }`}
                    style={{ height: `${height * (item.subNum || 0)}px` }}
                  >
                    <CollspanList items={item.children}></CollspanList>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </Context.Consumer>
    );
  }
}

// handleClick = (ref, index: any) => {
//   console.log(ref.current.offsetHeight);
//   if (this.state.items[index].open) {
//     this.state.items[index].open = !this.state.items[index].open;
//     this.state.items[index].height = `0px`;
//     this.setState({ items: this.state.items });
//   } else {
//     const cloneEl = ref.current.cloneNode(true);
//     cloneEl.style = `height: auto;visibility:hidden;overflow:initial`;
//     document.body.appendChild(cloneEl);
//     let h = cloneEl.getBoundingClientRect().height;
//     document.body.removeChild(cloneEl);
//     this.state.items[index].open = !this.state.items[index].open;
//     this.state.items[index].height = `${h}px`;

//     this.setState({ items: this.state.items });
//     ref.current.style = `height: auto;`;
//   }
// };
