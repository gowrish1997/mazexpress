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
    console.log(orders);
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
                {props.row && (props.row as IUser)?.avatar_url_users !== undefined ? (
                    <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
                        <Image src={"/user-images/" + (props.row as IUser)?.avatar_url_users} fill style={{ objectFit: "cover" }} alt="profileImage" />
                    </div>
                ) : (
                    <div className="relative h-[30px] w-[30px] rounded-full   bg-slate-500">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                )}
                <span className="ml-[5px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis ">
                    {(props.row as IUser)?.first_name_users + "" + (props.row as IUser)?.last_name_users}
                </span>
            </td>
            <td className={`td2 text-[#3672DF]`}>{props.row.email_users}</td>
            <td className={`td3`}>{props.row.phone_users}</td>
            <td className={`td4`}>{getDateInStringFormat(props.row.created_on_user)}</td>
            <td className={`td5 `} style={{}}>
                {/* {props.row.age_users} */}5
            </td>
            <td className={`td6 `}>{genderHanlder(props.row.gender_users)}</td>
            <td className={`td7 `}>{orders && orders?.data?.length}</td>
    </tr>
    );
};
export default UserLineItem;
