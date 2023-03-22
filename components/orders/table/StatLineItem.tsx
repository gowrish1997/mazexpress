import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import GreyRadioButton from "../../../public/grey_svg.svg";

import useTracking from "@/lib/hooks/useTracking";
import { Order } from "@/models/order.model";
import { Tracking } from "@/models/tracking.model";
import { User } from "@/models/user.model";
import useUsers from "@/lib/hooks/useUsers";
import useUser from "@/lib/hooks/useUser";

interface IProp {
  row: Order;
  type: string;
  onSelect: (e: string, type: string) => void;
}

const StatLineItem = (props: IProp) => {
  const trigger = useRef<any>();

  const { users, mutateUsers, usersIsLoading, usersError } = useUsers({
    username: props.row.user.email,
  });
  const { user, mutateUser } = useUser();
  const { tracking, mutateTracking, trackingIsLoading } = useTracking({
    order_id: props.row.id,
  });

  const [packageStatus, setPackageStatus] = useState(0);

  useEffect(() => {
    // console.log(tracking);
    if (tracking !== undefined && tracking !== null) {
      let sorted = [...tracking];
      sorted.sort((a: any, b: any) => a?.stage - b?.stage);
      setPackageStatus((sorted.pop() as Tracking)?.stage);
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
        return "Delivered";
      default:
        return "Pending";
    }
  };

  const [gate, setGate] = useState(false);

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

  return (
    <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative">
      <td className={`flex flex-row justify-start items-center capitalize`}>
        <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
          <Image
            src={props.row.user?.avatar_url || "/user-images/default_user.png"}
            fill
            style={{ objectFit: "cover" }}
            alt="profileImage"
          />
        </div>

        <div className="ml-[5px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
          <p className=" text-[12px] text-[#18181B] font-[800] leading-[22px] ">
            {(users as User[])?.[0].first_name +
              " " +
              (users as User[])?.[0].last_name}
          </p>
          <p className="text-[12px] text-[#71717A] font-[400] leading-[22px] ">
            {" "}
            {(users as User[])?.[0].email}
          </p>
        </div>
      </td>
      <td
        className={`td2`}
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          width: "100%",
        }}
      >
        {props.row.maz_id}
      </td>

      <td className={`td3 capitalize `}>{warehoueStatusHanlder()}</td>
      <td className={`td4`}>
        <div className="h-full flex flex-row justify-start items-center ">
          <span>{orderStatusColorHandler(props.row.status)} </span>

          <span className="ml-[5px] capitalize ">{props.row.status}</span>
        </div>
      </td>
    </tr>
  );
};
export default StatLineItem;
