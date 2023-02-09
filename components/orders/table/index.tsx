import React, { useState } from "react";
import LineItem from "./LineItem";
import { nanoid } from "nanoid";
import LiveOrderLineItem from "./LiveOrderLineItem";
import { IOrderResponse } from "@/models/order.interface";
import TableHeader from "./TableHeader";

interface TableProps {
    headings: Array<string>;
    rows: Array<IOrderResponse>;
    type: string;
    onSelect?: (e: any,type:string) => void;
    selectedOrder?: string[];
    filterById:(value:string)=>void
}

const Table = (props: TableProps) => {
    const tableClassNameHandler = () => {
        if (props.type == "live_order" || props.type == "shipments" || props.type == "delivered") {
            return "live_order_table";
        } else {
            return "order_table";
        }
    };

    return (
        <div className="flex-1 z-10 ">
            {props.rows && (
                <table className={tableClassNameHandler()}>
                    <TableHeader type={props.type} headings={props.headings} filterById={props.filterById} onSelect={props.onSelect!}  />
                    <tbody className="">
                        {props.rows && props.rows.length > 0
                            ? props.rows.map((data, index) => {
                                  if (props.type == "live_order" || props.type == "shipments" || props.type == "delivered") {
                                      return <LiveOrderLineItem key={nanoid()} onSelect={props.onSelect!} row={data} type={props.type} selectedOrder={props.selectedOrder!} />;
                                  } else {
                                      return <LineItem key={nanoid()} row={data} type={props.type} />;
                                  }
                              })
                            : null}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default React.memo(Table);
