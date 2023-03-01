import React from "react";
import ReactSwitch from "react-switch";

interface IProp {
  data: any;
  toggle: (id: number) => void;
}

const ConfigCard = (props: IProp) => {
  return (
    <div
      className="min-w-[32%] min-h-[180px] rounded-[4px] p-[25px]"
      style={{
        backgroundColor: props.data.is_enabled_notification_config
          ? "#EDF5F9"
          : "white",
        border: props.data.is_enabled_notification_config
          ? "none"
          : "1px solid #BBC2CF",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px] w-max">
          {props.data.title_notification_config}
        </p>

        <div className="flex items-center self-start">
          {/* <label className="text-[10px] Inter mr-1">
            {props.data.is_enabled ? "Enabled" : "Disabled"}
          </label> */}
          <ReactSwitch
            checked={props.data.is_enabled_notification_config as boolean}
            onChange={() => props.toggle(props.data.id_notification_config)}
            checkedIcon={false}
            uncheckedIcon={false}
            handleDiameter={10}
            height={13}
            width={22}
            onColor={"#3672DF"}
            offColor={"#BBC2CF"}
            offHandleColor={"#fff"}
            //   className={props.data.is_enabled ? "blue_border":"gray_border"}
            activeBoxShadow={""}
          />
        </div>
      </div>
      {/* <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
        Turkey
      </p> */}
      <p className="text-[13px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
        {props.data.desc_notification_config}
      </p>
    </div>
  );
};

export default ConfigCard;
