import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getDateInStringFormat } from "@/lib/helper";
import AdminOptionModal from "@/components/admin/modal/AdminOptionModal";
import { User } from "@/models/user.model";
import { APIResponse } from "@/models/api.model";
import { KeyedMutator } from "swr";

interface IProp {
    row: User;
    type: string;
    onSelect: (e: any, type: string) => void;
    selectedOrder?: User[];
    mutateUser?: KeyedMutator<APIResponse<User>>;
}

const AdminLineItem = (props: IProp) => {
    // console.log(props.row.created_on);
    const trigger = useRef<any>();

    const [gate, setGate] = useState(false);

    function smartToggleGateHandler() {
        setGate(false);
    }
    function toggleGateHandler() {
        setGate((prev) => !prev);
    }

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

    const inputCheckedStateHandler = () => {
        const data = props?.selectedOrder?.find((el: any) => {
            return el.email == props.row.email;
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
            style={
                inputCheckedStateHandler() ? { backgroundColor: "#EDF5F9" } : {}
            }
        >
            <td className={`td0`}>
                <input
                    type="checkbox"
                    value={props.row.id}
                    name={props.row.id}
                    checked={inputCheckedStateHandler()}
                    onChange={(e) =>
                        props.onSelect(props.row, "selectSingleOrder")
                    }
                    className="h-[10px] w-[10px] mb-[15px] cursor-pointer "
                />
            </td>
            <td
                className={`flex flex-row justify-start items-center capitalize `}
            >
                {" "}
                {props.row && (props.row as User)?.avatar_url !== undefined ? (
                    <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
                        {(props.row as User).is_admin && (
                            <div className="absolute bg-yellow-600 w-4 h-8 z-10 opacity-60"></div>
                        )}
                        <Image
                            src={
                                (props.row as User).avatar_url ||
                                "/user-images/default_user.png"
                            }
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
            <td className={`td2 text-[#35C6F4]`}>{props.row.email}</td>
            <td className={`td3`}>{props.row.phone}</td>
            <td className={`td4`}>
                {getDateInStringFormat(props.row.created_on)}
            </td>
            <td className={`td5 `} style={{}}>
                {props.row.age}
            </td>
            <td className={`td6 `}>{genderHanlder(props.row.gender)}</td>
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
                    <div
                        onClick={toggleGateHandler}
                        className="cursor-pointer relative "
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
                        <AdminOptionModal
                            row={props.row}
                            handler={smartToggleGateHandler}
                            trigger={trigger}
                            mutateUser={props.mutateUser!}
                            // stage={packageStatus}
                        />
                    )}
                </div>
            </td>
        </tr>
    );
};
export default AdminLineItem;
