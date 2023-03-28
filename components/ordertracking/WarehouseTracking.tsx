import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Tracking } from "@/models/tracking.model";
import TimeCard from "./TimeCard";

const WarehouseTracking = (props: {
    packageStatus: number;
    trackingDetail: Tracking[];
}) => {
    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation("common");
    const warehouseStatus: string[] = t(
        "trackingView.view.packageStatus.stageSecond.WarehouseStatus",
        { returnObjects: true }
    );

    const [packageStatus, setPackageStatus] = useState(props.packageStatus);

    return (
        <div className="flex-type6 wareHouseProgressbar ">
            <div className="flex-type2">
                <div className="flex-type5">
                    <div
                        className="h-[10px] w-[10px]  rounded-[50%] bg-[#A9A9A9]"
                        style={
                            props.packageStatus >= 2
                                ? { backgroundColor: "#35C6F4" }
                                : {}
                        }
                    />
                    <div
                        className={`border-[1px] border-[#BBC2CF]  h-[25px] w-[0px] my-[5px] relative`}
                    />
                </div>

                <p className="flex-1 mx-[10px] -mt-[4px] ">
                    {warehouseStatus[0]}{" "}
                    <TimeCard stage={2} trackingDetail={props.trackingDetail} />
                </p>
            </div>

            <div className="flex-type2">
                <div className="flex-type5">
                    <div
                        className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]"
                        style={
                            props.packageStatus >= 3
                                ? { backgroundColor: "#35C6F4" }
                                : {}
                        }
                    />
                    <div
                        className={`border-[1px] border-[#BBC2CF]  h-[25px] w-[0px] my-[5px] relative `}
                    />
                </div>

                <p className="flex-1 mx-[10px] -mt-[4px]">
                    {warehouseStatus[1]}{" "}
                    <TimeCard stage={3} trackingDetail={props.trackingDetail} />
                </p>
            </div>

            <div className="flex-type2">
                <div
                    className="h-[10px] w-[10px] rounded-[50%] bg-[#A9A9A9]"
                    style={
                        props.packageStatus >= 4
                            ? { backgroundColor: "#35C6F4" }
                            : {}
                    }
                />

                <p className="flex-1 mx-[10px]  -mt-[4px] ">
                    {warehouseStatus[2]}{" "}
                    <TimeCard stage={4} trackingDetail={props.trackingDetail} />
                </p>
            </div>
        </div>
    );
};

export default WarehouseTracking;
