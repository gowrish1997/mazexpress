import React, { useState } from "react";

const WarehouseTracking = (props: { packageStatus: number }) => {
    const [packageStatus, setPackageStatus] = useState(props.packageStatus);

    return (
        <div className="flex-type6 wareHouseProgressbar ">
            <div className="flex-type1 ">
                <div className="h-[10px] w-[10px]  rounded-[50%] bg-[#A9A9A9]" style={packageStatus >= 2 ? { backgroundColor: "#3672DF" } : {}} />
                <p className="flex-1 ml-[10px]">Near Abu Khurais Forest, Tamanhint, Libya</p>
            </div>
            <div className={`border-[1px] border-[#BBC2CF] ml-[4px] h-[25px] relative  ${packageStatus > 2 ? "secondWarehouse" : ""} `} />
            <div className="flex-type1">
                <div className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]" style={packageStatus >= 3 ? { backgroundColor: "#3672DF" } : {}} />
                <p className="flex-1 ml-[10px]">2CW9+Q89, Sabhā, Libya</p>
            </div>
            <div className={`border-[1px] border-[#BBC2CF] ml-[4px] h-[25px] relative   ${packageStatus > 3 ? "secondWarehouse" : ""} `} />
            <div className="flex-type1 ">
                <div className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]" style={packageStatus >= 4 ? { backgroundColor: "#3672DF" } : {}} />
                <p className="flex-1 ml-[10px]">Gas station throughSabha - Tmanhunt, 3G8M+VWC, Sabhā, Libya</p>
            </div>
        </div>
    );
};

export default WarehouseTracking;
