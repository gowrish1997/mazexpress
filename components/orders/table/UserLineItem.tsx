import React, { createRef, useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IUser } from "@/models/user.interface";
import { getDateInStringFormat } from "@/lib/helper";
import useOrders from "@/lib/useOrders";

interface IProp {
  row: IUser;
  type: string;
  onSelect: (e: any, type: string) => void;
  selectedOrder: number[];
}

const UserLineItem = (props: IProp) => {
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    user_id: props.row.id_users,
  });
  const trigger = useRef<any>();
  console.log(orders);

  const [gate, setGate] = useState(false);

  const genderHanlder = (gender: string) => {
    switch (gender) {
      case "m":
        return "male";
      case "f":
        return "female";
      case "o":
        return "not interested ";
      case "u":
        return "unknown";
    }
  };

  // function smartToggleGateHandler() {
  //   setGate(false);
  // }
  // function toggleGateHandler() {
  //   console.log("toggle gate");
  //   setGate((prev) => !prev);
  // }
  // const inputCheckedStateHandler = () => {
  //   const data = props?.selectedOrder?.find((el) => {
  //     return el == props.row.id_users;
  //   });
  //   if (data) {
  //     return true;
  //   } else {
  //     false;
  //   }
  // };

  return (
    <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative">
      {/* <td className={`td0`}>
        <input
          type="checkbox"
          // disabled={inputDisabledStateHandler()}
          value={props.row.id_users}
          name={props.row.id_users.toString()}
          checked={inputCheckedStateHandler()}
          onChange={(e) => props.onSelect(e.target.value, "selectSingleOrder")}
          className="h-[10px] w-[10px] cursor-pointer "
        />
      </td> */}
      <td className={`flex flex-row justify-start items-center capitalize `}>
        {" "}
        {props.row && (props.row as IUser)?.avatar_url_users !== undefined ? (
          <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
            <Image
              src={"/user-images/" + (props.row as IUser)?.avatar_url_users}
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
        <span className="ml-[5px] overflow-hidden whitespace-nowrap text-ellipsis ">
          {(props.row as IUser)?.first_name_users +
            "" +
            (props.row as IUser)?.last_name_users}
        </span>
      </td>
      <td className={`td2 text-[#3672DF]`}>{props.row.email_users}</td>
      <td className={`td3`}>{props.row.phone_users}</td>
      <td className={`td4`}>
        {getDateInStringFormat(props.row.created_on_user)}
      </td>
      <td className={`td5 `} style={{}}>
        {/* {props.row.age_users} */}5
      </td>
      <td className={`td6 `}>{genderHanlder(props.row.gender_users)}</td>
      <td className={`td7 `}>{orders?.length}</td>
      {/* <td
        className=""
        // onClick={(e) => optionModalHandler(e, index)}
      >
        <div className="w-full h-full">
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
            <LiveOrderOptionModal
              // ref={modalNode}
              type={props.type}
              row={props.row}
              handler={smartToggleGateHandler}
              trigger={trigger}
            />
          )}
        </div>
      </td> */}
    </tr>
  );
};
export default UserLineItem;
