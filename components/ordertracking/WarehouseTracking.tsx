import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const WarehouseTracking = (props: { packageStatus: number }) => {
<<<<<<< HEAD
  console.log(props.packageStatus);
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
        <p className="flex-1 ml-[10px]">
          Package arrived at warehouse in Libya.
        </p>
      </div>
      <div
        className={`border-[1px] border-[#BBC2CF] ml-[4px] h-[25px] relative `}
      />
      <div className="flex-type1 ">
        <div
          className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]"
          style={props.packageStatus >= 4 ? { backgroundColor: "#3672DF" } : {}}
        />
        <p className="flex-1 ml-[10px]">Package left warehouse in Libya.</p>
      </div>
    </div>
  );
=======

  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("common");
  const warehouseStatus: string[] = t("trackingView.view.packageStatus.stageSecond.WarehouseStatus", { returnObjects: true });
 
   
    const [packageStatus, setPackageStatus] = useState(props.packageStatus);

    return (
        <div className="flex-type6 wareHouseProgressbar ">
            <div className="flex-type2">
                <div className="flex-type5">
                    <div className="h-[10px] w-[10px]  rounded-[50%] bg-[#A9A9A9]" style={props.packageStatus >= 2 ? { backgroundColor: "#3672DF" } : {}} />
                    <div className={`border-[1px] border-[#BBC2CF]  h-[25px] w-[0px] my-[5px] relative`} />
                </div>

                <p className="flex-1 mx-[10px] -mt-[4px] ">{warehouseStatus[0]}</p>
            </div>

            <div className="flex-type2">
                <div className="flex-type5">
                    <div className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]" style={props.packageStatus >= 3 ? { backgroundColor: "#3672DF" } : {}} />
                    <div className={`border-[1px] border-[#BBC2CF]  h-[25px] w-[0px] my-[5px] relative `} />
                </div>

                <p className="flex-1 mx-[10px] -mt-[4px]">{warehouseStatus[1]}</p>
            </div>

            <div className="flex-type2">
                <div className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]" style={props.packageStatus >= 4 ? { backgroundColor: "#3672DF" } : {}} />

                <p className="flex-1 mx-[10px]  -mt-[4px] ">{warehouseStatus[2]}</p>
            </div>
        </div>
    );
>>>>>>> translate
};

export default WarehouseTracking;
