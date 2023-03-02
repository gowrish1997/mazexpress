import React from "react";

interface IProp {
  label: string;
  name: string;
  type: string;
  parentClassName?: string;
  inputClassName?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IProp) => {
  return (
    <div
      className={
        "w-full flex-type6 space-y-[5px] " + " " + props.parentClassName
      }
    >
      <label
        htmlFor={props.name}
        className="text-[14px] text-[#707070] font-[400] leading-[19px]"
      >
        {props.label}
      </label>
      <div
        className={
          "flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border p-[5px] " +
          " " +
          props.inputClassName
        }
      >
        <input
          id={props.name}
          type={props.type}
          className="w-full h-full focus:outline-none"
          onChange={(e) => props.onChange?.(e)}
        />
      </div>
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

export default Input;
