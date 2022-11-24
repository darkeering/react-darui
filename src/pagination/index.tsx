import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  EllipsisOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import React, { Component } from 'react';
import './index.css';

const Pre5 = (
  <div style={{ position: 'relative', fontSize: '16px' }}>
    <div style={{ position: 'absolute' }}>
      <EllipsisOutlined className="pagi-ellips" />
    </div>
    <div>
      <DoubleLeftOutlined className="pagi-more" />
    </div>
  </div>
);
const Next5 = (
  <div style={{ position: 'relative', fontSize: '16px' }}>
    <div style={{ position: 'absolute' }}>
      <EllipsisOutlined className="pagi-ellips" />
    </div>
    <div>
      <DoubleRightOutlined className="pagi-more" />
    </div>
  </div>
);
type IProps = {
  /**
   * @description 每页条数
   * @default 10
   */
  size?: number;
  /**
   * @description 总条数
   */
   total: number;
  /**
   * @description 默认当前页数
   * @default 1
   */
   current?: number;
};
export class Pagination extends Component<IProps, any> {
  constructor(props) {
    super(props);
    const size = props.size || 10;
    const sum = Math.ceil(props.total / props.size);
    const current = props.current > sum ? 1 : props.current < 0 ? 1 : props.current;
    this.state = {
      current,
      sum,
      size,
      display: [{ key: 1, value: 1 }],
    };
  }
  componentDidMount(): void {
    const { current } = this.props;
    this.setDisplay(current);
  }
  setDisplay = (i) => {
    const { sum } = this.state;

    const middle = [];
    if (i - 2 < 1) {
      for (let x = 1; x <= 5 && x <= sum; x++) {
        if (x <= 1 || x >= sum) continue;
        middle.push({
          key: x,
          value: x,
        });
      }
    } else if (i + 2 > sum) {
      let x = Math.max(sum - 5 + 1, 1);
      for (; x <= sum; x++) {
        if (x <= 1 || x >= sum) continue;
        middle.push({
          key: x,
          value: x,
        });
      }
    } else {
      for (let x = i - 2; x <= i + 2; x++) {
        if (x <= 1 || x >= sum) continue;
        middle.push({
          key: x,
          value: x,
        });
      }
    }
    if (middle[0]?.key > 2) middle.unshift({ key: '-5', value: Pre5 });
    if (sum - 2 >= middle[middle.length - 1]?.key) middle.push({ key: '+5', value: Next5 });
    let display = [{ key: 1, value: 1 }, ...middle];
    if (sum !== 1) display = [...display, { key: sum, value: sum }];
    this.setState({ display });
  };
  goTo = (i) => {
    const { sum } = this.state;
    this.setDisplay(i);
    this.setState({ current: i < 1 ? 1 : i > sum ? sum : i });
  };
  render() {
    const { goTo } = this;
    const { current, sum, display } = this.state;
    return (
      <div className={`container`}>
        <div
          className={`border-container ${current === 1 ? 'pagi-disabled' : ''}`}
          onClick={() => {
            current > 1 && goTo(current - 1);
          }}
        >
          <LeftOutlined />
        </div>
        {display.map((item) => {
          if (typeof item.key === 'number') {
            return (
              <div
                key={item.key}
                className={`border-container ${current === item.key ? 'pagi-active' : ''}`}
                onClick={() => goTo(item.key)}
              >
                <span>{item.value}</span>
              </div>
            );
          } else {
            return (
              <div
                key={item.key}
                title={item.key}
                className={`ellips-container`}
                onClick={() => {
                  if (item.key === '+5') goTo(current + 5);
                  else goTo(current - 5);
                }}
              >
                <span>{item.value}</span>
              </div>
            );
          }
        })}
        <div
          className={`border-container ${current === sum ? 'pagi-disabled' : ''}`}
          onClick={() => {
            current < sum && goTo(current + 1);
          }}
        >
          <RightOutlined />
        </div>
      </div>
    );
  }
}
