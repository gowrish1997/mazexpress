import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LiveOrderOptionModal from "@/components/admin/modal/LiveOrderOptionModal";
import { IOrderResponse } from "@/models/order.interface";
import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import GreyRadioButton from "../../../public/grey_svg.svg";
import useAllUser from "@/lib/hooks/useAllUsers";
import useTracking from "@/lib/hooks/useTracking";
import { getDateInStringFormat } from "@/lib/helper";
import { IUser } from "@/models/user.interface";
interface IProp {
  row: IOrderResponse;
  type: string;
  onSelect: (e: string, type: string) => void;
  selectedOrder: string[];
}

const LiveOrderLineItem = (props: IProp) => {
  const trigger = useRef<any>();

  const { allUser, mutateAllUser, allUserIsLoading } = useAllUser({
    user_id: props.row.user_id,
  });
  const { tracking, mutateTracking, trackingIsLoading } = useTracking({
    order_id: props.row.id_orders,
  });

  const [packageStatus, setPackageStatus] = useState(0);

  useEffect(() => {
    // console.log(tracking);
    if (tracking !== undefined) {
      let sorted = [...tracking];
      sorted.sort((a: any, b: any) => a?.stage_tracking - b?.stage_tracking);
      setPackageStatus(sorted.pop()?.stage_tracking);
    }
  }, [tracking]);

  const warehoueStatusHanlder = () => {
    switch (packageStatus) {
      case 0:
        return "Pending";
      case 1:
        return "Istanbul";
      case 2:
        return "Istanbul";
      case 3:
        return "Libya";
      case 4:
        return "Out for delivery";
      case 5:
        return "Complete";
      default:
        return "Pending";
    }
  };

  const [gate, setGate] = useState(false);

  function smartToggleGateHandler() {
    setGate(false);
  }
  function toggleGateHandler() {
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
        return <GreyRadioButton />;
      default:
        return "pending";
    }
  };

  const inputCheckedStateHandler = () => {
    const data = props?.selectedOrder?.find((el) => {
      return el == props.row.id_orders;
    });
    if (data) {
      return true;
    } else {
      false;
    }
  };

  // const inputDisabledStateHandler = () => {
  //     if (props.type == "shipments") {
  //         return false;
  //     } else {
  //         if (props.row.status_orders == "at-warehouse" || props.row.status_orders == "in-transit") {
  //             return true;
  //         } else {
  //             return false;
  //         }
  //     }
  // };

  return (
    <tr className="h-min  text-[16px] text-[#000000] font-[400] leading-[22.4px] relative  " style={inputCheckedStateHandler()?{backgroundColor:'#EDF5F9',}:{}} >
      {(props.type == "pending" ||
        props.type == "shipments" ||
        props.type == "in-transit" ||
        props.type == "user_base") && (
        <td className={`td0`}>
          <input
            type="checkbox"
            // disabled={inputDisabledStateHandler()}
            value={props.row.id_orders}
            name={props.row.id_orders}
            checked={inputCheckedStateHandler()}
            onChange={(e) =>
              props.onSelect(e.target.value, "selectSingleOrder")
            }
            className="h-[10px] w-[10px] mb-[15px] cursor-pointer "
          />
        </td>
      )}

      <td className={`flex flex-row justify-start items-center capitalize`}>
        {allUser && (allUser as IUser)?.avatar_url_users !== undefined ? (
          <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
            <Image
              src={"/user-images/" + (allUser as IUser)?.avatar_url_users}
              fill
              style={{ objectFit: "cover" }}
              alt="profileImage"
            />
          </div>
        ) : (
          <div className="relative h-[30px] w-[30px] rounded-full   bg-slate-500">
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
        <span className="ml-[5px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis ">
          {(allUser as IUser)?.first_name_users +
            " " +
            (allUser as IUser)?.last_name_users}
        </span>
      </td>
      <td
        className={`td2`}
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          width: "100%",
        }}
      >
        {props.row.id_orders}
      </td>
      <td className={`td3 text-[#3672DF]`}>{props.row.store_link_orders}</td>
      <td className={`td4`}>{props.row.reference_id_orders}</td>
      <td className={`td5`}>
        {getDateInStringFormat(props.row.created_on_orders)}
      </td>

      {/* <td className={`td6 capitalize `}>{warehoueStatusHanlder()}</td> */}
      <td className={`td7`}>
        <div className="h-full flex flex-row justify-start items-center ">
          <span>{orderStatusColorHandler(props.row.status_orders)} </span>
          <span className="ml-3 capitalize text-[13px]">
            {props.row.status_orders}
          </span>
        </div>
        <div className="ml-7 text-[11px]">{warehoueStatusHanlder()}</div>
      </td>
      <td
        className=""
        style={
          props.type == "delivered" || props.type == "live_order"
            ? { visibility: "hidden" }
            : {}
        }
        ref={trigger}
      >
        <div className="w-full h-full   ">
          <div onClick={toggleGateHandler} className="cursor-pointer relative ">
            <Image
              src="/editicon.png"
              // ref={trigger}
              height={13}
              width={4}
              alt="editIcon"
            />
          </div>
          {gate && (
            <LiveOrderOptionModal
              type={props.type}
              row={props.row}
              handler={smartToggleGateHandler}
              trigger={trigger}
              stage={packageStatus}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
export default React.memo(LiveOrderLineItem);
