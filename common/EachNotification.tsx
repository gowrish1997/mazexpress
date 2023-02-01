import React, { useState } from "react";
import Image from "next/image";
import { getDateInStringFormat } from "@/lib/helper";
import { getTimeInHourAndMinuteFormat } from "@/lib/helper";
import { INotification } from "@/models/notification.interface";
import { FetchError } from "@/lib/fetchJson";
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
interface IProp {
    content: INotification;
}

const EachNotification = (props: IProp) => {
    const { user, mutateUser, userIsLoading } = useUser();
    const [errorMag, setErrorMsg] = useState("");

    const notificatoinHandler = async () => {
        if (user && user.id_users) {
            // update user
            try {
                mutateUser(
                    await fetchJson(`/api/notifications?id=${props.content.id_notifications}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({status_notifications:'read'}),
                    }),
                    false
                );
                // router.push("/");
            } catch (error) {
                if (error instanceof FetchError) {
                    setErrorMsg(error.data.message);
                } else {
                    console.error("An unexpected error happened:", error);
                }
            }
        }
    };

    return (
        <div className=" border-[0.5px] border-[#BBC2CF] p-[15px] bg-[#ffffff] rounded-[4px] space-y-[25px]">
            <div className="space-y-[10px]">
                <p className="text-[#2B2B2B] text-[14px] font-[600] leading-[19px] ">{props.content.title_notifications}</p>
                <p className="text-[#2B2B2B] text-[13px] font-[400] leading-[18px]">{props.content.content_notifications}</p>
            </div>
            <div className="flex-type3">
                <span className="text-[#8794AD] text-[12px] font-[500] leading-[18px] ">
                    {`${getDateInStringFormat(props.content.created_on_notifications)},  ${getTimeInHourAndMinuteFormat(props.content.created_on_notifications)}`}
                </span>
                <button className="text-[#3672DF] text-[12px] font-[500] leading-[18px]" onClick={notificatoinHandler}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default EachNotification;
