import React, { Component, createRef } from 'react';
import './index.css';

type option = {
  key: string | number;
  value: string;
  selected?: boolean;
};

type IProps = {
  /**
   * @description item数据
   */
  options: option[];
};
type IState = {
  /**
   * @description item数据
   */
  options: option[];
  /**
   * @description 白色背景块的宽度
   * @default 0
   */
  animationWidth?: number;
  /**
   * @description 白色背景块的距离左边框的距离
   * @default 0
   */
  animationLeft?: number;
};
export class Segmented extends Component<any, IState> {
  myRef = createRef<any>();
  constructor(props: IProps) {
    super(props);
    this.state = {
      options: props.options,
      animationWidth: 0,
      animationLeft: 0,
    };
  }

  componentDidMount(): void {
    console.log(this.myRef);
    let selectedNode: any;
    (this.myRef.current as any).childNodes.forEach((childNode: any) => {
      if (childNode.dataset.selected) {
        selectedNode = childNode;
      }
    });
    if (!selectedNode) selectedNode = (this.myRef.current as any).childNodes[1];
    if (selectedNode) {
      this.setState({
        animationWidth: selectedNode.offsetWidth,
        animationLeft: selectedNode.offsetLeft,
      });
    }
  }

  selectOption = (key, event) => {
    event.persist();
    const { options } = this.state;
    options.forEach((item) => {
      item.selected = false;
      if (item.key === key) {
        item.selected = true;
      }
    });
    this.setState({
      options,
      animationWidth: event.currentTarget.offsetWidth,
      animationLeft: event.currentTarget.offsetLeft,
    });
  };
  render() {
    const { selectOption, myRef } = this;
    const { options, animationWidth, animationLeft } = this.state;
    return (
      <div className={`dar-seg-container`}>
        <div className={`dar-seg-bg`} ref={myRef}>
          <span
            className={`dar-seg-item-animation`}
            style={{ width: `${animationWidth}px`, left: `${animationLeft}px` }}
          ></span>
          {options.map((item) => (
            <span
              key={item.key}
              data-selected={item.selected}
              className={`dar-seg-item`}
              onClick={(event) => selectOption(item.key, event)}
            >
              {item.value}
            </span>
          ))}
        </div>
      </div>
    );
  }
}
