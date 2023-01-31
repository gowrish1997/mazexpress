import React, { useState } from "react";
import LineItem from "./LineItem";

import { IOrderResponse } from "@/models/order.interface";
interface TableProps {
  tableHeaders: Array<string>;
  orders: Array<IOrderResponse>;
}

const Table = (props: TableProps) => {
  // to prevent multiple option box opening
  const [active, setActive] = useState<number>(-1);

  // console.log(active);

  function setActiveHandler(index: number, e: any) {
    if (active === index) {
      setActive(-1);
      e.stopPropagation();
    } else {
      setActive(index + 1);
      e.stopPropagation();
    }
  }

  return (
    <div className="flex-1">
      {props.orders && (
        <table className="table">
          <thead className="w-full">
            <tr className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px] border-b-[1px] border-[#e3e3e3] ">
              {props.tableHeaders.map((data, index) => {
                return (
                  <th key={index} className={`th${index + 1}`}>
                    {data}
                  </th>
                );
              })}
              <th className={`th${props.tableHeaders?.length + 1}`}></th>
            </tr>
          </thead>
          <tbody className="">
            {props.orders && props.orders.length > 0
              ? props.orders.map((data, index) => {
                  return (
                    <LineItem
                      key={index}
                      row={data}
                      active={active}
                      setActiveHandler={setActiveHandler}
                      index={index}
                      show={active === index + 1 ? true : false}
                      setActive={setActive}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
