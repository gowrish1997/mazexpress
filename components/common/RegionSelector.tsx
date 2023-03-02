import React from "react";
import Image from "next/image";
import { RegionDropdown } from "react-country-region-selector";
import { FieldError } from "react-hook-form";
interface IProp {
  label: string;
  value: string;
  country: string;
  dropDownIcon?: {
    iconIsEnabled: boolean;
    iconSrc: string;
  };
  error?: FieldError;
  onChange: any;
}
const RegionSelector = (props: IProp) => {
  console.log(props);
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
        <RegionDropdown
          country={props.country}
          value={props.value}
          countryValueType="short"
          classes="menu-regioin"
          showDefaultOption=""
          onChange={props.onChange}
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
      </div>
      {props.error && (
        <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
          {props.error.message}
        </p>
      )}
    </div>
  );
};

export default RegionSelector;
