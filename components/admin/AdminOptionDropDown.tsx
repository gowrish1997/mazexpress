import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import download from "../../public/download.png";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ClickOutside from "../common/ClickOutside";
import axios from "axios";
interface Iprop {
  option?: string[];
  toggle?: (value?: string) => void;
  disabled?: boolean;
  orders: any;
  type?: string;
}

const AdminOptionDropDown = (props: Iprop) => {
  const trigger = useRef<any>(null);

  const [showAdminOptionCard, setShowAdminOptionCard] = useState(false);
  const [selectedOrdersStage, setselectedOrdersStage] = useState(0);

  useEffect(() => {
    if (props.type == "in-transit" && props.orders?.length > 0) {
      const getLatestStageHandler = async () => {
        try {
          const result: any = await axios.post("/api/tracking", {
            orders: props.orders,
          });

          const allEqual = () =>
            result.data.data.every((val: any) => val === result.data.data[0]);
          console.log(allEqual());

          if (allEqual()) {
            setselectedOrdersStage(result.data.data[0].stage);
          } else {
            setselectedOrdersStage(0);
          }
        } catch (error: any) {
          console.log(error.message);
        }
      };

      getLatestStageHandler();
    } else if (props.type == "in-transit" && props.orders) {
      setselectedOrdersStage(0);
    }
  }, [props.orders]);

  const toggleAdminOptionCard = () => {
    setShowAdminOptionCard((prev) => !prev);
  };

  const smartToggleGateHandler = () => {
    setShowAdminOptionCard(false);
  };
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    // console.log("downloading");
    const ws = XLSX.utils.json_to_sheet(props.orders);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data1 = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data1, "download" + fileExtension);
  };

  return (
    <div className="relative z-10">
      <button
        className="box-border border-[1px] border-[#BBC2CF] h-[38px] w-[180px] px-[10px] rounded-[4px]  text-[14px] font-[700] text-[#525D72] leading-[19px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative"
        style={
          showAdminOptionCard
            ? { backgroundColor: "#3672DF", color: "#FFFFFF" }
            : {}
        }
        onClick={toggleAdminOptionCard}
      >
        <span>Actions</span>
        <div className="relative h-[6px] w-[8px]  ">
          <Image
            src="/downwardArrow.png"
            fill={true}
            alt="arrow"
            objectFit="cover"
          />
        </div>
      </button>
      {showAdminOptionCard && (
        <ClickOutside trigger={trigger} handler={smartToggleGateHandler}>
          <div className="w-full bg-[white] box-border absolute top-[30px] border-[1px] border-[#ccc] rounded-[4px] mt-[10px] p-[5px]">
            <button
              className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize flex flex-row justify-start items-center space-x-[5px]"
              onClick={exportToCSV}
            >
              <Image src={download} height={13} width={13} alt="download" />
              <span>download</span>
            </button>
            {props.type != "in-transit" &&
              props.option &&
              props.option.map((data, index) => {
                return (
                  <button
                    key={index}
                    className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                    onClick={() => props.toggle?.(data)}
                    disabled={props.disabled}
                  >
                    {data}
                  </button>
                );
              })}
            {props.type == "in-transit" &&
              props.option &&
              props.option.map((data, index) => {
                if (index + 2 == selectedOrdersStage)
                  return (
                    <button
                      key={index}
                      className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                      onClick={() => props.toggle?.(data)}
                      disabled={props.disabled}
                    >
                      {data}
                    </button>
                  );
              })}

            {props.type == "in-transit" && (
              <button
                className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                onClick={() => props.toggle?.("Received in Libya")}
                disabled={props.disabled}
              >
                Add comment
              </button>
            )}
          </div>
        </ClickOutside>
      )}
    </div>
  );
};

export default AdminOptionDropDown;
