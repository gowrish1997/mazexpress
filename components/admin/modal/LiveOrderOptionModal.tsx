import React, { forwardRef, RefObject } from "react";
import Link from "next/link";
import ClickOutside from "@/components/common/ClickOutside";
import { IOrderResponse } from "@/models/order.interface";
import { IUser } from "@/models/user.interface";

interface IProps {
    ref: React.RefObject<HTMLDivElement>;
    handler: () => void;
    trigger: RefObject<HTMLDivElement>;
    row: IOrderResponse | IUser;
    type: string;
}
export type Ref = HTMLDivElement;

const optionHandler = (type: string) => {
    switch (type) {
        case "live_order":
            return "Move to shipments";
        case "shipments":
            return "Moved out";
        case "in-transit":
            return "Mark as delivered";
        case "user_base":
            return "Send notificaton";
    }
};

const actionHandler = (type: string) => {
    switch (type) {
        case "live_order":
            console.log("live order");
            break;
        case "shipments":
            console.log("shipmebts");
            break;
        case "in-transit":
            console.log("mark as delievered");
        case "user_base":
            console.log("user_base");
    }
};

const commentHandler = () => {
    console.log("commnet");
};

const LiveOrderOptionModal = forwardRef<HTMLDivElement, IProps>((props, ref) => {
    return (
        <ClickOutside handler={props.handler} trigger={props.trigger}>
            <div
                className="absolute top-[40px] right-[15px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] flex flex-col justify-between items-start p-[10px]  "
                style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                // ref={ref}
            >
                <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px] cursor-pointer  ">
                    <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]" onClick={() => actionHandler(props.type)}>
                        <div className="cursor-pointer">
                            <span className="w-full ">{optionHandler(props.type)}</span>
                        </div>
                    </li>
                    {props.type == "in-transit" && (
                        <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]" onClick={commentHandler}>
                            <div className="cursor-pointer">
                                <span className="w-full ">Add comment</span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </ClickOutside>
    );
});

export default LiveOrderOptionModal;
