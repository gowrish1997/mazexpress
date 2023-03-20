import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
interface IProp {
  show: boolean;
  close: () => void;
  setShipmentSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  confirm: () => void;
}
const ScheduleShipmentModal = (props: IProp) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState<boolean>(false);

  const calendarChangeHandler = (value: Date) => {
    setSelectedDate(value);
    setError(false);
    props.setShipmentSelectedDate(value);
  };

  const confirmClickHandler = () => {
    if (selectedDate) {
      setSelectedDate(null);
      props.confirm();
      props.close();
    } else {
      setError(true);
    }
  };

  return (
    <>
      {props.show && (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
          <div className="bg-[#FFFFFF] rounded-[4px] p-[20px] w-[379px] flex-type7 gap-y-[30px] ">
            <p className="text-[18px] text-[#2B2B2B] leading-[25px] font-[700] ">
              Schedule Selected Shipments{" "}
            </p>
            <div className=" bg-white rounded shadow  z-[50]">
              <Calendar
                className="shcedule_shipment_calender"
                onChange={calendarChangeHandler}
                next2Label={null}
                prev2Label={null}
                nextLabel={<FontAwesomeIcon icon={faAngleRight} size="xs" />}
                prevLabel={<FontAwesomeIcon icon={faAngleLeft} size="xs" />}
                view={"month"}
              />
            </div>

            <div className="flex-type1 space-x-[10px] mt-[5px] ">
              <button
                className="box-border w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center"
                onClick={() => props.close()}
              >
                Cancel
              </button>
              <button
                className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] px-[15px] "
                type="submit"
                onClick={confirmClickHandler}
              >
                Schedule Shipments
              </button>
            </div>
            {error && (
              <p className="text-[12px] text-[#f02849] leading-[16px]">
                Please select the date
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleShipmentModal;
