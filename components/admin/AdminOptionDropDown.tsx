import React, { useState } from "react";
import Image from "next/image";
import { IOrderResponse } from "@/models/order.interface";
import download from "../../public/download.png";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
interface Iprop {
    option?: string[];
    toggle?: () => void;
    disabled?: boolean;
    orders: IOrderResponse[];
}

const AdminOptionDropDown = (props: Iprop) => {
    const [showAdminOptionCard, setShowAdminOptionCard] = useState(false);

    const toggleAdminOptionCard = () => {
        setShowAdminOptionCard((prev) => !prev);
    };

    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = () => {
        console.log("downloading");
        const ws = XLSX.utils.json_to_sheet(props.orders);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data1 = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data1, "download" + fileExtension);
    };

    return (
        <div className="relative z-50 ">
            <button
                className="box-border border-[1px] border-[#BBC2CF] h-[38px] w-[180px] px-[10px] rounded-[4px]  text-[14px] font-[700] text-[#525D72] leading-[19px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative"
                style={showAdminOptionCard ? { backgroundColor: "#3672DF", color: "#FFFFFF" } : {}}
                onClick={toggleAdminOptionCard}
            >
                <span>select option</span>
                <div className="relative h-[6px] w-[8px]  ">
                    <Image src="/downwardArrow.png" fill={true} alt="arrow" objectFit="cover" />
                </div>
            </button>
            {showAdminOptionCard && (
                <div className="w-full bg-[white] box-border absolute border-[1px] border-[#ccc] rounded-[4px] mt-[10px] p-[5px]">
                    <button
                        className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize flex flex-row justify-start items-center space-x-[5px]"
                        onClick={exportToCSV}
                    >
                        <Image src={download} height={13} width={13} alt="download" />
                        <span>download</span>
                    </button>
                    {props.option && (
                        <button
                            className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                            onClick={props.toggle}
                            disabled={props.disabled}
                        >
                            {props.option[0]}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminOptionDropDown;
