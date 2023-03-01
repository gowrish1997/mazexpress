import React from "react";
import Image from "next/image";
import useUser from "@/lib/hooks/useUser";
import fetchJson from "@/lib/fetchJson";
import { AddressEntity } from "@/lib/adapter/entities/AddressEntity";
import { capitalizeFirstLetter } from "@/lib/helper";

const UserSavedAddress = (props: {
  address: AddressEntity;
  register?: any;
  edit: (id: string) => void;
  // update: () => Promise<IAddressProps[] | undefined>;
}) => {
  const { user, status: userIsLoading } = useUser();

  const deleteAddressHandler = async () => {
    // console.log('delete')
    if (user) {
      let newUser = { ...user };
      if (props.address.id === user?.default_address) {
        newUser.default_address = "";
      }
      const result = await fetchJson(`/api/addresses?id=${props.address.id}`, {
        method: "DELETE",
      });
      // console.log(result)
      // props.update();
    }
  };

  const updateUser = async (id: string) => {
    // console.log("update user call");
    // console.log(id);
    // console.log(user);

    if (user) {
      let newUserData = { ...user, default_address: id };

      // update user backend
      fetchJson(`/api/users?id=${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });

      // console.log(data)
    }
  };

  return (
    <div className="transition duration-300 flex items-start border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] h-full">
      <input
        type="radio"
        name="address"
        defaultChecked={
          user?.default_address === props.address.id
        }
        // checked={user?.default_address === props.address.id}
        value={props.address.id}
        {...props.register}
        className="cursor-pointer mt-[4px]"
        onClick={(e) => updateUser(props.address.id!)}
      />

      <div className="flex-1 ml-[7px] flex flex-col justify-center h-full">
        <div className="flex items-start justify-between">
          <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
            {props.address.tag}
          </p>
          {user?.default_address === props.address.id && (
            <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px]">
              Default
            </div>
          )}
        </div>
        <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
          {props.address.country}
        </p>
        <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.address_1}, ${props.address.address_2}`}</p>
        <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
          {" "}
          {capitalizeFirstLetter(props.address.city)}
        </p>

        <div className="flex-type1 mt-[15px]">
          <Image src="/mobile.png" height={12} width={12} alt="mobile" />
          <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
            {props.address.phone}
          </div>
        </div>

        <div className="text-[12px] text-[#3672DF] font-[500] leading-[17px] flex justify-end flex-1 grow">
          <div className="space-x-[20px] flex items-end">
            <button
              onClick={() => props.edit(props.address.id!)}
              className="hover:font-[600]"
            >
              Edit
            </button>
            <button onClick={deleteAddressHandler} className="hover:font-[600]">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSavedAddress;
