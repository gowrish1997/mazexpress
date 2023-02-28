import React from "react";
import LineItem from "./LineItem";
import { nanoid } from "nanoid";
import LiveOrderLineItem from "./LiveOrderLineItem";
import { IUser } from "@/models/user.interface";
import TableHeader from "./TableHeader";
import UserLineItem from "./UserLineItem";
import StatLineItem from "./StatLineItem";
import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";

interface TableProps {
  headings: Array<string>;
  rows: Array<OrderEntity> | Array<UserEntity>;
  type: string;
  onSelect?: (e: any, type: string) => void;
  selectedOrder?: string[] | number[];
}

const Table = (props: TableProps) => {
  const tableClassNameHandler = () => {
    if (
      props.type == "live_order" ||
      props.type == "pending" ||
      props.type == "shipments" ||
      props.type == "delivered" ||
      props.type == "in-transit"
    ) {
      return "live_order_table";
    } else if (props.type == "user_base") {
      return "user_table";
    } else if (props.type == "stat_table") {
      return "stat_table";
    } else {
      return "order_table";
    }
  };

  return (
    <div className="flex-1 relative">
      {props.rows && (
        <table className={tableClassNameHandler()}>
          <TableHeader
            type={props.type}
            headings={props.headings}
            onSelect={props.onSelect!}
          />
          <tbody className="">
            {props.rows && props.rows.length > 0
              ? props.rows.map((data, index) => {
                  if (
                    props.type == "live_order" ||
                    props.type == "pending" ||
                    props.type == "shipments" ||
                    props.type == "delivered" ||
                    props.type == "in-transit"
                  ) {
                    return (
                      <LiveOrderLineItem
                        key={nanoid()}
                        onSelect={props.onSelect!}
                        row={data as OrderEntity}
                        type={props.type}
                        selectedOrder={props.selectedOrder as string[]}
                      />
                    );
                  } else if (props.type == "stat_table") {
                    return (
                      <StatLineItem
                        key={nanoid()}
                        onSelect={props.onSelect!}
                        row={data as OrderEntity}
                        type={props.type}
                      />
                    );
                  } else if (props.type == "user_base") {
                    return (
                      <UserLineItem
                        key={nanoid()}
                        row={data as UserEntity}
                        type={props.type}
                        onSelect={props.onSelect!}
                        selectedOrder={props.selectedOrder as string[]}
                      />
                    );
                  } else {
                    return (
                      <LineItem
                        key={nanoid()}
                        row={data as OrderEntity}
                        type={props.type}
                      />
                    );
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
