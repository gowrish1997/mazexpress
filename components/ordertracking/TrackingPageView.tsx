import { Tracking } from "@/models/tracking.model";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PackageTrackingView from "./PackageTrackingView";
import TimeCard from "./TimeCard";
import WarehouseTracking from "./WarehouseTracking";
import { useState } from "react";
import WarehouseTrackingModal from "./modal/WarehouseTrackingModal";

interface IProp {
    packageStatus: number;
    trackingDetail: Tracking[];
}

const TrackingPageView = (props: IProp) => {
    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation("common");
    const stageFirstStatus: string[] = t(
        "trackingView.view.packageStatus.stageFirst.Status",
        { returnObjects: true }
    );
    const stageSecondStatus: string[] = t(
        "trackingView.view.packageStatus.stageSecond.Status",
        { returnObjects: true }
    );
    const stageThirdStatus: string[] = t(
        "trackingView.view.packageStatus.stageThird.Status",
        { returnObjects: true }
    );
    const stageFourStatus: string[] = t(
        "trackingView.view.packageStatus.stageFour.Status",
        { returnObjects: true }
    );

    const [showWarehouseTrackingModal, setShowWarehouseTrackingModal] =
        useState(false);

    const toggleWarehouseTrackingModal = () => {
        setShowWarehouseTrackingModal((prev) => !prev);
    };

    return (
        <>
            <div className="font-[500] space-y-[5px]">
                <p className="text-[14px] text-[#2B2B2B] leading-[21px]">
                    {t("trackingView.view.Title")}
                </p>
            </div>

            <div className="flex-type2 justify-start w-[100%] gap-x-[50px] px-[20px] ">
                <PackageTrackingView packageStatus={props.packageStatus} />
                <div className="flex-type6 text-[#525D72] font-[500] leading-[21px] text-[14px] ">
                    <div className="w-full flex-type6 gap-y-[5px] mt-[20px]  ">
                        <p
                            className={`w-full ${
                                props.packageStatus >= 0
                                    ? "text-[#2B2B2B] font-[600] "
                                    : ""
                            }`}
                        >
                            <span>
                                {t(
                                    "trackingView.view.packageStatus.stageFirst.Title"
                                )}{" "}
                            </span>
                            <TimeCard
                                stage={0}
                                trackingDetail={props.trackingDetail}
                            />
                        </p>
                        <button
                            className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                props.packageStatus > 0
                                    ? "text-[green] bg-[#DEFDED]"
                                    : "text-[#FFBA00] bg-[#FFF8E3]"
                            }`}
                        >
                            {props.packageStatus > 0
                                ? stageFirstStatus[0]
                                : stageFirstStatus[1]}
                        </button>
                    </div>
                    <div className="flex-type6 gap-y-[5px] mt-[35px] sm:mt-[55px] ">
                        <p
                            className={`${
                                props.packageStatus >= 1
                                    ? "text-[#2B2B2B] font-[600] "
                                    : ""
                            }`}
                        >
                            {t(
                                "trackingView.view.packageStatus.stageSecond.Title"
                            )}
                            <TimeCard
                                stage={1}
                                trackingDetail={props.trackingDetail}
                            />
                        </p>
                        <button
                            className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                props.packageStatus >= 1
                                    ? props.packageStatus > 3
                                        ? "text-[green] bg-[#DEFDED] "
                                        : " text-[#FFBA00] bg-[#FFF8E3]"
                                    : ""
                            }`}
                        >
                            {" "}
                            {props.packageStatus >= 1
                                ? props.packageStatus > 3
                                    ? stageSecondStatus[0]
                                    : stageSecondStatus[1]
                                : stageSecondStatus[2]}
                        </button>
                        <div className="hidden sm:block">
                            <WarehouseTracking
                                packageStatus={props.packageStatus}
                                trackingDetail={props.trackingDetail}
                            />
                        </div>

                        <button
                            className="sm:hidden text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px]"
                            type="submit"
                            onClick={toggleWarehouseTrackingModal}
                        >
                            Click here
                        </button>
                    </div>
                    <div className="flex-type6 gap-y-[5px] mt-[80px] sm:mt-[25px] ">
                        <p
                            className={`${
                                props.packageStatus >= 4
                                    ? "text-[#2B2B2B] font-[600] "
                                    : ""
                            }`}
                        >
                            {t(
                                "trackingView.view.packageStatus.stageThird.Title"
                            )}
                            <TimeCard
                                stage={4}
                                trackingDetail={props.trackingDetail}
                            />
                        </p>
                        <button
                            className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                props.packageStatus >= 4
                                    ? props.packageStatus == 4
                                        ? "text-[#FFBA00] bg-[#FFF8E3] "
                                        : "text-[green] bg-[#DEFDED]"
                                    : ""
                            }`}
                        >
                            {props.packageStatus >= 4
                                ? props.packageStatus == 4
                                    ? stageThirdStatus[0]
                                    : stageThirdStatus[1]
                                : stageSecondStatus[2]}
                        </button>
                    </div>
                    <div className="flex-type6 gap-y-[5px] mt-[110px] ">
                        <p
                            className={`${
                                props.packageStatus >= 5
                                    ? "text-[#2B2B2B] font-[600] "
                                    : ""
                            }`}
                        >
                            {t(
                                "trackingView.view.packageStatus.stageFour.Title"
                            )}
                            <TimeCard
                                stage={5}
                                trackingDetail={props.trackingDetail}
                            />
                        </p>
                        <button
                            className={`text-[10px] leading-[15px] bg-[#EDF5F9] rounded-[15px] p-[7px] px-[9px] ${
                                props.packageStatus == 5
                                    ? "text-[#FFBA00] bg-[#FFF8E3]"
                                    : ""
                            }`}
                        >
                            {props.packageStatus == 5
                                ? stageFourStatus[0]
                                : stageFourStatus[1]}
                        </button>
                    </div>
                </div>
                {/* <TimeTracking trackingDetail={props.trackingDetail} /> */}
                {showWarehouseTrackingModal && (
                    <WarehouseTrackingModal
                        packageStatus={props.packageStatus}
                        trackingDetail={props.trackingDetail}
                        close={toggleWarehouseTrackingModal}
                    />
                )}
            </div>
        </>
    );
};

export default TrackingPageView;
