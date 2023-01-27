import React from "react";
import Image from "next/image";
import OrderOptionModal from "../modal/OrderOptionModal";
import useClickOutside from "@/customHook/useClickOutside";
import { IOrder } from "@/models/order.interface";
interface IProp {
  row: IOrder;
  active: number;
  setActiveHandler: (index: number, e: any) => void;
  index: number;
  show: boolean;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const LineItem = ({
  row,
  active,
  setActiveHandler,
  index,
  show,
  setActive,
}: IProp) => {
  let modalNode = useClickOutside(() => {
    setActive(-1);
  });

  function optionModalHandler(e: any, index: number) {
    setActiveHandler(index, e);
  }

  const orderStatusColorHandler = (status: string) => {
    switch (status) {
      case "In Transit":
        return "in_transit";

      case "Delivered":
        return "delivered";

      case "At warehouse":
        return "at_warehouse";

      default:
    }
  };

  return (
    <>
      <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px]">
        <td className={`td1`}>{row.reference_id_orders}</td>
        <td className={`td2`}>{row.store_link_orders}</td>
        <td className={`td3`}>{row.reference_id_orders}</td>
        <td className={`td4`}>estimated delivery</td>
        <td className={`td5`}>{row.address_id}</td>
        <td className={`td6`}>
          <label
            className={`customRadioInput ${orderStatusColorHandler(
              row.status_orders
            )}`}
          >
            <input type="radio" checked={true} />
            <span className="checkmark"></span>
          </label>
          <span className="ml-[5px]">{row.status_orders}</span>
        </td>
        <td
          className="box-border relative cursor-pointer"
          onClick={(e) => optionModalHandler(e, index)}
        >
          <Image src="/editicon.png" height={13} width={4} alt="editIcon" />
          {show && <OrderOptionModal ref={modalNode} />}
        </td>
      </tr>
    </>
  );
};

export default LineItem;
