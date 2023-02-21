import React, { useState, useRef } from "react";
import StatCard from "./StatCard";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import downwardImage from "../../../public/downwardArrow.png";
import { faAngleDown, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import { getDateInStringFormat } from "@/lib/helper";
import Calendar from "react-calendar";

import ClickOutside from "@/components/common/ClickOutside";

const TotalOrders = () => {
    const trigger = useRef<any>(null);

    const [selectedDate, setSelectedDate] = useState<Date | string>(new Date());
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const toggleCalendar = () => {
        setShowCalendar((prev) => !prev);
    };
    function smartToggleGateHandler() {
        setShowCalendar(false);
    }

    const calendarChangeHandler = (value: Date) => {
        //   props.filterByDate(value);
        // props.filterByDate(value);
        setSelectedDate(value);
    };

    return (
        <StatCard>
            <div className="w-full flex-type3">
                <p className="flex-1 text-[12px] text-[#8794AD] font-[600] leading-[18px] ">Total Orders</p>

                <div className="flex-1 flex flex-row justify-end items-center relative">
                    <div
                        className="border-[1px] border-[#BBC2CF] rounded-[4px] text-[12px] text-[#2B2B2B] font-[600] leading-[18px] box-border px-[10px] py-[5px]  hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative cursor-pointer"
                        onClick={toggleCalendar}
                        style={showCalendar ? { backgroundColor: "#3672DF", color: "#FFFFFF" } : {}}
                        ref={trigger}
                    >
                        <span className="box-border  text-center">
                            {moment(selectedDate).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY") ? "today" : getDateInStringFormat(selectedDate)}
                        </span>
                        <div className="relative h-[6px] w-[8px]  ">
                            <Image src={downwardImage} fill={true} alt="arrow" objectFit="cover" />
                        </div>
                    </div>

                    {showCalendar ? (
                        <ClickOutside handler={smartToggleGateHandler} trigger={trigger}>
                            <div className="absolute top-[30px] right-[0px] bg-white rounded shadow z-[50] border-[1px] p-3 ">
                                <Calendar
                                    onChange={calendarChangeHandler}
                                    // value={calendarValue}
                                    next2Label={null}
                                    prev2Label={null}
                                    nextLabel={<FontAwesomeIcon icon={faAngleRight} className="w-2" />}
                                    prevLabel={<FontAwesomeIcon icon={faAngleLeft} className="w-2" />}
                                    view={"month"}
                                    // tileClassName={({ date, view }) => {
                                    //   if (
                                    //     props.allLiveOrders?.find(
                                    //       (x: any) =>
                                    //         moment(x.created_on_orders).format("DD-MM-YYYY") ===
                                    //         moment(date).format("DD-MM-YYYY")
                                    //     )
                                    //   ) {
                                    //     return "highlight" as any;
                                    //   }
                                    // }}
                                />
                            </div>
                        </ClickOutside>
                    ) : null}
                </div>
            </div>
            <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">1000</p>
        </StatCard>
    );
};

export default TotalOrders;
