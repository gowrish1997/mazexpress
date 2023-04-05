import React, { useRef, useState } from "react";
import Image from "next/image";
import OrderOptionModal from "../modal/OrderOptionModal";
import EnquiryBaseOptionModal from "@/components/admin/modal/EnquiryBaseOptionModal";
import { Order } from "@/models/order.model";
import EnquiryReplyModal from "@/components/admin/modal/EnquiryReplyModal";
import { getDateInStringFormat } from "@/lib/helper";
import { IEnquiry } from "@/lib/hooks/useEnquiry";

interface IProp {
    row: IEnquiry;
    type: string;
}

const EnquiryLineItem = (props: IProp) => {
    //   console.log(props.row);

    const trigger = useRef<any>();
    const [gate, setGate] = useState(false);

    const [showEnquiryReplyModal, setshowEnquiryReplyModal] = useState(false);
    //   console.log(gate);

    const toggleShowEnquiryReplyModal = () => {
        setshowEnquiryReplyModal((prev) => !prev);
    };

    function smartToggleGateHandler() {
        setGate(false);
    }
    function toggleGateHandler() {
        // console.log("toggle gate");
        setGate((prev) => !prev);
    }

    return (
        <>
            {props.row && (
                <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative">
                    <td className={`td1`}>{props.row.email}</td>
                    <td className={`td2 text-[#35C6F4]`}>{props.row.mobile}</td>
                    <td className={`td3`}>
                        {getDateInStringFormat(props.row.created_on)}
                    </td>
                    <td className={`td4`}>{props.row.message}</td>

                    <td
                        className=""
                        // onClick={(e) => optionModalHandler(e, index)}
                    >
                        <div className="w-full h-full ">
                            <div
                                onClick={toggleGateHandler}
                                ref={trigger}
                                className="cursor-pointer relative"
                            >
                                <Image
                                    src="/editicon.png"
                                    // ref={trigger}
                                    height={13}
                                    width={4}
                                    alt="editIcon"
                                />
                            </div>
                            {gate && (
                                <EnquiryBaseOptionModal
                                    // ref={modalNode}
                                    toggle={toggleShowEnquiryReplyModal}
                                    handler={smartToggleGateHandler}
                                    trigger={trigger}
                                    row={props.row}
                                />
                            )}
                            {showEnquiryReplyModal && (
                                <EnquiryReplyModal
                                    close={toggleShowEnquiryReplyModal}
                                    row={props.row}
                                />
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};
export default EnquiryLineItem;
