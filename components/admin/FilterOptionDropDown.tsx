import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IOrderResponse } from "@/models/order.interface";
import download from "../../public/download.png";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ClickOutside from "../common/ClickOutside";
interface Iprop {
    options: string[];
    onChange?: (value: string) => void;
}

const FilterOptionDropDown = (props: Iprop) => {
    const trigger = useRef<any>(null);
    const [showAdminOptionCard, setShowAdminOptionCard] = useState(false);
    const [currentValue, setCurrentValue] = useState(props.options[0]);

    useEffect(() => {
        setCurrentValue(props.options[0]);
    }, [props.options]);

    const dropDownOnChangeHandler = (value: string) => {
        if (props.onChange) {
            if (value == "status") {
                props?.onChange?.("");
                setCurrentValue("status");
            } else {
                setCurrentValue(value);
                props?.onChange?.(value);
            }
        }

        setShowAdminOptionCard(false);
    };

    const toggleAdminOptionCard = () => {
        setShowAdminOptionCard((prev) => !prev);
    };

    const smartToggleGateHandler = () => {
        console.log("smart togglere");
        setShowAdminOptionCard(false);
    };

    return (
        <div className="relative z-50">
            <button
                className="box-border border-[1px] border-[#BBC2CF] h-[38px] w-[180px] px-[10px] rounded-[4px]  text-[14px] font-[700] text-[#525D72] leading-[19px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative"
                style={showAdminOptionCard ? { backgroundColor: "#3672DF", color: "#FFFFFF" } : {}}
                onClick={toggleAdminOptionCard}
            >
                <span>{currentValue}</span>
                <div className="relative h-[6px] w-[8px]  ">
                    <Image src="/downwardArrow.png" fill={true} alt="arrow" objectFit="cover" />
                </div>
            </button>
            {showAdminOptionCard && (
                <ClickOutside trigger={trigger} handler={smartToggleGateHandler}>
                    <div className="w-full  bg-[white] box-border absolute top-[30px] border-[1px] border-[#ccc] rounded-[4px] mt-[10px] p-[5px]">
                        {props.options &&
                            props.options.map((data) => {
                                return (
                                    <button
                                        className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                                        style={currentValue == data ? { backgroundColor: "#f2f9fc" } : {}}
                                        onClick={() => dropDownOnChangeHandler(data)}
                                    >
                                        {data}
                                    </button>
                                );
                            })}
                    </div>
                </ClickOutside>
            )}
        </div>
    );
};

export default FilterOptionDropDown;
