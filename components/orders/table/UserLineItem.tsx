import React, { createRef, useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import LiveOrderOptionModal from "@/components/admin/modal/LiveOrderOptionModal";
import { IUser } from "@/models/user.interface";
import { getDateInStringFormat } from "@/lib/helper";

interface IProp {
  row: IUser;
  type: string;
  onSelect: (e: any, type: string) => void;
  selectedOrder: number[];
}

const UserLineItem = (props: IProp) => {
  const trigger = useRef<any>();

  const [gate, setGate] = useState(false);
  console.log(gate);

  function smartToggleGateHandler() {
    setGate(false);
  }
  function toggleGateHandler() {
    console.log("toggle gate");
    setGate((prev) => !prev);
  }
  const inputCheckedStateHandler = () => {
    const data = props?.selectedOrder?.find((el) => {
      return el == props.row.id_users;
    });
    if (data) {
      return true;
    } else {
      false;
    }
  };

  return (
    <tr
      className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative"
    >
      <td className={`td0`}>
        <input
          type="checkbox"
          // disabled={inputDisabledStateHandler()}
          value={props.row.id_users}
          name={props.row.id_users.toString()}
          checked={inputCheckedStateHandler()}
          onChange={(e) => props.onSelect(e.target.value, "selectSingleOrder")}
          className="h-[10px] w-[10px] cursor-pointer "
        />
      </td>
      <td
        className={`td1`}
      >{`${props.row.first_name_users} ${props.row.last_name_users}`}</td>
      <td className={`td2 text-[#3672DF]`}>{props.row.email_users}</td>
      <td className={`td3`}>{props.row.phone_users}</td>
      <td className={`td4`}>
        {getDateInStringFormat(props.row.created_on_user)}
      </td>
      <td className={`td5 `} style={{}}>
        {props.row.age_users}
      </td>
      <td className={`flex flex-row justify-start items-center h-full `}>
        {props.row.gender_users}
      </td>
      <td
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
      </td>
    </tr>
  );
};
export default UserLineItem;
