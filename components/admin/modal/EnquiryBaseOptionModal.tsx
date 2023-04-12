import React, { forwardRef, RefObject } from "react";
import ClickOutside from "@/components/common/ClickOutside";
import useEnquiry, { IEnquiry } from "@/lib/hooks/useEnquiry";
import fetchJson from "@/lib/fetchServer";
import { createToast } from "@/lib/toasts";

interface IProps {
    ref: React.RefObject<HTMLDivElement>;
    handler: () => void;
    trigger: RefObject<HTMLDivElement>;
    toggle: () => void;
    row: IEnquiry;
}
export type Ref = HTMLDivElement;

const EnquiryBaseOptionModal = forwardRef<HTMLDivElement, IProps>(
    (props, ref) => {
        const { enquiry, mutateEnquiry, enquiryIsLoading, enquiryError } =
            useEnquiry({});
        const deleteEnquiryHandler = async (id: string) => {
            try {
                const result = await fetchJson(`/api/contact-form/id/${id}`, {
                    method: "DELETE",
                    headers: { "Content-type": "application/json" },
                });
                createToast({
                    type: "success",
                    title: "Success",
                    message: "Enquiry deleted successfully",
                    timeOut: 1000,
                });

                mutateEnquiry();
            } catch (error) {
                console.error(error);
            }
        };
        return (
            <ClickOutside
                handler={props.handler}
                trigger={props.trigger}
                className="z-20 absolute -top-[10px] -left-[5px] w-full"
            >
                <div
                    className="absolute top-[40px] right-[15px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] z-10 flex flex-col justify-between items-start p-[10px]"
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
                        <li
                            className="hover:bg-[#EDF5F9] w-full rounded-[4px]"
                            onClick={() => deleteEnquiryHandler(props.row.id)}
                        >
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
