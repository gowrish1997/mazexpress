import React from "react";

import Image from "next/image";
import { FieldError } from "react-hook-form";

interface IProp {
    label: string;
    name: string;
    type: string;
    register?: any;
    value?: string | number;
    icon?: {
        isEnabled: boolean;
        src: string;
        onClick?: () => void;
    };
    error?: FieldError;
    onClick?: () => void;
    disabled?: boolean;
    autoComplete?: string;
}

const ReactHookFormInput = (props: IProp) => {
    return (
        <div className={"w-full flex-type6"}>
            <label htmlFor={props.name} className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] ">
                {props.label}
            </label>
            <div className={"flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative "} style={{ borderColor: props.error ? "#f02849" : "" }}>
                {props.type == "number" && <span className="ml-[10px]">+281</span>}

                <input
                    id={props.name}
                    type={props.type}
                    {...props.register}
                    value={props.value}
                    className="w-full h-full pl-[5px] rounded-[5px] focus:outline-none"
                    name={props.name}
                    disabled={props.disabled}
                    autoComplete={props.autoComplete ? props.autoComplete : "on"}
                />
                {props.icon?.isEnabled ? (
                    <Image src={props.icon?.src} alt="eyeIcon" height={18} width={18} className="cursor-pointer absolute right-[8px] " onClick={props.icon.onClick} />
                ) : (
                    ""
                )}
            </div>
            {props.error && <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">{props.error.message}</p>}
        </div>
    );
};

export default ReactHookFormInput;
