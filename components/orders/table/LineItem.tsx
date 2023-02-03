import React, { createRef, useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import OrderOptionModal from "../modal/OrderOptionModal";
import useClickOutside from "@/lib/useClickOutside";
import { IOrderResponse } from "@/models/order.interface";
import useAddresses from "@/lib/useAddresses";
import useUser from "@/lib/useUser";
import useTracking from "@/lib/useTracking";
import { getDateInStringFormat } from "@/lib/helper";

interface IProp {
  row: IOrderResponse;
}

const LineItem = (props: IProp) => {
  const { user, mutateUser } = useUser();
  const { addresses, mutateAddresses } = useAddresses({
    userId: user?.id_users,
  });
  const { tracking, trackingIsLoading, mutateTracking } = useTracking({
    order_id: props.row.id_orders,
  });

  const [estDelivery, setEstDelivery] = useState<string>("...");
  const [gate, setGate] = useState(false);

  // console.log("tracking render");
  // const modalTriggerNode = createRef<HTMLTableCellElement>();
  const trigger = useRef<any>();

  function smartToggleGateHandler() {
    setGate(false);
  }
  function toggleGateHandler() {
    setGate((prev) => !prev);
  }

  const orderStatusColorHandler = (status: string) => {
    switch (status) {
      case "in-transit":
        return "in_transit";

      case "delivered":
        return "delivered";

      case "at-warehouse":
        return "at_warehouse";
      case "pending":
        return "pending";
      default:
        return "pending";
    }
  };

  useEffect(() => {
    // console.log(tracking);
    // console.log(props.row);
    if (tracking !== undefined && tracking.length > 0) {
      // sort and set delivery
      let latestUpdate = [...tracking].sort(
        (a, b) => b.stage_tracking - a.stage_tracking
      )[0];
      let newDate = new Date(latestUpdate.created_on_tracking);
      newDate.setDate(newDate.getDate() + 7);
      const newDateString = getDateInStringFormat(newDate);
      setEstDelivery(newDateString!);
    }
  }, [tracking]);

  return (
    <tr
      className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative"
      style={{ transform: "scale(1)" }}
    >
      <td className={`td1`}>{props.row.id_orders}</td>
      <td className={`td2 text-[#3672DF]`}>{props.row.store_link_orders}</td>
      <td className={`td3`}>{props.row.reference_id_orders}</td>
      <td className={`td4`}>{estDelivery}</td>
      <td className={`td5 flex flex-row items-center gap-x-[10px]`}>
        {
          addresses?.find((el) => el.id_addresses === props.row.address_id)
            ?.tag_addresses
        }
        {user?.default_address_users === props.row.address_id && (
          <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px] ">
            Default
          </div>
        )}
      </td>
      <td className={`td6`}>
        <label
          className={`customRadioInput ${orderStatusColorHandler(
            props.row.status_orders
          )}`}
        >
          <input type="radio" defaultChecked={true} />
          <span className="checkmark"></span>
        </label>
        <span className="ml-[5px]">{props.row.status_orders}</span>
      </td>
      <td
        className=""
        // onClick={(e) => optionModalHandler(e, index)}
      >
        <div className="w-full h-full relative">
          <div
            onClick={toggleGateHandler}
            ref={trigger}
            className="cursor-pointer"
          >
            <Image
              src="/editicon.png"
              // ref={trigger}
              height={13}
              width={4}
              alt="editIcon"
            />
          </div>
          {gate && (
            <OrderOptionModal
              // ref={modalNode}
              row={props.row}
              handler={smartToggleGateHandler}
              trigger={trigger}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
export default LineItem;
