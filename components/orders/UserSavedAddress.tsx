import React, { useEffect } from "react";
import Image from "next/image";
import { IAddress, IAddressProps } from "@/models/address.interface";
import useUser from "@/lib/hooks/useUser";
import fetchJson from "@/lib/fetchJson";

const UserSavedAddress = (props: {
  address: IAddressProps;
  register?: any;
  edit: (id: number) => void;
  update: () => Promise<IAddressProps[] | undefined>;
}) => {
  const { user, mutateUser, userIsLoading } = useUser();

  const deleteAddressHandler = async () => {
    // console.log('delete')
    if (user?.is_logged_in_users) {
      let newUser = { ...user };
      if (props.address.id_addresses === user?.default_address_users) {
        newUser.default_address_users = 0;
      }
      const result = await fetchJson(
        `/api/addresses?id=${props.address.id_addresses}`,
        {
          method: "DELETE",
        }
      );
      // console.log(result)
      await mutateUser(newUser, false);
      props.update();
    }
  };

  const updateUser = async (id: number) => {
    // console.log("update user call");
    // console.log(id);
    // console.log(user);

    if (user?.is_logged_in_users) {
      let newUserData = { ...user, default_address_users: id };

      // update user backend
      fetchJson(`/api/users?id=${user.id_users}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });
      await mutateUser(newUserData, false);

      // console.log(data)
    }
  };

  return (
    <div className="transition duration-300 flex items-start border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] h-full">
      <input
        type="radio"
        name="address"
        // defaultChecked={
        //   user?.default_address_users === props.address.id_addresses
        // }
        checked={user?.default_address_users === props.address.id_addresses}
        value={props.address.id_addresses}
        {...props.register}
        className="cursor-pointer mt-[4px]"
        onClick={(e) => updateUser(props.address.id_addresses!)}
      />

      <div className="flex-1 ml-[7px] flex flex-col justify-center h-full">
        <div className="flex items-start justify-between">
          <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
            {props.address.tag_addresses}
          </p>
          {user?.default_address_users === props.address.id_addresses && (
            <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px]">
              Default
            </div>
          )}
        </div>
        <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
          {props.address.country_addresses}
        </p>
        <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.address_1_addresses}, ${props.address.address_2_addresses}`}</p>
        <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
          {" "}
          {props.address.city_addresses}, {props.address.state_addresses}
        </p>

        <div className="flex-type1 mt-[15px]">
          <Image src="/mobile.png" height={12} width={12} alt="mobile" />
          <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
            {props.address.phone_addresses}
          </div>
        </div>

        <div className="text-[12px] text-[#3672DF] font-[500] leading-[17px] flex justify-end flex-1 grow">
          <div className="space-x-[20px] flex items-end">
            <button
              onClick={() => props.edit(props.address.id_addresses!)}
              className="hover:font-[600]"
            >
              Edit
            </button>
            <button
              onClick={deleteAddressHandler}
              className="hover:font-[600]"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSavedAddress;
