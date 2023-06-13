import ClickOutside from "@/components/common/ClickOutside";
import fetchJson from "@/lib/fetchServer";
import { capitalizeFirstLetter } from "@/lib/helper";
import useUsers from "@/lib/hooks/useUsers";
import { User } from "@/models/user.model";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";

interface IProp {
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    selectedUsers: string[];
}

const UserSelect = (props: IProp) => {
    const [searchKey, setSearchKey] = useState("");
    const { users, mutateUsers } = useUsers({ search: searchKey });
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [filteredUsers, setFilteredUsers] = useState<User[]>();
    const [markAll, setMarkAll] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef(null);

    useEffect(() => {
       
        setFilteredUsers(users?.data as User[]);
    }, [users]);

    const openDropdown = () => {
        setShowDropdown(true);
        inputRef.current;
    };
    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const filteredUsersHandler = (e: any) => {
        // const data = (users.data as User[])?.filter((data) => {
        //     return data.email
        //         .toLowerCase()
        //         .includes(e.target.value.toLowerCase());
        // });
        // setFilteredUsers(data);
        setSearchKey(e.target.value);
    };

    const updateSelectedUsers = (e: any, id: string) => {
        // console.log(e.target.value, id);
        // e.stopPropagation();
        // e.preventDefault();

        if (e.target.checked) {
            // add
            if (props.selectedUsers?.find((item) => item === id)) {
                // ignore
            } else {
                if (
                    props.selectedUsers?.length ===
                    (users.data as User[]).length - 1
                ) {
                    setMarkAll(true);
                }
                props.setSelectedUsers((prev) => [...prev, id]);
            }
        } else {
            setMarkAll(false);
            if (props.selectedUsers.find((item) => item === id)) {
                // delete
                props.setSelectedUsers((prev) =>
                    prev.filter((item) => item !== id)
                );
            }
        }
    };

    const updateAllHandler = (e: any) => {
      
        // mark all
        e.stopPropagation();

        // console.log(e.target.checked);
        if (e.target.checked) {
            let newList = (users.data as User[]).map((item) => {
                return item.email;
            });
            props.setSelectedUsers(newList);
            setMarkAll(true);
        } else {
            props.setSelectedUsers([]);
            setMarkAll(false);
        }
    };

    const clearAllHandler = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        props.setSelectedUsers([]);
        setMarkAll(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [showDropdown]);

    return (
        <div className="relative">
            <div
                className="border border-[#BBC2CF] rounded flex items-center"
                onClick={openDropdown}
                ref={triggerRef}
            >
                {showDropdown && (
                    <input
                        type={"text"}
                        className="focus:outline-0 px-2 py-2 w-full rounded h-[45px]"
                        // onChange={fetchMatchingUsers}
                        //   onFocus={openDropdown}
                        //   onBlur={closeDropdown}
                        //   onClick={openDropdown}
                        ref={inputRef}
                    />
                )}
                {!showDropdown &&
                    props.selectedUsers.length > 0 &&
                    !markAll && (
                        <div className="flex items-center w-full h-[45px] p-3">
                            <div className="w-7 h-7 rounded-full relative overflow-hidden">
                                <Image
                                    src={
                                        `https://mazbackend.easydesk.work/user/` +
                                            (users?.data as User[])
                                                ?.find(
                                                    (el) =>
                                                        el.email ===
                                                        props.selectedUsers[0]
                                                )
                                                ?.avatar_url?.replace(
                                                    /['"]+/g,
                                                    ""
                                                ) ||
                                        "/user-images/default_user.png"
                                    }
                                    fill
                                    style={{ objectFit: "cover" }}
                                    alt={"user image"}
                                />
                            </div>
                            <p className="text-[#2B2B2B] text-[14px] mx-2">
                                {
                                    (users?.data as User[])?.find(
                                        (item) =>
                                            item.email ===
                                            props.selectedUsers[0]
                                    )?.first_name
                                }{" "}
                                {
                                    (users?.data as User[])?.find(
                                        (item) =>
                                            item.email ===
                                            props.selectedUsers[0]
                                    )?.last_name
                                }
                            </p>
                            {props.selectedUsers?.length > 1 ? (
                                <p className="text-[#35C6F4] text-[14px]">
                                    + {props.selectedUsers?.length - 1}{" "}
                                    customers
                                </p>
                            ) : null}
                        </div>
                    )}
                {!showDropdown && markAll && (
                    <div className="flex items-center w-full h-[40px] p-2">
                        <p className="text-[#2B2B2B] text-[14px] mr-2">All</p>
                    </div>
                )}
                {!showDropdown &&
                    !markAll &&
                    props.selectedUsers.length === 0 && (
                        <div className="flex items-center w-full h-[40px] p-2">
                            <p className="text-[#2B2B2B] text-[14px] mr-2">
                                None
                            </p>
                        </div>
                    )}
                <div className="w-3 mx-3 cursor-pointer">
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        size="xs"
                        className="text-[9px]"
                        color="#525D72"
                    />
                </div>
            </div>
            {showDropdown && (
                <ClickOutside
                    handler={closeDropdown}
                    trigger={triggerRef}
                    className={""}
                >
                    <div className="absolute flex flex-col w-[400px] h-[300px] z-10 top-[130%] rounded border bg-white shadow-lg p-4 overflow-y-scroll slimScrollBar">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type={"checkbox"}
                                    name="select_all"
                                    className="mr-2"
                                    onChange={updateAllHandler}
                                    checked={markAll}
                                />
                                <label
                                    htmlFor="select_all"
                                    className="text-[14px] font-[600] text-[#525D72]"
                                >
                                    Select all
                                </label>
                            </div>
                            <button
                                className="text-[14px] font-[600] text-[#35C6F4] cursor-pointer"
                                onClick={clearAllHandler}
                            >
                                Clear all
                            </button>
                        </div>
                        <div className="my-3">
                            <hr />
                        </div>
                        <div className="w-full my-[10px]  ">
                            <input
                                type="text"
                                onChange={filteredUsersHandler}
                                placeholder="Search here for user"
                                className="box-border w-full pl-[10px] h-[45px] border border-[#BBC2CF] rounded"
                            />
                        </div>
                        <div className="space-y-[14px]">
                            {(filteredUsers as User[])?.map((el) => {
                                return (
                                    <div
                                        className="flex items-center w-full"
                                        key={el.id}
                                    >
                                        <div className="w-10 h-10 rounded-full relative overflow-hidden">
                                            <Image
                                                src={
                                                    el.avatar_url
                                                        ? `https://mazbackend.easydesk.work/user/` +
                                                          el.avatar_url
                                                        : "/user-images/default_user.png"
                                                }
                                                fill
                                                style={{ objectFit: "cover" }}
                                                alt={"user image"}
                                            />
                                        </div>
                                        <p className="ml-2 text-[14px] font-[600] text-[#525D72] flex-1">
                                            {capitalizeFirstLetter(
                                                el.first_name
                                            )}{" "}
                                            {capitalizeFirstLetter(
                                                el.last_name
                                            )}
                                        </p>
                                        <div className="">
                                            <input
                                                type={"checkbox"}
                                                className="w-3 h-3"
                                                checked={
                                                    props.selectedUsers.find(
                                                        (seel) =>
                                                            seel === el.email
                                                    )
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    updateSelectedUsers(
                                                        e,
                                                        el.email
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* <button
                            className="bg-[#35C6F4] text-[14px] rounded text-white w-full mt-4 px-4 py-2 self-center"
                            onClick={closeDropdown}
                        >
                            Done!
                        </button> */}
                    </div>
                </ClickOutside>
            )}
        </div>
    );
};

export default UserSelect;
