import {
  CalendarOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import './index.css';

const config = ['一', '二', '三', '四', '五', '六', '日'];

export class DataPicker extends Component<any, any> {
  myRef = createRef<any>();
  origin = {};
  top = 0;
  left = 0;
  today = {};
  constructor() {
    super();
    this.state = {
      show: false,
      calendar: [],
      selected: {},
      animation: 'in',
      placeholder: '',
      value: '',
    };
  }
  componentDidMount(): void {
    this.left = this.myRef.current.offsetLeft;
    this.top = this.myRef.current.offsetTop + this.myRef.current.offsetHeight;
    const today = new Date();
    this.today = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
    };
    this.setState({ selected: this.today });
    this.changeOrigin(today);
  }

  showCalendar = () => {
    this.setState(() => {
      return { show: true, animation: 'in' };
    });
  };

  select = (selectDate) => {
    this.changeOrigin(new Date(selectDate.year, selectDate.month - 1, selectDate.date));
    this.setState(() => {
      setTimeout(() => {
        this.leaveCalendar();
      });
      return { selected: selectDate };
    });
  };

  onEnter = () => {
    this.leaveCalendar();
  };

  onInput = (value) => {
    this.setState(() => {
      setTimeout(() => {
        const validationData = this.validateInput();
        if (validationData) {
          this.setState({ selected: validationData });
          this.changeOrigin(
            new Date(validationData.year, validationData.month - 1, validationData.date),
          );
        }
      });
      return { value: value };
    });
  };

  leaveCalendar = () => {
    const { selected } = this.state;
    this.setState(() => {
      setTimeout(() => {
        this.setState({ show: false });
      }, 250);
      return {
        animation: 'leave',
        value: `${selected.year}-${selected.month}-${selected.date}`,
      };
    });
  };

  validateInput = () => {
    const test = /^(\d{4})-(\d{1}|\d{2})-(\d{2}|\d{1})$/;
    if (!test.test(this.state.value)) return false;
    const inputDate = {
      year: Number(RegExp.$1),
      month: Number(RegExp.$2),
      date: Number(RegExp.$3),
    };
    const inputDateNew = new Date(inputDate.year, inputDate.month - 1, inputDate.date);
    if (
      inputDate.year !== inputDateNew.getFullYear() ||
      inputDate.month !== inputDateNew.getMonth() + 1 ||
      inputDate.date !== inputDateNew.getDate()
    )
      return false;
    return inputDate;
  };

  changeOrigin = (newOrigin) => {
    const year = newOrigin.getFullYear(); //年
    const month = newOrigin.getMonth() + 1; //月
    const date = newOrigin.getDate(); // 天
    const day = newOrigin.getDay(); // 星期几
    const firstMonthDay = new Date(year, month - 1, 1).getDay(); // 月1号星期几
    const monthLastDay = new Date(year, month, 0).getDate(); //月最后一天
    const preMonthLastDay = new Date(year, month - 1, 0).getDate(); //上一个月最后一天
    const arr = [];
    for (let i = 1; i <= monthLastDay; i++) {
      arr.push({ year, month, date: i, current: true });
    }
    // 往前追加
    if (firstMonthDay !== 1) {
      // 一号不是星期一,星期天是0
      const num = firstMonthDay ? firstMonthDay - 1 : 6;
      for (let i = 0; i < num; i++) {
        if (month <= 1) {
          arr.unshift({ year: year - 1, month: 12, date: preMonthLastDay - i });
        } else {
          arr.unshift({ year, month: month - 1, date: preMonthLastDay - i });
        }
      }
    }
    //往后追加
    const more = 42 - arr.length;
    for (let i = 1; i <= more; i++) {
      if (month >= 12) {
        arr.push({ year: year + 1, month: 1, date: i });
      } else {
        arr.push({ year, month: month + 1, date: i });
      }
    }
    const calendar = [];
    while (arr.length) {
      calendar.push(arr.splice(0, 7));
    }
    this.origin = { year, month, date };
    this.setState({ calendar });
  };
  render() {
    const { show, calendar, selected, animation, placeholder, value } = this.state;
    const { origin, today } = this;
    return (
      <>
        <div className="dar-date-input-container" ref={this.myRef}>
          <input
            className="dar-input dar-date-input"
            placeholder={placeholder}
            value={value}
            onChange={(event) => this.onInput(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') this.onEnter();
            }}
            onFocus={() => this.showCalendar()}
          ></input>
          <CalendarOutlined className={`dar-date-canlendar-icon`} />
        </div>

        {show &&
          createPortal(
            <div>
              <div
                className={`dar-date-container dar-date-${animation}`}
                style={{ top: `${this.top}px`, left: `${this.left}px` }}
              >
                <div className={`dar-date-header`}>
                  <div className={`dar-date-pre`}>
                    <DoubleLeftOutlined
                      className={`dar-date-icon`}
                      onClick={() =>
                        this.changeOrigin(new Date(origin.year - 1, origin.month - 1, origin.date))
                      }
                    />
                    <LeftOutlined
                      className={`dar-date-icon`}
                      onClick={() =>
                        this.changeOrigin(new Date(origin.year, origin.month - 2, origin.date))
                      }
                    />
                  </div>
                  <div className={`dar-date-range`}>
                    <div>{origin.year}年</div>
                    <div>{origin.month}月</div>
                  </div>
                  <div className={`dar-date-next`}>
                    <RightOutlined
                      className={`dar-date-icon`}
                      onClick={() =>
                        this.changeOrigin(new Date(origin.year, origin.month, origin.date))
                      }
                    />
                    <DoubleRightOutlined
                      className={`dar-date-icon`}
                      onClick={() =>
                        this.changeOrigin(new Date(origin.year + 1, origin.month - 1, origin.date))
                      }
                    />
                  </div>
                </div>
                <div className={`dar-date-body`}>
                  <table className={`dar-date-calendar`}>
                    <thead>
                      <tr>
                        {config.map((i, index) => (
                          <th key={index}>{i}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody
                      onMouseEnter={() =>
                        this.setState({
                          value: '',
                        })
                      }
                    >
                      {calendar.map((item, index) => (
                        <tr key={index}>
                          {config.map((_, index) => (
                            <td
                              key={index}
                              title={`${item[index].year}-${item[index].month}-${item[index].date}`}
                              className={`${
                                item[index].year === selected.year &&
                                item[index].month === selected.month &&
                                item[index].date === selected.date
                                  ? 'dar-date-selected'
                                  : ''
                              } ${
                                item[index].year === today.year &&
                                item[index].month === today.month &&
                                item[index].date === today.date
                                  ? 'dar-date-today'
                                  : ''
                              }`}
                              style={{ color: `${item[index].current ? '' : '#00000040'}` }}
                              onMouseEnter={() =>
                                this.setState({
                                  placeholder: `${item[index].year}-${item[index].month}-${item[index].date}`,
                                  value: '',
                                })
                              }
                              onMouseLeave={() =>
                                this.setState({
                                  placeholder: '',
                                  value: `${selected.year}-${selected.month}-${selected.date}`,
                                })
                              }
                              onClick={() => this.select(item[index])}
                            >
                              {item[index].date}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={`dar-date-footer`}>
                  <div
                    onClick={() => {
                      this.select(this.today);
                    }}
                  >
                    今天
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </>
    );
  }
}
