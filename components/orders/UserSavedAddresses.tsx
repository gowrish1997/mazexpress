import React, { useEffect } from "react";
import Image from "next/image";
import { IAddressProps } from "@/models/address.interface";
import useUser from "@/lib/useUser";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { IUser } from "@/models/user.interface";
import fetchJson from "@/lib/fetchJson";

const UserSavedAddresses = (props: {
  address: IAddressProps;
  register: any;
  edit: (id: number) => void;
}) => {
  const { user, mutateUser, userIsLoading } = useUser();
  const { control } = useForm({});

  const updateUser = async (id: number) => {
    // console.log("update user call");
    console.log(id);
    console.log(user);

    if (user?.is_logged_in_users) {
      let newUserData = { default_address_users: id };

      // update user backend
      
      const updatedUser = await mutateUser(
        await fetchJson(`/api/users?id=${user.id_users}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUserData),
        }),
        {
          populateCache: (result, current) => {
            // console.log(result, 'result')
            // console.log(current, 'current')
            
            return current!
          },
          // revalidate: true
        }
        
      );
      console.log('mutate return', updatedUser)
      // axios
      //   .put(`/api/users?id=${user?.id_users}`, { default_address_users: id })
      //   .then((response) => {
      //     console.log(response.data);
      //     mutateUser(newUserData, false);
      //     mutateUser(
      //       await fetchJson("/api/auth/login", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify(data),
      //       }),
      //       false
      //     );
      //   });
    }
  };

  return (
    <div className=" box-border flex-type2 min-w-[32%] h-[180px] border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] ">
      <input
        type="radio"
        name="address"
        defaultChecked={
          user?.default_address_users === props.address.id_addresses
        }
        // checked={user?.default_address_users === props.address.id_addresses}
        value={props.address.id_addresses}
        {...props.register}
        className="cursor-pointer"
        onClick={(e) => updateUser(props.address.id_addresses!)}
      />

      <div className="-mt-[5px] ml-[7px]">
        <div className="flex-type1 space-x-[10px] ">
          <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
            {props.address.tag_addresses}
          </p>
          {user?.default_address_users === props.address.id_addresses && (
            <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px] ">
              Default
            </div>
          )}
        </div>
        <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
          {props.address.country_addresses}
        </p>
        <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.address_1_addresses}, ${props.address.address_2_addresses}, ${props.address.city_addresses}, ${props.address.state_addresses}, ${props.address.country_addresses}`}</p>

        <div className="flex-type1 mt-[15px]">
          <Image src="/mobile.png" height={12} width={12} alt="mobile" />
          <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
            {props.address.phone_addresses}
          </div>
        </div>

        <div className="text-[12px] text-[#3672DF] font-[500] leading-[17px] space-x-[10px] mt-[15px] ">
          <button onClick={() => props.edit(props.address.id_addresses!)}>
            Edit
          </button>
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default UserSavedAddresses;
