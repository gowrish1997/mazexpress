import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import downwardImage from "../../../public/downwardArrow.png";
import ClickOutside from "@/components/common/ClickOutside";

interface IProp {
    options: { value: string | number; label: string | number }[];
    onChange?: (value: string) => void;
    type: string;
    className?: string;
    itemsPerPage?: number;
}

const MazStatsDropddown = (props: IProp) => {
    const trigger = useRef<any>(null);

    const [showDropdown, setShowDropdown] = useState(false);
    const [currentValue, setCurrentValue] = useState<string>("");

    const toggleDropdownHandler = () => {
        setShowDropdown((prev) => !prev);
    };

    function smartToggleGateHandler() {
        setShowDropdown(false);
    }

    const dropDownOnChangeHandler = (value: string) => {
        props.onChange?.(value);
    };

    return (
        <div className="relative z-30">
            <div
                className={
                    "border-[1px] border-[#BBC2CF] rounded-[4px] text-[12px] text-[#2B2B2B] font-[600] leading-[18px] box-border px-[10px] py-[5px]  hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative cursor-pointer" +
                    " " +
                    props.className
                }
                style={showDropdown ? { backgroundColor: "#3672DF", color: "#FFFFFF" } : {}}
                onClick={toggleDropdownHandler}
            >
                {props.type == "per_page" ? (
                    <span className="">{`per page:  ${props.itemsPerPage}`}</span>
                ) : (
                    <span className="capitalize">{`${props.type}:  ${props.options[0].label}`}</span>
                )}

                <div className="relative h-[6px] w-[8px]  ">
                    <Image src={downwardImage} fill={true} alt="arrow" objectFit="cover" />
                </div>
            </div>
            {showDropdown && (
                <ClickOutside handler={smartToggleGateHandler} trigger={trigger}>
                    <div className="w-full  bg-[white] box-border absolute top-[30px] right-[0px]  border-[1px] border-[#ccc] rounded-[4px] p-[5px] space-y-[4px] z-50 ">
                        {props.options &&
                            props.options.map((data, index) => {
                                return (
                                    <div className="flex flex-row justify-start items-center">
                                        <button
                                            key={index}
                                            className=" w-full p-[5px] py-[3px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                                            onClick={() => dropDownOnChangeHandler(data.value as string)}
                                            style={currentValue == data.label ? { backgroundColor: "#f2f9fc" } : {}}
                                        >
                                            {data.label}
                                        </button>
                                        {currentValue == data.label ? <div className="h-[6px] w-[6px] absolute right-[10px]  rounded-full bg-[#3672DF] " /> : <></>}
                                    </div>
                                );
                            })}
                    </div>
                </ClickOutside>
            )}
        </div>
    );
};

export default MazStatsDropddown;
