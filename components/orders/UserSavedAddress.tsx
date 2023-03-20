import React, { useEffect } from "react";
import Image from "next/image";
import useUser from "@/lib/hooks/useUser";
import fetchServer from "@/lib/fetchServer";
import fetchSelf from "@/lib/fetchSelf";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "@/lib/helper";
import { Address } from "@/models/address.model";

const UserSavedAddress = (props: {
  type: string;
  address: Address;
  register?: any;
  edit: (id: string) => void;
  update: () => void;
  updateDeliveryAddress?: (id: string) => void;
}) => {
  const { user, mutateUser } = useUser();

  const { t } = useTranslation("common");
  const content: string[] = t("addressBookPage.userSavedAddressCard.Content", {
    returnObjects: true,
  });

  const deleteAddressHandler = async () => {
    // console.log('delete')
    if (user) {
      if (props.address.id === user?.default_address) {
        // update default address for user
      }
      const result = await fetchServer(
        `/api/addresses?id=${props.address.id}&user=${user.id}`,
        {
          method: "DELETE",
        }
      );
      // console.log(result)
      props.update();
    }
  };

  const updateUser = async (id: string) => {
    console.log(id);

    if (props.type == "address-book") {
      if (user) {
        let newUserData = user;
        newUserData.default_address = id;

        // console.log(newUserData)

        mutateUser();

        console.log({ ...user, default_address: id });
        const updateResponse = await fetchServer(`/api/users?id=${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ default_address: id }),
        });

        console.log(updateResponse);
        // update user backend

        props.update();
        // console.log(data)
      }
    } else {
      props.updateDeliveryAddress?.(id);
    }
  };

  return (
    <div className="transition duration-300 flex flex-col items-start border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] pb-[15px] h-full">
      <div className="flex flex-row justify-start items-start gap-x-[5px] w-full h-full ">
        <input
          type="radio"
          name="address"
          defaultChecked={user?.default_address === props.address.id}
          // checked={user?.default_address === props.address.id}
          value={props.address.id}
          {...props.register}
          className="cursor-pointer mt-[4px]"
          onClick={(e) => updateUser(props.address.id!)}
        />
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
          <div className="space-x-[20px] flex items-end">
            <button
              onClick={() => props.edit(props.address.id)}
              className="hover:font-[600]"
            >
              {content[1]}
            </button>
            <button onClick={deleteAddressHandler} className="hover:font-[600]">
              {content[2]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSavedAddress;
