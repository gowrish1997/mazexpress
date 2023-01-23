import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Inputs } from "@/components/home/SignUpComponent";
import Image from "next/image";
import { FieldError } from "react-hook-form";
interface IProp {
    label: string;
    name: string;
    type: string;
    register?: any;
    parentClassName?: string;
    inputClassName?: string;
    dropDownIcon?: {
        iconIsEnabled: boolean;
        iconSrc: string;
    };
    error?: FieldError;

    onClick?: () => void;
}

const Input = (props: IProp) => {
    return (
        <div className={"w-full flex-type6" + " " + props.parentClassName}>
            <label htmlFor={props.name} className="text-[14px] text-[#707070] font-[400] leading-[19px]">
                {props.label}
            </label>
            <div className={"flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border p-[5px] " + " " + props.inputClassName}>
                <input id={props.name} type={props.type} {...props.register} className="w-full h-full focus:outline-none" />
                {props.dropDownIcon?.iconIsEnabled ? (
                    <Image src={props.dropDownIcon?.iconSrc} alt="eyeIcon" height={18} width={18} className="cursor-pointer" onClick={props.onClick} />
                ) : (
                    ""
                )}

                {/* <span>eye</span> */}
            </div>
            {props.error && <p>{props.error.message}</p>}
        </div>
    );
};

export default Input;
