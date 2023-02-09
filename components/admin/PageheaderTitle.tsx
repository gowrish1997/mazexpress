import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { IOrderResponse } from "@/models/order.interface";
import { getDateInStringFormat } from "@/lib/helper";
import Calendar from "react-calendar";
import cancel from "../../public/cancel.png";

interface IProp {
    content: string;
    allLiveOrders: IOrderResponse[];
}

const PageheaderTitle = (props: IProp) => {
    const [filterDate, setFilterDate] = useState<Date | string>("");
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const toggleCalendar = () => {
        setShowCalendar((prev) => !prev);
    };

    const calendarChangeHandler = (value: Date) => {
        console.log(value);
        setFilterDate(value);
    };
    return (
        <>
            <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px]">{props.content}</p>
            <div className="flex-1 flex flex-row justify-start items-center relative">
                <div className="flex-type1 border-[1px] border-[#BBC2CF] rounded-[4px] ml-[10px] py-[7px] px-[10px] space-x-[10px] " onClick={toggleCalendar}>
                    <div className="relative h-[18px] w-[16px] text-[#9845DB] cursor-pointer">
                        <Image src="/calendar_icon.png" layout="fill" objectFit="contain" alt="button" />
                    </div>
                    <span className="box-border font-[500] text-[16px] leading-[22.4px] text-[#3672DF] text-center">
                        {filterDate ? getDateInStringFormat(filterDate) : "No date selected"}
                    </span>
                </div>

                {showCalendar ? (
                    <div className="absolute top-[40px] left-[10px] bg-white rounded shadow  z-[50]">
                        <Calendar
                            onChange={calendarChangeHandler}
                            // value={calendarValue}
                            next2Label={null}
                            prev2Label={null}
                            nextLabel={<FontAwesomeIcon icon={faAngleRight} size="xs" />}
                            prevLabel={<FontAwesomeIcon icon={faAngleLeft} size="xs" />}
                            view={"month"}
                            tileClassName={({ date, view }) => {
                                if (props.allLiveOrders?.find((x) => x.received_on_orders === moment(date).format("DD-MM-YYYY"))) {
                                    return "highlight" as any;
                                }
                            }}
                        />
                    </div>
                ) : null}
                {filterDate && <Image src={cancel} height={15} width={15} alt="cancel" className="ml-[5px] cursor-pointer " />}
            </div>
        </>
    );
};

export default PageheaderTitle;
