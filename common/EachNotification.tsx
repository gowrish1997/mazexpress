import React from "react";
import Image from "next/image";
import { getDateInStringFormat } from "@/lib/helper";
import { getTimeInHourAndMinuteFormat } from "@/lib/helper";
import useNotification from "@/lib/useNotification";
interface IProp {
  //   content: any;
  id: number;
}

const EachNotification = (props: IProp) => {
  const { notification, mutateNotification, notificationIsLoading } =
    useNotification({ id: props.id });

  if (notificationIsLoading) return <div>loading notification</div>;
  return (
    <div className=" border-[0.5px] border-[#BBC2CF] p-[15px] bg-[#ffffff] rounded-[4px] space-y-[25px]">
      <div className="space-y-[10px]">
        <p className="text-[#2B2B2B] text-[14px] font-[600] leading-[19px] ">
          {notification?.title_notifications}
        </p>
        <p className="text-[#2B2B2B] text-[13px] font-[400] leading-[18px]">
          {notification?.content_notifications}
        </p>
        {/* <Image src={`/${props.content.content_notifications}`} width={333} height={221} alt="bill" /> */}
      </div>
      <div className="flex-type3">
        <span className="text-[#8794AD] text-[12px] font-[500] leading-[18px] ">
          {`${getDateInStringFormat(
            notification?.created_on_notifications
          )},  ${getTimeInHourAndMinuteFormat(
            notification?.created_on_notifications
          )}`}
        </span>
        <button className="text-[#3672DF] text-[12px] font-[500] leading-[18px] ">
          Clear
        </button>
      </div>
    </div>
  );
};

export default EachNotification;
