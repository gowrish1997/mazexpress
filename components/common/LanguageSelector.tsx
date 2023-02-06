import React from "react";
import Image from "next/image";
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/css/react-languages-select.css";

import { FieldError } from "react-hook-form";
interface IProp {
  label: string;
  value: string | number;
  dropDownIcon?: {
    iconIsEnabled: boolean;
    iconSrc: string;
  };
  error?: FieldError;
  onChange: any;
}

const LanguageSelector = (props: IProp) => {
  return (
    <div className={"w-full flex-type6"}>
      <label className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] ">
        {props.label}
      </label>
      <div
        className={
          "flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative "
        }
        style={{ borderColor: props.error ? "#f02849" : "" }}
      >
        <ReactLanguageSelect
          names={"both"}
          selectedSize={14}
          optionsSize={14}
          showSelectedLabel={false}
          showOptionLabel={false}
          searchable={false}
          languages={["en", "ar"]}
          // customLabels={{ en: "EN-US", ar: "arabic" }}
          defaultLanguage={props.value}
          className="menu-languages"
          onSelect={props.onChange}
        />
        {props.dropDownIcon?.iconIsEnabled ? (
          <Image
            src={props.dropDownIcon?.iconSrc}
            alt="eyeIcon"
            height={10}
            width={10}
            className="cursor-pointer absolute right-[8px] "
          />
        ) : (
          ""
        )}

        {/* <span>eye</span> */}
      </div>
      {props.error && (
        <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
          {props.error.message}
        </p>
      )}
    </div>
  );
};

export default LanguageSelector;
