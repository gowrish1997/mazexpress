import React, { useState } from "react";
import Image from "next/image";
import { FieldError } from "react-hook-form";
import eyeOpen from "@/public/eyeIconOpen.png";
import eyeClose from "@/public/eyeIconClose.png";

interface IProp {
  label: string;
  name: string;
  type: string;
  register?: any;
  value?: string | number;
  icon?: {
    isEnabled: boolean;
    type?: "secure" | "insecure";
    onClick?: () => void;
  };
  error?: FieldError;
  onClick?: () => void;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
}

const ReactHookFormInput = (props: IProp) => {
  const [fieldVisibility, setFieldVisibility] = useState<
    "secure" | "insecure" | undefined
  >(props.icon?.type);

  function getIconPath(type?: "secure" | "insecure") {
    if (type === "secure") {
      return eyeOpen;
    }
    return eyeClose;
  }

  return (
    <div className={"w-full flex-type6"}>
      <label
        htmlFor={props.name}
        className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
      >
        {props.label}
      </label>
      <div
        className={
          "flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative" +
          " " +
          props.className
        }
        // style={{ borderColor: props.error ? "#f02849" : "" }}
      >
        {props.name == "phone_addresses" && (
          <span className="ml-[10px]">+281</span>
        )}

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
          <Image
            src={getIconPath(props.icon.type)}
            alt="eyeIcon"
            height={18}
            width={18}
            className="cursor-pointer absolute right-[8px] "
            onClick={props.icon.onClick}
            sizes="100vw"
          />
        ) : (
          ""
        )}
      </div>
      {props.error && (
        <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
          {props.error.message}
        </p>
      )}
    </div>
  );
};

export default ReactHookFormInput;
