import React, { SyntheticEvent } from "react";

import Image from "next/image";
import { FieldError } from "react-hook-form";
interface IProp {
    label: string;
    name: string;
    type: string;
    register?: any;
    value?: string | number;
    dropDownIcon?: {
        iconIsEnabled: boolean;
        iconSrc: string;
    };
    error?: FieldError;
    onClick?: () => void;
    disabled?: boolean;
}

const ReactHookFormInput = (props: IProp) => {

    return (
        <div className={"w-full flex-type6"}>
            <label htmlFor={props.name} className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] ">
                {props.label}
            </label>
            <div className={"flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative "} style={{ borderColor: props.error ? "#f02849" : "" }}>
                <input
                    id={props.name}
                    type={props.type}
                    {...props.register}
                    value={props.value}
                    className="w-full h-full pl-[5px] rounded-[5px] focus:outline-none"
                    name={props.name}
                    disabled={props.disabled}
                />
                {props.dropDownIcon?.iconIsEnabled ? (
                    <Image src={props.dropDownIcon?.iconSrc} alt="eyeIcon" height={18} width={18} className="cursor-pointer absolute right-[8px] " onClick={props.onClick} />
                ) : (
                    ""
                )}

                {/* <span>eye</span> */}
            </div>
            {props.error && <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">{props.error.message}</p>}
        </div>
    );
};

export default ReactHookFormInput;
