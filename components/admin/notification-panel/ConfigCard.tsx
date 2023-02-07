import React, { useEffect, useState } from "react";
import Image from "next/image";
import { INotificationConfig } from "@/models/notification.interface";
import ReactSwitch from "react-switch";

interface IProp {
  data: INotificationConfig;
  toggle: (id: string) => void;
}

const ConfigCard = (props: IProp) => {
  return (
    <div
      className="min-w-[32%] min-h-[180px] rounded-[4px] p-[25px]"
      style={{
        backgroundColor: props.data.is_enabled ? "#EDF5F9" : "white",
        border: props.data.is_enabled ? "none" : "1px solid #BBC2CF",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
          {props.data.title}
        </p>

        <div className="flex items-center">
          <label className="text-[10px] Inter mr-1">
            {props.data.is_enabled ? "Enabled" : "Disabled"}
          </label>
          <ReactSwitch
            checked={props.data.is_enabled}
            onChange={() => props.toggle(props.data.id)}
            checkedIcon={false}
            uncheckedIcon={false}
            handleDiameter={9}
            height={13}
            width={22}
            onColor={"#3672DF"}
            offColor={"#BBC2CF"}
            offHandleColor={"white"}
            //   className={props.data.is_enabled ? "blue_border":"gray_border"}
            activeBoxShadow={""}
          />
        </div>
      </div>
      {/* <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
        Turkey
      </p> */}
      <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
        Here is a link to some fake information that contains crucial
        information, link to some fake information that contains crucial
        information
      </p>
    </div>
  );
};

export default ConfigCard;
