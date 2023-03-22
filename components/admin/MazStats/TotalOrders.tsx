import React, { useEffect, useRef, useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useOrders from "@/lib/hooks/useOrders";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import downwardImage from "../../../public/downwardArrow.png";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import { getDateInStringFormat } from "@/lib/helper";
import Calendar from "react-calendar";

import ClickOutside from "@/components/common/ClickOutside";
import useOrderCount from "@/lib/hooks/useOrderCount";
import { getDateInDBFormat } from "@/lib/utils";

const options = [
  // { value: "", label: "all" },
  { value: "at-warehouse", label: "At warehouse" },
  { value: "in-transit", label: "In transit" },
  { value: "out-for-delivery", label: "Out for delivery" },
  { value: "delivered", label: "Delivered" },
];

const TotalOrders = () => {
  const [statusSelection, setStatusSelection] = useState<(string | number)[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const { orderCount, mutateOrderCount } = useOrderCount({
    // status: statusSelection as string[],
    status: [
      "pending",
      "at-warehouse",
      "in-transit",
      "out-for-delivery",
      "delivered",
    ],
    date: selectedDate ? getDateInDBFormat(selectedDate as Date) : undefined,
  });

  const statusChangeHandler = (value: string | number) => {
    // console.log(value);
    setStatusSelection((prev) => {
      if (prev.includes(value)) {
        return prev.filter((el) => el !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const trigger = useRef<any>(null);

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

  useEffect(() => {
    console.log(orderCount);
  }, [selectedDate]);

  return (
    // <StatCard>
    //   <div className="w-full flex-type3">
    //     <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">
    //       Total Orders
    //     </p>
    //     <MazStatsDropddown
    //       options={options}
    //       header="status"
    //       onChange={statusChangeHandler}
    //       selection={statusSelection}
    //     />
    //   </div>
    //   <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
    //     {totalOrders as number}
    //   </p>
    // </StatCard>
    <StatCard>
      <div className="w-full flex-type3">
        <p className="flex-1 text-[12px] text-[#8794AD] font-[600] leading-[18px] ">
          Total Orders
        </p>

        <div className="flex-1 flex flex-row justify-end items-center relative">
          <div
            className="border-[1px] border-[#BBC2CF] rounded-[4px] text-[12px] text-[#2B2B2B] font-[600] leading-[18px] box-border px-[10px] py-[5px]  hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative cursor-pointer"
            onClick={toggleCalendar}
            style={
              showCalendar
                ? { backgroundColor: "#35C6F4", color: "#FFFFFF" }
                : {}
            }
            ref={trigger}
          >
            <span className="box-border text-center">
              {moment(selectedDate).format("DD-MM-YYYY") ===
              moment(new Date()).format("DD-MM-YYYY")
                ? "today"
                : getDateInStringFormat(selectedDate as Date)}
              {!selectedDate && "no date selected"}
            </span>
            <div className="relative h-[6px] w-[8px]  ">
              <Image
                src={downwardImage}
                fill={true}
                alt="arrow"
                objectFit="cover"
              />
            </div>
          </div>
          {selectedDate && (
            <span className="mx-2" onClick={() => setSelectedDate(null)}>
              x
            </span>
          )}

          {showCalendar ? (
            <ClickOutside handler={smartToggleGateHandler} trigger={trigger}>
              <div className="absolute top-[30px] right-[0px] bg-white rounded shadow z-[50] border-[1px] p-3 ">
                <Calendar
                  onChange={calendarChangeHandler}
                  // value={calendarValue}
                  next2Label={null}
                  prev2Label={null}
                  nextLabel={
                    <FontAwesomeIcon icon={faAngleRight} className="w-2" />
                  }
                  prevLabel={
                    <FontAwesomeIcon icon={faAngleLeft} className="w-2" />
                  }
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
      <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
        {orderCount}
      </p>
    </StatCard>
  );
};
export default TotalOrders;
