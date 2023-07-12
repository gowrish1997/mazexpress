import React, { useState } from "react";
import Image from "next/image";
import { FieldError } from "react-hook-form";
import { locale } from "moment";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface IProp {
  label: string;
  name?: string;
  type: string;
  register?: any;
  value?: string | number;
  icon?: {
    isEnabled: boolean;
    onClick?: () => void;
    src: string;
  };
  error?: FieldError | string;
  onClick?: () => void;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  onChange?: (...args: any[]) => void;
  placeholder?: string;
}

const ReactHookFormInput = (props: IProp) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;
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
        // style={{ borderColor: props.error ? "#f02849" : "" }}
      >
        {props.name == "phone_addresses" && (
          <span className="mx-[10px]">+281</span>
        )}

        <input
          id={props.name}
          type={props.type}
          {...props.register}
          value={props.value}
          className="w-full h-full px-[5px] rounded-[5px] focus:outline-none text-[14px] text-[#2B2B2B] font-[600] leading-[19px] placeholder:text-[#BBC2CF] placeholder:text-[15px] placeholder:font-[500] placeholder:leading-[19px] "
          name={props.name}
          step="any"
          disabled={props.disabled}
          autoComplete={props.autoComplete ? props.autoComplete : "on"}
          onChange={(e) => props.onChange?.(e.target.value)}
          placeholder={props.label == "Weight" ? props.label : ""}
        />
        {props.icon?.isEnabled ? (
          <Image
            src={props.icon?.src}
            alt="eyeIcon"
            height={18}
            width={18}
            className={`cursor-pointer absolute ${
              locale == "en" ? "right-[8px]" : "left-[8px]"
            }  `}
            onClick={() => props.onClick?.()}
          />
        ) : null}
      </div>
      {props.error && !(typeof props.error === "string") && (
        <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
          {props.error.message}
        </p>
      )}
      {props.error && typeof props.error === "string" && (
        <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
          {props.error}
        </p>
      )}
    </div>
  );
};

export default ReactHookFormInput;
