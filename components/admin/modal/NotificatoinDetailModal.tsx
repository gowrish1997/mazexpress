import React from "react";
import { Notification } from "@/models/notification.model";
interface IProp {
  close: () => void;
  data: Notification;
}

const NotificatoinDetailModal = (props: IProp) => {
  return (
    <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-40 flex flex-row justify-center items-center">
      <div className=" box-border flex-type6 bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] space-y-[10px]">
        <div className="space-y-[10px]">
          <p className="text-[#35c6f4] text-[20px] font-[600] leading-[19px] ">
            {props.data.title}
          </p>
          <p className="text-[#2B2B2B] text-[13px] font-[400] leading-[18px]">
            {props.data.content}
          </p>
          {/* <Image src={`/${props.content.content}`} width={333} height={221} alt="bill" /> */}
        </div>
      </div>
    </div>
  );
};

export default NotificatoinDetailModal;
