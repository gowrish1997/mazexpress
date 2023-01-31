import React, { SyntheticEvent, useState } from "react";
import Image from "next/image";
import ReactFlagsSelect from "react-flags-select";
import { FieldError } from "react-hook-form";
interface IProp {
  label: string;
  value: string;
  dropDownIcon?: {
    iconIsEnabled: boolean;
    iconSrc: string;
  };
  error?: FieldError;
  onChange: any;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

const CountrySelector = (props: IProp) => {
  const selectHandler = (e: string) => {
    props.setCountry(e);
    props.onChange(e);
  };

  return (
    <>
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
          {/* <ReactFlagsSelect
            selected={props.value}
            countries={["US", "AF", "GB", "FR", "DE", "IT"]}
            onSelect={selectHandler}
            className="menu-flags"
          /> */}

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
    </>
  );
};

export default CountrySelector;
