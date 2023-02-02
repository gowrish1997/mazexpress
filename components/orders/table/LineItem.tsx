import React, { createRef, useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import OrderOptionModal from "../modal/OrderOptionModal";
import useClickOutside from "@/customHook/useClickOutside";
import { IOrderResponse } from "@/models/order.interface";
import useAddresses from "@/lib/useAddresses";
import useUser from "@/lib/useUser";
import useTracking from "@/lib/useTracking";
import { getDateInStringFormat } from "@/lib/helper";

interface IProp {
  row: IOrderResponse;
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
  const { user, mutateUser } = useUser();
  const { addresses, mutateAddresses } = useAddresses({
    userId: user?.id_users,
  });
  const { tracking, trackingIsLoading, mutateTracking } = useTracking({
    order_id: row.id_orders,
  });

  const [estDelivery, setEstDelivery] = useState();

  // const modalTriggerNode = createRef<HTMLTableCellElement>();
  const trigger = useRef<any>();

  const modalNode = useClickOutside(
    (e) => {
      // setActive(-1);
      if (show) setActive(-1);
      else setActive(index);
    },
    trigger,
    show
  );

  function optionModalHandler(e: any, index: number) {
    setActiveHandler(index, e);
  }

  const orderStatusColorHandler = (status: string) => {
    switch (status) {
      case "processing":
        return "in_transit";

      case "completed":
        return "delivered";

      case "At warehouse":
        return "at_warehouse";

      default:
    }
  };

  useEffect(() => {
    // console.log(tracking);
    if (tracking !== undefined) {
      // sort and set delivery
      let latestUpdate = [...tracking].sort(
        (a, b) => b.stage_tracking - a.stage_tracking
      )[0];
      let newDate = new Date(latestUpdate.created_on_tracking);
      newDate.setDate(newDate.getDate() + 7);
      const newDateString = getDateInStringFormat(newDate);
      setEstDelivery(newDateString);
    }
  }, [tracking]);

  return (
    <>
      <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative">
        <td className={`td1`}>{row.id_orders}</td>
        <td className={`td2 text-[#3672DF]`}>{row.store_link_orders}</td>
        <td className={`td3`}>{row.reference_id_orders}</td>
        <td className={`td4`}>{estDelivery ? estDelivery : "..."}</td>
        <td className={`td5 flex flex-row items-center gap-x-[10px]`}>
          {
            addresses?.find((el) => el.id_addresses === row.address_id)
              ?.tag_addresses
          }
          {user?.default_address_users === row.address_id && (
            <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px] ">
              Default
            </div>
          )}
        </td>
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
          <Image
            src="/editicon.png"
            ref={trigger}
            height={13}
            width={4}
            alt="editIcon"
          />
          {show && <OrderOptionModal ref={modalNode} />}
        </td>
      </tr>
    </>
  );
};
export default LineItem;
