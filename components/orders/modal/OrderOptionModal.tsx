import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const options = [
    { option: "Cancel Order", path: "edit" },
    { option: "Track Order", path: "edit" },
];

interface IProps {
   
    ref:React.RefObject<HTMLDivElement>
}
export type Ref = HTMLDivElement;

const OrderOptionModal = (props:IProps) => {
    return (
        <div className="absolute top-[35px] right-[10px] w-[150px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] z-10 flex flex-col justify-between items-start p-[5px]" style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }} ref={props.ref}>
            <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px]  ">
                <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] ">
                    <div className="cursor-pointer">
                        <span className="ml-[15px]">{options[0].option}</span>
                    </div>
                </li>
                <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] ">
                    <div className="cursor-pointer">
                        <span className="ml-[15px] w-full ">{options[1].option}</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default OrderOptionModal;
