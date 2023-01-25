import React, { SyntheticEvent } from "react";

import Image from "next/image";
import { FieldError } from "react-hook-form";
interface IProp {
    label: string;
    name: string;
    type: string;
    register?: any;
    dropDownIcon?: {
        iconIsEnabled: boolean;
        iconSrc: string;
    };
    error?: FieldError;
    onClick?: () => void;
}

const ReactHookFormInput = (props: IProp) => {
    return (
        <div className={"w-full flex-type6"}>
            <label htmlFor={props.name} className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] ">
                {props.label}
            </label>
            <div className={"flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border p-[5px] h-[46px] "}>
                <input id={props.name} type={props.type} {...props.register} className="w-full h-full focus:outline-none" name={props.name} />
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

export default ReactHookFormInput;
