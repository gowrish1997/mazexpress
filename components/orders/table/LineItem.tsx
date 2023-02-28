import React, { createRef, useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import OrderOptionModal from "../modal/OrderOptionModal";

import { IOrderResponse } from "@/models/order.interface";
import useAddresses from "@/lib/hooks/useAddresses";
import useUser from "@/lib/hooks/useUser";
import useTracking from "@/lib/hooks/useTracking";
import { getDateInStringFormat } from "@/lib/helper";
import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import useAllUser from "@/lib/hooks/useAllUsers";
import { AddressEntity } from "@/lib/adapter/entities/AddressEntity";
import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";
interface IProp {
  row: OrderEntity;
  type: string;
}

const LineItem = (props: IProp) => {
  console.log(props.row);
  const trigger = useRef<any>();

  const { user, status: userIsLoading } = useUser();

  const { addresses, mutateAddresses } = useAddresses({
    user_id: user?.id,
  });

  console.log(addresses);
  const { tracking, trackingIsLoading, mutateTracking } = useTracking({
    order_id: props.row.id,
  });

  const [estDelivery, setEstDelivery] = useState<string>("...");
  const [gate, setGate] = useState(false);
  //   console.log(gate);

  function smartToggleGateHandler() {
    setGate(false);
  }
  function toggleGateHandler() {
    // console.log("toggle gate");
    setGate((prev) => !prev);
  }

  const orderStatusColorHandler = (status: string) => {
    switch (status) {
      case "in-transit":
        return <RedRadioButton />;

      case "delivered":
        return <GreenRadioButton />;

      case "at-warehouse":
        return <YellowRadioButton />;
      case "pending":
        return <YellowRadioButton />;
      default:
        return "pending";
    }
  };

  useEffect(() => {
    // console.log("tracking rerender");
    if (tracking !== undefined) {
      // sort and set delivery
      let latestUpdate = [...tracking].sort(
        (a, b) => b.stage_tracking - a.stage_tracking
      )[0];
      let newDate = new Date(latestUpdate?.created_on_tracking);
      newDate.setDate(newDate.getDate() + 7);
      const newDateString = getDateInStringFormat(newDate);
      setEstDelivery(newDateString!);
    }
  }, [tracking]);

  return (
    <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative">
      <td className={`td1`}>{props.row.id}</td>
      <td className={`td2 text-[#3672DF]`}>{props.row.store_link}</td>
      <td className={`td3`}>{props.row.reference_id}</td>
      <td className={`td4`}>{estDelivery}</td>
      <td className={`td5 `} style={{}}>
        <div className="flex flex-row items-center">
          <span className="address_td capitalize ">
            {" "}
            {
              addresses?.data?.find(
                (el: AddressEntity) => el.id === props.row.address.id
              )?.tag_addresses
            }
          </span>

          {/* {user?.default_address === props.row.address.id && (
            <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px] ">
              Default
            </div>
          )} */}
        </div>
      </td>
      <td className={`td6 `}>
        <div className="h-full flex flex-row justify-start items-center ">
          <div className="pending__icon">
            {orderStatusColorHandler(props.row.status)}
          </div>
          <span className="ml-[5px] capitalize">{props.row.status}</span>
        </div>
      </td>
      <td
        className=""
        // onClick={(e) => optionModalHandler(e, index)}
      >
        <div className="w-full h-full ">
          <div
            onClick={toggleGateHandler}
            ref={trigger}
            className="cursor-pointer relative"
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
