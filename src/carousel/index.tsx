import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { Component, createRef } from 'react';
import './index.css';

export class CarouselItem extends Component<any, any> {
  render() {
    return (
      <div
        className={`dar-carousel-item`}
        style={{
          transform: `translateX(${this.props.translate || 0}px)`,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export class Carousel extends Component<any, any> {
  static Item = CarouselItem;
  myRef = createRef<any>();
  constructor() {
    super();
    this.state = {
      count: [],
      active: 0,
      enableAnimation: true,
    };
  }
  componentDidMount(): void {
    const count = this.state.count
    React.Children.forEach(this.props.children, (child, i) => {
      if (child.type === CarouselItem) count.push({});
    });
    this.setState({ count });
  }
  goTo = (index) => {
    this.setState(() => {
      setTimeout(() => {
        let { count } = this.state;
        count = count.length;
        if (index >= count) {
          this.tranlateFirstToLast(index, 0);
        } else if (index < 0) {
          this.tranlateFirstToLast(index, count - 1);
        } else {
          this.setState({ active: index });
        }
      });
      return { enableAnimation: true };
    });
  };

  tranlateFirstToLast = (index, target) => {
    const content = this.myRef.current.getBoundingClientRect();
    this.state.count[target]['translate'] = target === 0 ? content.width : -content.width;
    this.setState(() => {
      setTimeout(() => {
        this.state.count[target] = {};
        this.setState({ count: this.state.count, active: target, enableAnimation: false });
      }, 250);
      return { count: this.state.count, active: index };
    });
  };
  render() {
    const { count, active, enableAnimation } = this.state;
    const { goTo, myRef } = this;
    return (
      <>
        <div className={`dar-carousel-container`}>
          <div className={`dar-carousel-quick dar-carousel-pre`} onClick={() => goTo(active - 1)}>
            <LeftOutlined className={`dar-carousel-pre-icon`} />
          </div>
          <div className={`dar-carousel-quick dar-carousel-next`} onClick={() => goTo(active + 1)}>
            <RightOutlined className={`dar-carousel-next-icon`} />
          </div>
          <div
            ref={myRef}
            className={`dar-carousel-content`}
            style={{
              width: `${count.length * 100}%`,
              left: `${active * -100}%`,
              transition: `${enableAnimation ? 'left 0.25s ease-in-out' : ''}`,
            }}
          >
            {count.length &&
              React.Children.map(this.props.children, (child, i) => {
                if (child.type === CarouselItem)
                  return React.cloneElement(child, {
                    translate: count[i]['translate'],
                  });
              })}
          </div>
          <div className={`dar-carousel-dots`}>
            {count.map((_, index) => (
              <div
                key={index}
                className={`dar-carousel-dot ${active === index ? 'dar-carousel-dot-active' : ''}`}
                onClick={() => goTo(index)}
              ></div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
