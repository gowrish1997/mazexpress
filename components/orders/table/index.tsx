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
import EnquiryLineItem from "./EnquiryLineItem";
import { IEnquiry } from "@/lib/hooks/useEnquiry";

interface TableProps {
    headings: Array<string>;
    rows: Array<Order> | Array<User> | Array<IEnquiry>;
    type: string;
    onSelect?: (e: any, type: string) => void;
    selectedOrder?: Order[] | User[];
    mutateOrder?: KeyedMutator<APIResponse<Order>>;
    mutateUser?: KeyedMutator<APIResponse<User>>;
}

const Table = (props: TableProps) => {
    console.log('table')
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
        } else if (props.type == "enquiry_base") {
            return "enquiry_base_table";
        } else {
            return "order_table";
        }
    };

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
                                    new Date(b.created_on).getTime() -
                                    new Date(a.created_on).getTime()
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
                                                props.selectedOrder as User[]
                                            }
                                            mutateUser={props.mutateUser}
                                        />
                                    );
                                } else if (props.type == "enquiry_base") {
                                    return (
                                        <EnquiryLineItem
                                            key={nanoid()}
                                            row={data as IEnquiry}
                                            type={props.type}
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
                    <div className="w-f h-[122px] text-[21px] text-[#8794AD] font-[600] leading-[33px] mt-[20px] whitespace-nowrap ">
                        No results found
                    </div>
                )}
            </table>
        </div>
    );
};

export default React.memo(Table);
