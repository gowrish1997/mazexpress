import React, { useState } from "react";

const WarehouseTracking = (props: { packageStatus: number }) => {
  console.log(props.packageStatus)
  const [packageStatus, setPackageStatus] = useState(props.packageStatus);

  return (
    <div className="flex-type6 wareHouseProgressbar ">
      <div className="flex-type1 ">
        <div
          className="h-[10px] w-[10px]  rounded-[50%] bg-[#A9A9A9]"
          style={props.packageStatus >= 2 ? { backgroundColor: "#3672DF" } : {}}
        />
        <p className="flex-1 ml-[10px]">
          Package left warehouse in Istanbul, Turkey.
        </p>
      </div>
      <div
        className={`border-[1px] border-[#BBC2CF] ml-[4px] h-[25px] relative`}
      />
      <div className="flex-type1">
        <div
          className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]"
          style={props.packageStatus >= 3 ? { backgroundColor: "#3672DF" } : {}}
        />
        <p className="flex-1 ml-[10px]">Package arrived at warehouse in Libya.</p>
      </div>
      <div
        className={`border-[1px] border-[#BBC2CF] ml-[4px] h-[25px] relative `}
      />
      <div className="flex-type1 ">
        <div
          className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]"
          style={props.packageStatus >= 4 ? { backgroundColor: "#3672DF" } : {}}
        />
        <p className="flex-1 ml-[10px]">
          Package left warehouse in Libya.
        </p>
      </div>
    </div>
  );
};

export default WarehouseTracking;
