import React, { forwardRef, RefObject } from "react";
import Link from "next/link";
import ClickOutside from "@/components/common/ClickOutside";
import { IOrderResponse } from "@/models/order.interface";
interface IProps {
    ref: React.RefObject<HTMLDivElement>;
    handler: () => void;
    trigger: RefObject<HTMLDivElement>;
    row: IOrderResponse;
    type: string;
}
export type Ref = HTMLDivElement;

const LiveOrderOptionModal = forwardRef<HTMLDivElement, IProps>((props, ref) => {
    return (
        <ClickOutside handler={props.handler} trigger={props.trigger}>
            <div
                className="absolute top-[10px] right-0 bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] z-50 flex flex-col justify-between items-start p-[10px]"
                style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                // ref={ref}
            >
                <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px]  ">
                    {props.type == "live_order" && (
                        <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px] ">
                            <div className="cursor-pointer">
                                <span className="w-full ">Move to shipments</span>
                            </div>
                        </li>
                    )}
                    {props.type == "shipments" && (
                        <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px] ">
                            <div className="cursor-pointer">
                                <span className="w-full ">Mark as delivered</span>
                            </div>
                        </li>
                    )}

                    <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] z-50 px-[5px] ">
                        <div className="cursor-pointer">
                            <span className="w-full ">Send Notifications</span>
                        </div>
                    </li>
                </ul>
            </div>
        </ClickOutside>
    );
});

export default LiveOrderOptionModal;
