import React, { useState } from "react";
import LineItem from "./LineItem";
import { nanoid } from "nanoid";
import LiveOrderLineItem from "./LiveOrderLineItem";
import { IOrderResponse } from "@/models/order.interface";
import { IUser } from "@/models/user.interface";
import TableHeader from "./TableHeader";
import UserLineItem from "./UserLineItem";
interface TableProps {
  headings: Array<string>;
  rows: Array<IOrderResponse> | Array<IUser>;
  type: string;
  onSelect?: (e: any, type: string) => void;
  selectedOrder?: string[] | number[];
  filterById?: (value: string) => void;
}

const Table = (props: TableProps) => {
    const tableClassNameHandler = () => {
        if (props.type == "live_order" || props.type == "pending" || props.type == "shipments" || props.type == "delivered" || props.type == "in-transit") {
            return "live_order_table";
        }
        else if(props.type=='user_base'){
            return 'user_table'
        } else {
            return "order_table";
        }
    };

    return (
        <div className="flex-1">
            {props.rows && (
                <table className={tableClassNameHandler()}>
                    <TableHeader type={props.type} headings={props.headings} filterById={props.filterById!} onSelect={props.onSelect!} />
                    <tbody className="">
                        {props.rows && props.rows.length > 0
                            ? props.rows.map((data, index) => {
                                  if (props.type == "live_order" || props.type == "pending" || props.type == "shipments" || props.type == "delivered" || props.type == "in-transit") {
                                      return <LiveOrderLineItem key={nanoid()} onSelect={props.onSelect!} row={data as IOrderResponse} type={props.type} selectedOrder={props.selectedOrder as string[]} />;
                                  } else if (props.type == "user_base") {
                                      return <UserLineItem key={nanoid()} row={data as IUser} type={props.type}  onSelect={props.onSelect!} selectedOrder={props.selectedOrder as number[]} />;
                                  } else {
                                      return <LineItem key={nanoid()} row={data as IOrderResponse} type={props.type}  />;
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
