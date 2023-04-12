import React, { useEffect, useState } from "react";
import { getTimeInHourAndMinuteFormat } from "@/lib/helper";
import { getDateInStringFormat } from "@/lib/helper";
import { Tracking } from "@/models/tracking.model";
interface IProp {
    stage: number;
    trackingDetail: Tracking[];
}

const TimeCard = (props: IProp) => {
    const [isStageExist, setIsStageExist] = useState<boolean>(false);
    useEffect(() => {
        const findStage = props.trackingDetail?.find((data) => {
            return data.stage == props.stage;
        });

        if (findStage) {
            setIsStageExist(true);
        } else {
            setIsStageExist(false);
        }
    }, [props.trackingDetail]);
    return (
        <>
            {isStageExist && (
                <span className="text-[#8794AD] text-[12px] font-[500] leading-[18px] mx-[15px] ">
                    {`${getDateInStringFormat(
                        props.trackingDetail?.find(
                            (data, index) => data.stage == props.stage
                        )?.created_on!
                    )},  ${getTimeInHourAndMinuteFormat(
                        props.trackingDetail.find(
                            (data, index) => data.stage == props.stage
                        )?.created_on
                    )}`}
                </span>
            )}
        </>
    );
};

export default TimeCard;
