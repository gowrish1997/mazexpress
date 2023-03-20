import React, { useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getDateInStringFormat } from "@/lib/helper";
import useOrders from "@/lib/hooks/useOrders";
import { User } from "@/models/user.model";
import { Order } from "@/models/order.model";
import { getUserImageString } from "@/lib/utils";
import useUser from "@/lib/hooks/useUser";

interface IProp {
  row: User;
  type: string;
  onSelect: (e: any, type: string) => void;
  selectedOrder: string[];
}

const UserLineItem = (props: IProp) => {
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    user_id: props.row.id,
  });
  const { user, mutateUser } = useUser();
  // console.log(props.row.created_on);
  const trigger = useRef<any>();

  const [gate, setGate] = useState(false);

  const genderHanlder = (gender: string) => {
    switch (gender) {
      case "m":
        return "male";
      case "f":
        return "female";
      case "o":
        return "other";
      case "u":
        return "unknown";
    }
  };

  return (
    <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative">
      <td className={`flex flex-row justify-start items-center capitalize `}>
        {" "}
        {props.row && (props.row as User)?.avatar_url !== undefined ? (
          <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
            {props.row.is_admin && (
              <div className="absolute bg-yellow-600 w-4 h-8 z-10 opacity-60"></div>
            )}
            <Image
              src={user?.avatar_url || "/user-images/default_user.png"}
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
          {(props.row as User)?.first_name +
            " " +
            (props.row as User)?.last_name}
        </span>
      </td>
      <td className={`td2 text-[#3672DF]`}>{props.row.email}</td>
      <td className={`td3`}>{props.row.phone}</td>
      <td className={`td4`}>{getDateInStringFormat(props.row.created_on)}</td>
      <td className={`td5 `} style={{}}>
        {props.row.age}
      </td>
      <td className={`td6 `}>{genderHanlder(props.row.gender)}</td>
      <td className={`td7 `}>{orders && (orders as Order[])?.length}</td>
    </tr>
  );
};
export default UserLineItem;
