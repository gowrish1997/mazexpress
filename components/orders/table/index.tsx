import React, { useState } from "react";
import LineItem from "./LineItem";

import { IOrderResponse } from "@/models/order.interface";
import { nanoid } from "nanoid";

interface TableProps {
  headings: Array<string>;
  rows: Array<IOrderResponse>;
}

const Table = (props: TableProps) => {
  return (
    <div className="flex-1">
      {props.rows && (
        <table className="table">
          <thead className="w-full">
            <tr className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px] border-b-[1px] border-[#e3e3e3] ">
              {props.headings.map((data, index) => {
                return (
                  <th key={index} className={`th${index + 1}`}>
                    {data}
                  </th>
                );
              })}
              <th className={`th${props.headings?.length + 1}`}></th>
            </tr>
          </thead>
          <tbody className="">
            {props.rows && props.rows.length > 0
              ? props.rows.map((data, index) => {
                  return <LineItem key={nanoid()} row={data} />;
                })
              : null}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
