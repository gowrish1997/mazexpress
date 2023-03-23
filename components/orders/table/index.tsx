import React, { useEffect } from "react";
import LineItem from "./LineItem";
import { nanoid } from "nanoid";
import LiveOrderLineItem from "./LiveOrderLineItem";
import TableHeader from "./TableHeader";
import UserLineItem from "./UserLineItem";
import StatLineItem from "./StatLineItem";
import AdminLineItem from "./AdminLineItem";
import { Order } from "@/models/order.model";
import { User } from "@/models/user.model";
import { APIResponse } from "@/models/api.model";
import { KeyedMutator } from "swr";
import moment from "moment";

interface TableProps {
    headings: Array<string>;
    rows: Array<Order> | Array<User>;
    type: string;
    onSelect?: (e: any, type: string) => void;
    selectedOrder?: Order[] | string[];
    mutateOrder?: KeyedMutator<APIResponse<Order>>;
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
        } else if (props.type == "admin_base") {
            return "admin_table";
        } else if (props.type == "stat_table") {
            return "stat_table";
        } else {
            return "order_table";
        }
    };

    useEffect(() => {
        let sort = props.rows.sort(
            (a, b) =>
                new Date(a.created_on).getTime() -
                new Date(b.created_on).getTime()
        );
        console.log(sort);
    }, []);

    return (
        <div className="flex-1 relative">
            {/* {props.rows  && ( */}
            <table className={tableClassNameHandler()}>
                <TableHeader
                    type={props.type}
                    headings={props.headings}
                    onSelect={props.onSelect!}
                />
                {props.rows && props.rows.length > 0 ? (
                    <tbody className="">
                        {props.rows
                            .sort(
                                (a, b) =>
                                    new Date(a.created_on).getTime() -
                                    new Date(b.created_on).getTime()
                            )
                            .map((data, index) => {
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
                                            row={data as Order}
                                            type={props.type}
                                            selectedOrder={
                                                props.selectedOrder as Order[]
                                            }
                                            mutateOrder={props.mutateOrder}
                                        />
                                    );
                                } else if (props.type == "stat_table") {
                                    return (
                                        <StatLineItem
                                            key={nanoid()}
                                            onSelect={props.onSelect!}
                                            row={data as Order}
                                            type={props.type}
                                        />
                                    );
                                } else if (props.type == "user_base") {
                                    return (
                                        <UserLineItem
                                            key={nanoid()}
                                            row={data as User}
                                            type={props.type}
                                            onSelect={props.onSelect!}
                                        />
                                    );
                                } else if (props.type == "admin_base") {
                                    return (
                                        <AdminLineItem
                                            key={nanoid()}
                                            row={data as User}
                                            type={props.type}
                                            onSelect={props.onSelect!}
                                            selectedOrder={
                                                props.selectedOrder as Order[]
                                            }
                                        />
                                    );
                                } else {
                                    return (
                                        <LineItem
                                            key={nanoid()}
                                            row={data as Order}
                                            type={props.type}
                                        />
                                    );
                                }
                            })}
                    </tbody>
                ) : (
                    <tr className="w-[100%] h-[300px] text-[21px] text-[#8794AD] font-[600] leading-[33px] mt-[30px] whitespace-nowrap flex  ">
                        No results found
                    </tr>
                )}
            </table>
        </div>
    );
};

export default React.memo(Table);
