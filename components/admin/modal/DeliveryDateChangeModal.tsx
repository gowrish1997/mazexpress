import React, { useEffect, useState } from "react";
import { Order } from "@/models/order.model";
import fetchJson from "@/lib/fetchServer";
import Image from "next/image";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import calendarIcon from "@/public/calendar_icon.png";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getDateInStringFormat } from "@/lib/helper";
import Calendar from "react-calendar";
import { createToast } from "@/lib/toasts";
import { KeyedMutator } from "swr";
import { APIResponse } from "@/models/api.model";
interface IProp {
    row: Order;
    close: () => void;
    mutateOrder: KeyedMutator<APIResponse<Order>>;
}
const DeliveryDateChangeModal = (props: IProp) => {
    const [filterDate, setFilterDate] = useState<Date | string>("");
    const calendarChangeHandler = (value: Date) => {
        setFilterDate(value);
    };

    useEffect(() => {
        setFilterDate(
            props.row.est_delivery ? new Date(props.row.est_delivery) : ""
        );
    }, [props.row]);

    const changeDeliveryDateChangeHandler = async () => {
        try {
            const result0 = await fetchJson(`/api/orders/${props.row.maz_id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    est_delivery: filterDate ? filterDate : null,
                }),
            });
            if (result0) {
                createToast({
                    type: "success",
                    title: "Notified User",
                    message: `Sent order received notification to userID ${
                        (props.row as Order).user.id
                    }`,
                    timeOut: 2000,
                });
                props.mutateOrder();
            } else {
                createToast({
                    type: "error",
                    title: "Failed creating notification",
                    message: `check console for more info`,
                    timeOut: 2000,
                });
            }
            props.close();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
            <div className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[50px] px-[50px]  gap-y-[15px]">
                <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
                    Change Delivery date
                </p>
                <div className="flex-1 flex flex-col justify-start items-start relative">
                    <div className="flex-type1 border-[1px] border-[#BBC2CF] rounded-[4px]  py-[7px] px-[10px] space-x-[10px] cursor-pointer ">
                        <div className="relative h-[18px] w-[16px] text-[#9845DB] cursor-pointer">
                            <Image
                                src={calendarIcon}
                                fill
                                style={{ objectFit: "contain" }}
                                alt="button"
                            />
                        </div>
                        <span className="box-border font-[500] text-[16px] leading-[22.4px] text-[#35C6F4] text-center">
                            {filterDate
                                ? getDateInStringFormat(filterDate as Date)
                                : "No date selected"}
                        </span>
                    </div>

                    <div className="top-[40px] left-[10px] bg-white rounded shadow z-[50] border-[1px] p-3 ">
                        <Calendar
                            onChange={calendarChangeHandler}
                            // value={calendarValue}
                            next2Label={null}
                            prev2Label={null}
                            nextLabel={
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="w-2"
                                />
                            }
                            prevLabel={
                                <FontAwesomeIcon
                                    icon={faAngleLeft}
                                    className="w-2"
                                />
                            }
                            view={"month"}
                            tileClassName={({ date, view }) => {
                                if (
                                    // props.allLiveOrders?.find(
                                    //     (x: any) =>
                                    moment(props.row.est_delivery).format(
                                        "DD-MM-YYYY"
                                    ) === moment(date).format("DD-MM-YYYY")
                                    // )
                                ) {
                                    return "highlight" as any;
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-end space-x-[10px] mt-[5px] w-full  ">
                    <button
                        className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px]"
                        onClick={changeDeliveryDateChangeHandler}
                    >
                        Save edit
                    </button>

                    <button
                        className="box-border w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center "
                        onClick={() => props.close()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDateChangeModal;
