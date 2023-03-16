import React, { forwardRef, RefObject } from "react";
import ClickOutside from "@/components/common/ClickOutside";
import fetchServer from "@/lib/fetchServer";
import useUser from "@/lib/hooks/useUser";
import axios from "axios";
import { createToast } from "@/lib/toasts";
import { Order } from "@/models/order.model";
import { User } from "@/models/user.model";
import { APIResponse } from "@/models/api.model";

interface IProps {
    ref: React.RefObject<HTMLDivElement>;
    handler: () => void;
    trigger: RefObject<HTMLDivElement>;
    row: Order | User;
}
export type Ref = HTMLDivElement;

const AdminOptionModal = forwardRef<HTMLDivElement, IProps>((props, ref) => {
    const actionHandler = () => {
        console.log("remove admin");
    };

    return (
        <ClickOutside
            handler={props.handler}
            trigger={props.trigger}
            className="z-50 absolute top-0 left-0 w-full"
        >
            <div
                className="absolute top-[40px] right-[15px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] flex flex-col justify-between items-start p-[10px]"
                style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                // ref={ref}
            >
                <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px] cursor-pointer  ">
                    <li
                        className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                        onClick={actionHandler}
                    >
                        <div className="cursor-pointer">
                            <span className="w-full ">Remove admin</span>
                        </div>
                    </li>
                </ul>
            </div>
        </ClickOutside>
    );
});
AdminOptionModal.displayName = "LiveOrderOptionModal";
export default AdminOptionModal;
