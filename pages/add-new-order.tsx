import React, { useEffect, useState } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import PageHeader from "@/components/common/PageHeader";
import UserSavedAddress from "@/components/orders/UserSavedAddress";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import { IAddressProps } from "@/models/address.interface";
import useAddresses from "@/lib/useAddresses";
import useUser from "@/lib/useUser";


const schema = yup
  .object({
    referenceId: yup.string().required(),
    storeLink: yup.string().required(),
  })
  .required();

const AddNewOrder = () => {
  //   const [userSavedAddresses, setUserSavedAddresses] = useState(addresses);
  const [editableAddress, setEditableAddress] = useState<IAddressProps>();
  const [showEditUserAddressModal, setShowEditUserAddressModal] =
    useState<boolean>(false);
  const { user, mutateUser } = useUser();
  const { addresses, mutateAddresses } = useAddresses({
    userId: user?.id_users,
  });
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

  const defaultAddressHandler = () => {
    const address = addresses?.find(
      (el) => el.id_addresses === user?.default_address_users
    );

    return address;
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{
    referenceId: string;
    storeLink: string;
    address: number;
  }>({
    defaultValues: {
      address: defaultAddressHandler()?.id_addresses,
    },
    resolver: yupResolver(schema),
  });

  const toggleAddNewAddressModal = () => {
    setShowAddNewAddressModal((prev) => !prev);
  };

  const toggleEditUserAddressModal = (addressId?: number) => {
    console.log(addressId);
    if (showEditUserAddressModal) {
      setShowEditUserAddressModal(false);
    } else {
      setShowEditUserAddressModal(true);
      const address = addresses?.find((data) => {
        return data.id_addresses == addressId;
      });
      setEditableAddress(address);
    }
  };

  const onSubmit: SubmitHandler<{
    referenceId: string;
    storeLink: string;
    address: number;
  }> = (data) => {
    console.log(data);
    // if (user) {
    //   let newUserData = { ...user };
    //   newUserData.default_address_users = data.address;
    //   mutateUser(newUserData);
    // }
    // console.log(data);
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <PageHeader content="Add New Order" showCalender={false} />
      <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
          <Image src="/blueexclamatory.png" alt="icon" width={16} height={16} />
          <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
            Here is a link to some fake information that contains crucial
            information, <span className="text-[#3672DF]">Link here →</span>
          </p>
        </div>
        <div className="flex-type1 space-x-[10px] mt-[25px]">
          <ReactHookFormInput
            label="Reference ID"
            name="referenceId"
            type="string"
            register={register("referenceId")}
            error={errors.referenceId}
          />
          <ReactHookFormInput
            label="Store Link"
            name="storeLink"
            type="string"
            register={register("storeLink")}
            error={errors.storeLink}
          />
        </div>
        <div className="mt-[20px]">
          <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px]">
            Address Book
            <span
              className="text-[#3672DF] ml-[10px] cursor-pointer hover:bg-[#EDF5F9] p-[5px] rounded-[4px]  "
              onClick={toggleAddNewAddressModal}
            >
              + Add New{" "}
            </span>
          </p>
        </div>
        <div className="flex-type1 flex-wrap mt-[20px] gap-[20px] ">
          {addresses?.map((data) => {
            return (
              <UserSavedAddress
                key={data.id_addresses}
                address={data}
                register={register("address")}
                edit={toggleEditUserAddressModal}
              />
            );
          })}
        </div>
        <button
          className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] mt-[25px]"
          type="submit"
        >
          Place order
        </button>
      </form>

      <AddNewAddressModal
        show={showAddNewAddressModal}
        close={toggleAddNewAddressModal}
      />
      {showEditUserAddressModal && (
        <EditUserAddressModal
          show={showEditUserAddressModal}
          close={toggleEditUserAddressModal}
          address={editableAddress!}
        />
      )}
    </>
  );
};

export default AddNewOrder;
