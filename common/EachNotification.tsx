import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getDateInStringFormat } from "@/lib/helper";
import { getTimeInHourAndMinuteFormat } from "@/lib/helper";
import useNotification from "@/lib/useNotification";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { INotification } from "@/models/notification.interface";
import axios from "axios";
interface IProp {
  data: any;
  id: number;
  delete: (id: number) => void;
}

const EachNotification = (props: IProp) => {
  const {
    notification,
    mutateNotification,
    notificationIsLoading,
    notificationError,
  } = useNotification({ id: props.id });

  const [data, setData] = useState<INotification>(props.data);
  // console.log(props.data);

  const markAsDeleted = async () => {
    props.delete(props.id);

    if (notification !== undefined) {
      // console.log(notificationError);
      try {
        mutateNotification(
          await fetchJson(`/api/notifications?id=${props.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status_notifications: "deleted" }),
          }),
          false
        );
      } catch (error) {
        if (error instanceof FetchError) {
          // setErrorMsg(error.data.message);
          console.log(error.data.message);
        } else {
          console.error("An unexpected error happened:", error);
        }
      }
    }
  };

  const markAsRead = async () => {
    mutateNotification(
      await fetchJson(`/api/notifications?id=${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_notifications: "read" }),
      }),
      false
    );
  };

  // useEffect(() => {
  //   // console.log(notification);
  //   if(notification !== undefined){
  //     setData(notification)
  //   }
  // }, [notification]);

  if (notificationIsLoading) {
    return <div>loading notification</div>;
  }
  return (
    <div className=" border-[0.5px] border-[#BBC2CF] p-[15px] bg-[#ffffff] rounded-[4px] space-y-[25px]">
      <div className="space-y-[10px]">
        <p className="text-[#2B2B2B] text-[14px] font-[600] leading-[19px] ">
          {data.title_notifications} {data.id_notifications}
        </p>
        <p className="text-[#2B2B2B] text-[13px] font-[400] leading-[18px]">
          {data.content_notifications}
        </p>
        {/* <Image src={`/${props.content.content_notifications}`} width={333} height={221} alt="bill" /> */}
      </div>
      <div className="flex-type3">
        <span className="text-[#8794AD] text-[12px] font-[500] leading-[18px] ">
          {`${getDateInStringFormat(
            data.created_on_notifications
          )},  ${getTimeInHourAndMinuteFormat(data.created_on_notifications)}`}
        </span>
        <button
          className="text-[#3672DF] text-[12px] font-[500] leading-[18px]"
          onClick={markAsDeleted}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default EachNotification;
