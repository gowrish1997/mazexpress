import React, { useState } from "react";
import Image from "next/image";
import { FieldError } from "react-hook-form";
import eyeOpen from "@/public/eyeIconOpen.png";
import eyeClose from "@/public/eyeIconClose.png";
import dynamic from "next/dynamic";
interface IProp {
  label: string;
  name: string;
  type: string;
  register?: any;
  value?: string | number;
  icon?: {
    isEnabled: boolean;
    onClick?: () => void;
    map: { on: string; off: string };
  };
  error?: FieldError;
  onClick?: () => void;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
}

const ReactHookFormInput = (props: IProp) => {
  const [iconSwitch, setIconSwitch] = useState<"on" | "off">("on");

  const toggleIcon = () => {
    setIconSwitch((prev) => {
      if (prev === "off") {
        return "on";
      } else {
        return "off";
      }
    });
  };

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
          "flex-type1 w-full h-[46px] lg:h-[55px] xlg:h-[70px] border-[1px] border-[#BBC2CF] rounded-[4px] box-border  relative" +
          " " +
          props.className
        }
        style={{ borderColor: props.error ? "#f02849" : "" }}
      >
        {props.name == "phone_addresses" && (
          <span className="mx-[10px]">+281</span>
        )}

        <input
          id={props.name}
          type={props.type}
          {...props.register}
          value={props.value}
          className="w-full h-full px-[5px] rounded-[5px] focus:outline-none text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
          name={props.name}
          step="0.1"
          disabled={props.disabled}
          autoComplete={props.autoComplete ? props.autoComplete : "on"}
        />
        {props.icon?.isEnabled ? (
          iconSwitch === "on" ? (
            <Image
              src={props.icon?.map.on}
              alt="eyeIcon"
              height={18}
              width={18}
              className="cursor-pointer absolute right-[8px] "
              onClick={toggleIcon}
            />
          ) : (
            <Image
              src={props.icon?.map.off}
              alt="eyeIcon"
              height={18}
              width={18}
              className="cursor-pointer absolute right-[8px] "
              onClick={toggleIcon}
            />
          )
        ) : null}
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
