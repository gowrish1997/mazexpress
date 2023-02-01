import React from "react";
import Image from "next/image";
import { FieldError } from "react-hook-form";
interface IProp {
    label: string;
    name: string;
    value: string[];
    register: any;
    dropDownIcon?: {
        iconIsEnabled: boolean;
        iconSrc: string;
    };
    error?: FieldError;
}
const CustomDropDown = (props: IProp) => {
    return (
        <div className="w-full flex-type6" id="customDropDown">
            <label htmlFor={props.name} className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] ">
                {props.label}
            </label>
            <div className={"flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative "} style={{ borderColor: props.error ? "#f02849" : "" }}>
                <select name={props.name} {...props.register} id={props.name}>
                    {props.value.map((data) => {
                        return (
                            <option key={data} value={data}>
                                <div className="bg-[red] py-[10px]" >{data}</div>
                            </option>
                        );
                    })}
                </select>
                {props.dropDownIcon?.iconIsEnabled ? (
                    <Image src={props.dropDownIcon?.iconSrc} alt="eyeIcon" height={10} width={10} className="cursor-pointer absolute right-[8px] " />
                ) : (
                    ""
                )}
            </div>
            {props.error && <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">{props.error.message}</p>}
        </div>
    );
};

export default CustomDropDown;
