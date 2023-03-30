import React, { forwardRef, RefObject } from "react";

import ClickOutside from "@/components/common/ClickOutside";

interface IProps {
    ref: React.RefObject<HTMLDivElement>;
    handler: () => void;
    trigger: RefObject<HTMLDivElement>;
    toggle: () => void;
}
export type Ref = HTMLDivElement;

const EnquiryBaseOptionModal = forwardRef<HTMLDivElement, IProps>(
    (props, ref) => {
        return (
            <ClickOutside handler={props.handler} trigger={props.trigger}>
                <div
                    className="absolute top-[25px] right-[8px] w-[150px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] z-10 flex flex-col justify-between items-start p-[5px]"
                    style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                    // ref={ref}
                >
                    <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px]  ">
                        <li
                            className="hover:bg-[#EDF5F9] w-full rounded-[4px]"
                            onClick={props.toggle}
                        >
                            <div className="cursor-pointer">
                                <span className="ml-[15px] w-full ">
                                    View and Reply
                                </span>
                            </div>
                        </li>
                        <li className="hover:bg-[#EDF5F9] w-full rounded-[4px]">
                            <div className="cursor-pointer">
                                <span className="ml-[15px] w-full ">
                                    Delete
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </ClickOutside>
        );
    }
);

EnquiryBaseOptionModal.displayName = "EnquiryBaseOptionModal";
export default EnquiryBaseOptionModal;
