import {
    getDateInStringFormat,
    getTimeInHourAndMinuteFormat,
} from "@/lib/helper";
import { useState } from "react";
import { Notification } from "@/models/notification.model";

interface IProp {
    data: Notification;
    id: string;
    delete: (id: string) => void;

    onClick: (id?: string) => void;
}

const EachNotification = (props: IProp) => {
    const [data, setData] = useState<Notification>(props.data);

    const markAsDeleted = async () => {
        props.delete(props.id);

        // if (notification !== undefined) {
        //   // console.log(notificationError);
        //   try {
        //     const resp = await mutateNotification(
        //       await fetchJson(`/api/notifications?id=${props.id}`, {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ status: "deleted" }),
        //       }),
        //       false
        //     );
        //     // console.log(resp)
        //   } catch (error) {
        //     if (error instanceof FetchError) {
        //       // setErrorMsg(error.data.message);
        //       console.log(error.data.message);
        //     } else {
        //       console.error("An unexpected error happened:", error);
        //     }
        //   }
        // }
    };

    return (
        <>
            <div className=" border-[0.5px] border-[#BBC2CF] p-[15px] bg-[#ffffff] rounded-[4px] space-y-[25px]">
                <div
                    className="space-y-[10px] cursor-pointer"
                    onClick={() => props.onClick(props.data?.id)}
                >
                    <p className="text-[#35c6f4] text-[14px] font-[600] leading-[19px] ">
                        {data.title}
                    </p>
                    <p className="text-[#2B2B2B] text-[13px] font-[400] leading-[18px]">
                        {data.content}
                    </p>
                    {/* <Image src={`/${props.content.content}`} width={333} height={221} alt="bill" /> */}
                </div>
                <div className="flex-type3">
                    <span className="text-[#8794AD] text-[12px] font-[500] leading-[18px] ">
                        {`${getDateInStringFormat(
                            data.created_on
                        )},  ${getTimeInHourAndMinuteFormat(data.created_on)}`}
                    </span>
                    <button
                        className="text-[#35C6F4] text-[12px] font-[500] leading-[18px]"
                        onClick={markAsDeleted}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </>
    );
};

export default EachNotification;
