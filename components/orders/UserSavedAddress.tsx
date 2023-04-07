import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import fetchServer from "@/lib/fetchServer";
import fetchSelf from "@/lib/fetchSelf";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "@/lib/helper";
import { Address } from "@/models/address.model";
import useAddresses from "@/lib/hooks/useAddresses";
import { constants } from "buffer";
import UserContext from "../context/user.context";

const UserSavedAddress = (props: {
  type: string;
  address: Address;
  allAddresses: Address[] | string[];
  register?: any;
  edit: (id: string) => void;
  update: () => void;
  updateDeliveryAddress?: (id: string) => void;
  selectedAddressId?: any;
}) => {
  // const { mutateUser } = useUser();
  const { user } = useContext(UserContext);

  const { t } = useTranslation("common");
  const content: string[] = t("addressBookPage.userSavedAddressCard.Content", {
    returnObjects: true,
  });

  const deleteAddressHandler = async () => {
    console.log("delete user address");

    let defaultaddress = user?.default_address;

    if (
      props.address.id === user?.default_address &&
      props.allAddresses.length > 1
    ) {
      defaultaddress =
        props.address.id == (props.allAddresses?.[0] as Address).id
          ? (props.allAddresses?.[1] as Address).id
          : (props.allAddresses?.[0] as Address).id;
      try {
        const updateResponse = await fetchServer(`/api/users/${user?.email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            default_address: defaultaddress,
          }),
        });
        // mutateUser();
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const result = await fetchServer(
        `/api/addresses/id/${props.address.id}`,

        {
          method: "DELETE",
        }
      );
      props.update();
    } catch (error) {
      console.error(error);
    }

    if (
      props.type == "add-new-order" &&
      props.selectedAddressId == props.address.id &&
      props.allAddresses.length > 1
    ) {
      props.updateDeliveryAddress?.(defaultaddress!);
    } else {
      props.updateDeliveryAddress?.(props.selectedAddressId);
    }

    if (props.allAddresses.length == 1) {
      props.updateDeliveryAddress?.("");
    }
  };

  const updateUser = async (id: string) => {
    if (props.type == "address-book") {
      try {
        const updateResponse = await fetchServer(`/api/users/${user?.email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ default_address: id }),
        });
        // mutateUser({ ...user, default_address: id }, true);
      } catch (error) {
        console.error(error.message);
      }

      // props.update();
    } else {
      props.updateDeliveryAddress?.(id);
    }
  };

  return (
    <div className="transition duration-300 flex flex-col items-start border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] pb-[15px] h-full">
      <div className="flex flex-row justify-start items-start gap-x-[5px] w-full h-full ">
        {props.type == "address-book" ? (
          <input
            type="radio"
            name="address"
            // defaultChecked={user?.default_address === props.address.id}
            checked={user?.default_address === props.address.id}
            value={props.address.id}
            {...props.register}
            className="cursor-pointer mt-[4px]"
            onClick={(e) => updateUser(props.address.id!)}
          />
        ) : (
          <input
            type="radio"
            name="address"
            checked={props.selectedAddressId === props.address.id}
            // defaultChecked={
            //     user?.default_address === props.address.id
            // }
            value={props.address.id}
            {...props.register}
            className="cursor-pointer mt-[4px]"
            onClick={(e) => updateUser(props.address.id!)}
          />
        )}
        {/* <input
                    type="radio"
                    name="address"
                    defaultChecked={user?.default_address === props.address.id}
                    // checked={user?.default_address === props.address.id}
                    value={props.address.id}
                    {...props.register}
                    className="cursor-pointer mt-[4px]"
                    onClick={(e) => updateUser(props.address.id!)}
                /> */}
        <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
          {props.address.tag}
        </p>
        {user?.default_address === props.address.id && (
          <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px]">
            {content[0]}
          </div>
        )}
      </div>

      <div className="flex-1 ml-[7px] flex flex-col justify-center h-full w-full">
        <div className="flex flex-col  items-start justify-between">
          <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
            {props.address.country}
          </p>
          <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.address_1}, ${props.address.address_2}`}</p>
          <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
            {" "}
            {capitalizeFirstLetter(props.address.city)}
          </p>
        </div>

        <div className="flex-type1 mt-[15px]">
          <Image src="/mobile.png" height={12} width={12} alt="mobile" />
          <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
            {props.address.phone}
          </div>
        </div>

        <div className="text-[12px] text-[#35C6F4] font-[500] leading-[17px] flex justify-end flex-1 grow mt-[10px] ">
          <div className="space-x-[20px] flex items-end ">
            <div
              onClick={() => props.edit(props.address.id)}
              className="hover:font-[600] cursor-pointer "
            >
              {content[1]}
            </div>
            <div
              onClick={deleteAddressHandler}
              className="hover:font-[600] cursor-pointer "
            >
              {content[2]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSavedAddress;
