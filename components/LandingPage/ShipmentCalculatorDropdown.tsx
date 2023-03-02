import React, { useState } from "react";
import { FieldError } from "react-hook-form";

interface IProp {
  label: string;
  name: string;
  type: string;
  register?: any;
  value?: string | number;
  IconEnabled: boolean;
  error?: FieldError;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  placeHolder?: string;
  setValue: any;
}

const ShipmentCalculatorDropdown = (props: IProp) => {
  const [showAdminOptionCard, setShowAdminOptionCard] =
    useState<boolean>(false);

  const toggleAdminOptionCard = () => {
    setShowAdminOptionCard((prev) => !prev);
  };

  const dropDownOnChangeHandler = (value: string) => {
    props.setValue(props.name, value, { shouldValidate: true });
    setShowAdminOptionCard(false);
  };
  return (
    <div className={"w-full flex-type6 relative"}>
      <label
        htmlFor={props.name}
        className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
      >
        {props.label}
      </label>
      <div
        className={
          "flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative "
        }
        // style={{ borderColor: props.error ? "#f02849" : "" }}
        onClick={toggleAdminOptionCard}
      >
        <input
          id={props.name}
          type={props.type}
          {...props.register}
          // value={props.value}
          className="w-full h-full pl-[5px] rounded-[5px] focus:outline-none capitalize"
          name={props.name}
          disabled={props.disabled}
        />
        {props.IconEnabled ? (
          <div className="absolute h-[6px] w-[8px] cursor-pointer right-[8px]  ">
            {/* <Image
              src="/downwardArrow.png"
              fill={true}
              alt="arrow"
              objectFit="cover"
              className="cursor-pointer absolute right-[8px] "
            /> */}
          </div>
        ) : (
          <></>
        )}
      </div>
      {showAdminOptionCard && (
        <div className="w-full z-[10]  bg-[white] box-border absolute top-[60px] border-[1px] border-[#ccc] rounded-[4px] mt-[10px] p-[5px] space-y-[4px]">
          {props.options &&
            props.options.map((data, index) => {
              return (
                <div
                  className="flex flex-row justify-start items-center"
                  key={index}
                >
                  <button
                    className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                    onClick={() => dropDownOnChangeHandler(data.value)}
                  >
                    {data.label}
                  </button>
                </div>
              );
            })}
        </div>
      )}
      {props.error && (
        <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
          {props.error.message}
        </p>
      )}
    </div>
  );
};

export default ShipmentCalculatorDropdown;
