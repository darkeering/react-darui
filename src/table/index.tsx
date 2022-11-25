import React, { Component } from 'react';
import './index.css';

export class Table extends Component<any, any> {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount(): void {}
  render() {
    const { colsConfig } = this.props;
    const { data } = this.props;
    return (
      <>
        <table className={`dar-table`}>
          <thead className={`dar-thead`}>
            <tr className={`dar-thead-tr`}>
              {/* <th className={`dar-thead-th`}>Name</th>
              <th className={`dar-thead-th`}>Age</th>
              <th className={`dar-thead-th`}>Address</th>
              <th className={`dar-thead-th`}>Tags</th>
              <th className={`dar-thead-th`}>Action</th> */}
              {colsConfig.map((col) => {
                return (
                  <th key={col.key} className={`dar-thead-th`}>
                    {col.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={`dar-tbody`}>
            {/* <tr className={`dar-tbody-tr`}>
              <td className={`dar-tbody-td`}>Eason djhasfkdjhfj</td>
              <td className={`dar-tbody-td`}>18</td>
              <td className={`dar-tbody-td`}>辽宁，大连</td>
              <td className={`dar-tbody-td`}>NICE DEVELOPER</td>
              <td className={`dar-tbody-td`}>edit delete</td>
            </tr> */}
            {data.map((rowData) => {
              return (
                <tr className={`dar-tbody-tr`}>
                  {colsConfig.map((col) => {
                    return (
                      <td className={`dar-tbody-td`}>
                        {col.render ? col.render(rowData[col.key], rowData) : rowData[col.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
