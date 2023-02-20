import React, { useState, useEffect } from "react";
import Image from "next/image";
import downwardImage from "../../../public/downwardArrow.png";

interface IProp {
    options: { value: string | number; label: string | number }[];
    onChange?: (value: string | number) => void;
    type: string;
    className?: string;
    itemsPerPage?: number;
}

const MazStatsDropddown = (props: IProp) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentValue, setCurrentValue] = useState<string>("");

    const toggleDropdownHandler = () => {
        setShowDropdown((prev) => !prev);
    };

    const dropDownOnChangeHandler = (value: string | number) => {
        props.onChange?.(value);
    };

    return (
        <div className="relative z-40">
            <div
                className={
                    "border-[1px] border-[#BBC2CF] rounded-[4px] text-[12px] text-[#2B2B2B] font-[600] leading-[18px] box-border px-[10px] py-[5px]  hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative cursor-pointer" +
                    " " +
                    props.className
                }
                style={showDropdown ? { backgroundColor: "#3672DF", color: "#FFFFFF" } : {}}
                onClick={toggleDropdownHandler}
            >
                <span className="capitalize">{`${props.type}:  ${props.itemsPerPage}`}</span>

                <div className="relative h-[6px] w-[8px]  ">
                    <Image src={downwardImage} fill={true} alt="arrow" objectFit="cover" />
                </div>
            </div>
            {showDropdown && (
                <div className="w-full  bg-[white] box-border absolute  border-[1px] border-[#ccc] rounded-[4px] p-[5px] space-y-[4px]">
                    {props.options &&
                        props.options.map((data, index) => {
                            return (
                                <div className="flex flex-row justify-start items-center">
                                    <button
                                        key={index}
                                        className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
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
            )}
        </div>
    );
};

export default MazStatsDropddown;
