import React from "react";
import Image from "next/image";
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
          <div className="flex-type3 pl-[10px] space-x-[5px] ">
            <div className="relative h-[12px] w-[20px] ">
              <Image
                src="/libiya.png"
                fill={true}
                style={{ objectFit: "cover" }}
                alt="lbiya"
              />
            </div>
            <span className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px]">
              Turkey
            </span>
          </div>

          {props.dropDownIcon?.iconIsEnabled ? (
            <Image
              src={props.dropDownIcon?.iconSrc}
              alt="eyeIcon"
              height={13}
              width={13}
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
    </>
  );
};

export default CountrySelector;
