import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import GreyRadioButton from "../../../public/grey_svg.svg";
import useAllUser from "@/lib/hooks/useAllUsers";
import useTracking from "@/lib/hooks/useTracking";
import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";
interface IProp {
  row: OrderEntity;
  type: string;
  onSelect: (e: string, type: string) => void;
}

const StatLineItem = (props: IProp) => {
  const trigger = useRef<any>();

  const { allUser, mutateAllUser, allUserIsLoading } = useAllUser({
    user_id: props.row.user.id,
  });
  const { tracking, mutateTracking, trackingIsLoading } = useTracking({
    order_id: props.row.id,
  });

  const [packageStatus, setPackageStatus] = useState(0);

  useEffect(() => {
    // console.log(tracking);
    if (tracking !== undefined && tracking.data.length > 0) {
      let sorted = [...tracking.data];
      sorted.sort((a: any, b: any) => a?.stage - b?.stage);
      setPackageStatus(sorted.pop()?.stage);
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
        {allUser && (allUser as UserEntity)?.avatar_url !== undefined ? (
          <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
            <Image
              src={"/user-images/" + (allUser as UserEntity)?.avatar_url}
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
        <div className="ml-[5px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
          <p className=" text-[12px] text-[#18181B] font-[800] leading-[22px] ">
            {(allUser as UserEntity)?.first_name +
              "" +
              (allUser as UserEntity)?.last_name}
          </p>
          <p className="text-[12px] text-[#71717A] font-[400] leading-[22px] ">
            {" "}
            {(allUser as UserEntity)?.email}
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
        {props.row.id}
      </td>

      <td className={`td3 capitalize `}>{warehoueStatusHanlder()}</td>
      <td className={`td4`}>
        <div className="h-full flex flex-row justify-start items-center ">
          <span>{orderStatusColorHandler(props.row.status)} </span>

          <span className="ml-[5px] capitalize ">
            {props.row.status}
          </span>
        </div>
      </td>
    </tr>
  );
};
export default StatLineItem;
