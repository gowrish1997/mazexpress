import ClickOutside from "@/components/common/ClickOutside";
import fetchJson from "@/lib/fetchJson";
import { capitalizeFirstLetter } from "@/lib/helper";
import { IUser } from "@/models/user.interface";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const UserSelect = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [markAll, setMarkAll] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef(null);

  const fetchMatchingUsers = (e: any) => {
    console.log(e.target.value);

  };

  const openDropdown = () => {
    setShowDropdown(true);
    inputRef.current
  };
  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const updateSelectedUsers = (e: any, id: number) => {
    // console.log(e.target.value, id);
    if (e.target.checked) {
      // add
      if (selectedUsers.find((item) => item === id)) {
        // ignore
      } else {
        setSelectedUsers((prev) => [...prev, id]);
      }
    } else {
      if (selectedUsers.find((item) => item === id)) {
        // delete
        setSelectedUsers((prev) => prev.filter((item) => item !== id));
      }
    }
  };

  const updateAllHandler = (e: any) => {
    // mark all
    console.log(e.target.checked);
    if (e.target.checked) {
      let newList = users.map((item) => {
        return item.id_users;
      });
      setSelectedUsers(newList);
      setMarkAll(true);
    } else {
      clearAllHandler(e);
    }
  };

  const clearAllHandler = (e: any) => {
    e.preventDefault()
    setSelectedUsers([]);
    setMarkAll(false);
  };

  useEffect(() => {
    // console.log("get users");
    fetchJson("/api/users").then((result) => {
      //   console.log(result);
      setUsers(result as IUser[]);
    });
  }, []);

  useEffect(() => {
    inputRef.current?.focus()
  }, [showDropdown])

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
            onChange={fetchMatchingUsers}
            //   onFocus={openDropdown}
            //   onBlur={closeDropdown}
            //   onClick={openDropdown}
            ref={inputRef}
          />
        )}
        {!showDropdown && selectedUsers.length > 0 && !markAll && (
          <div className="flex items-center w-full h-[45px] p-3">
            <div className="w-7 h-7 rounded-full relative overflow-hidden">
              <Image
                src={
                  users.find((item) => item.id_users === selectedUsers[0])
                    ?.avatar_url_users !== null &&
                  users.find((item) => item.id_users === selectedUsers[0])
                    ?.avatar_url_users !== undefined
                    ? `/user-images/${
                        users.find((item) => item.id_users === selectedUsers[0])
                          ?.avatar_url_users
                      }`
                    : "/user-images/default_user.png"
                }
                fill
                style={{ objectFit: "cover" }}
                alt={"user image"}
              />
            </div>
            <p className="text-[#2B2B2B] text-[14px] mx-2">
              {
                users.find((item) => item.id_users === selectedUsers[0])
                  ?.first_name_users
              }{" "}
              {
                users.find((item) => item.id_users === selectedUsers[0])
                  ?.last_name_users
              }
            </p>
            {selectedUsers.length > 1 ? (
              <p className="text-[#3672DF] text-[14px]">
                + {selectedUsers.length - 1} customers
              </p>
            ) : null}
          </div>
        )}
        {!showDropdown && markAll && (
          <div className="flex items-center w-full h-[40px] p-2">
            <p className="text-[#2B2B2B] text-[14px] mr-2">All</p>
          </div>
        )}
        {!showDropdown && !markAll && selectedUsers.length === 0 && (
          <div className="flex items-center w-full h-[40px] p-2">
            <p className="text-[#2B2B2B] text-[14px] mr-2">None</p>
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
          <div className="absolute flex flex-col w-[400px] h-[350px] z-10 top-[130%] rounded border bg-white shadow-lg p-4 overflow-y-scroll">
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
              <button className="text-[14px] font-[600] text-[#3672DF] cursor-pointer" onClick={clearAllHandler}>
                Clear all
              </button>
            </div>
            <div className="my-3">
              <hr />
            </div>
            <div className="space-y-[14px]">
              {users.map((el) => {
                return (
                  <div className="flex items-center w-full" key={el.id_users}>
                    <div className="w-10 h-10 rounded-full relative overflow-hidden">
                      <Image
                        src={
                          el.avatar_url_users !== null &&
                          el.avatar_url_users !== undefined
                            ? `/user-images/${el.avatar_url_users}`
                            : "/user-images/default_user.png"
                        }
                        fill
                        style={{ objectFit: "cover" }}
                        alt={"user image"}
                      />
                    </div>
                    <p className="ml-2 text-[14px] font-[600] text-[#525D72] flex-1">
                      {capitalizeFirstLetter(el.first_name_users)}{" "}
                      {capitalizeFirstLetter(el.last_name_users)}
                    </p>
                    <div className="">
                      <input
                        type={"checkbox"}
                        className="w-3 h-3"
                        checked={
                          selectedUsers.find((seel) => seel === el.id_users)
                            ? true
                            : false
                        }
                        onChange={(e) => updateSelectedUsers(e, el.id_users)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="bg-[#3672DF] text-[14px] rounded text-white w-full mt-4 px-4 py-2 self-center" onClick={closeDropdown}>Done!</button>
          </div>
        </ClickOutside>
      )}
    </div>
  );
};

export default UserSelect;
