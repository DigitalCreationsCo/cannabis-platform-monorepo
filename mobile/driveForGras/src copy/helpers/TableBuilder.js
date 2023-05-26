import Table from "../components/atomic/Table";
import React from "react";
import { useSelector } from "react-redux";
import {
  FeeCalculator,
  TaxCalculator,
  toCurrencyFormat,
} from "./FeeCalculator";

export const TableDataList = {
  DELIVERY_STATS: () => {
    // metric: pay, time, distance

    // return 15% of the order total as the drivers payment
    // const time = dispatchOrders.map((order) => order.timeElapsed);
    // const distance = dispatchOrders.map((order) => order.distanceDriven);
    // const pay = dispatchOrders.map((order) => order.total * 0.15);
    const time = Array(4).fill(50);
    const distance = Array(4).fill(150);
    const pay = Array(4).fill(3599);
    const headerData = ["time", "distance", "pay"];
    const columnData = [time, distance, pay];
    const tableData = convertColumnDataToRows(columnData);
    return { headerData, tableData };
  },
  CHECKOUT_SUMMARY: (total) => {
    const headerData = [
      "subtotal",
      "promotion fee",
      "service fee",
      "delivery fee",
      "tips",
      "sales tax",
      "total",
    ];
    const rowData = FeeCalculator(total);
    const tableData = prependLabelToData(rowData, headerData);
    return { headerData: null, tableData };
  },
};

// if you want a header row, return headerData with an array of headers
const TableBuilder = ({ TableDataList }) => {
  const { headerData, tableData } = TableDataList;
  return <Table headerData={headerData} tableData={tableData} />;
};

const convertColumnDataToRows = (matrix) => {
  const newMatrix = [];
  // make this loop more dynamic for different data sets
  for (i = 0; i < matrix[0].length; i++) {
    newMatrix.push([matrix[0][i], matrix[1][i], matrix[2][i]]);
  }
  return newMatrix;
};

const prependLabelToData = (matrix, headers) => {
  for (i = 0; i < matrix.length; i++) {
    matrix[i].unshift(headers[i]);
  }
  return matrix;
};

export default TableBuilder;
