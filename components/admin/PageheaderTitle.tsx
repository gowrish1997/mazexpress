import React, { useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import calendarIcon from "@/public/calendar_icon.png";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getDateInStringFormat } from "@/lib/helper";
import Calendar from "react-calendar";
import cancel from "../../public/cancel.png";
import ClickOutside from "../common/ClickOutside";

interface IProp {
  content: string;
  allLiveOrders: any;
  filterByDate: (value: Date | string) => void;
}

const PageheaderTitle = (props: IProp) => {
  const trigger = useRef<any>(null);

  const [filterDate, setFilterDate] = useState<Date | string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };
  function smartToggleGateHandler() {
    setShowCalendar(false);
  }

  const calendarChangeHandler = (value: Date) => {
    props.filterByDate(value);
    // props.filterByDate(value);
    setFilterDate(value);
  };

  const clearDateHandler = () => {
    props.filterByDate("");
    // props.filterByDate(value);
    setFilterDate("");
  };

  return (
    <div className="flex-type1">
      <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px]">
        {props.content}
      </p>
      <div className="flex-1 flex flex-row justify-start items-center relative">
        <div
          className="flex-type1 border-[1px] border-[#BBC2CF] rounded-[4px] ml-[10px] py-[7px] px-[10px] space-x-[10px] cursor-pointer "
          onClick={toggleCalendar}
          ref={trigger}
        >
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

        {showCalendar ? (
          <ClickOutside handler={smartToggleGateHandler} trigger={trigger}>
            <div className="absolute top-[40px] left-[10px] bg-white rounded shadow z-[50] border-[1px] p-3 ">
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
                tileClassName={({ date, view }) => {
                  if (
                    props.allLiveOrders?.find(
                      (x: any) =>
                        moment(x.created_on_orders).format("DD-MM-YYYY") ===
                        moment(date).format("DD-MM-YYYY")
                    )
                  ) {
                    return "highlight" as any;
                  }
                }}
              />
            </div>
          </ClickOutside>
        ) : null}
        {filterDate && (
          <Image
            src={cancel}
            height={15}
            width={15}
            alt="cancel"
            className="ml-[5px] cursor-pointer"
            onClick={clearDateHandler}
          />
        )}
      </div>
    </div>
  );
};

export default PageheaderTitle;
