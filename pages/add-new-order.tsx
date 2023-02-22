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
import useAddresses from "@/lib/hooks/useAddresses";
import useUser from "@/lib/useUser";
import fetchJson from "@/lib/fetchJson";
import { createToast } from "@/lib/toasts";

const schema = yup
  .object({
    reference_id_orders: yup.string().required(),
    store_link_orders: yup.string().required(),
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
    mutateAddresses();
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
    reference_id_orders: string;
    store_link_orders: string;
    address_id: number;
  }>({
    defaultValues: {
      address_id: defaultAddressHandler()?.id_addresses,
    },
    resolver: yupResolver(schema),
  });

  const toggleAddNewAddressModal = () => {
    setShowAddNewAddressModal((prev) => !prev);
  };

  const toggleEditUserAddressModal = (addressId?: number) => {
    // console.log(addressId);
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
    reference_id_orders: string;
    store_link_orders: string;
    address_id: number;
  }> = async (data) => {
    // console.log(data);
    try {
      let orderObj = {
        user_id: user?.id_users,
        address_id: data.address_id,
        reference_id_orders: data.reference_id_orders,
        store_link_orders: data.store_link_orders,
        status_orders: "pending",
        shipping_amt_orders: 499,
      };
      const result1 = await fetchJson(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderObj),
      });
      console.log(result1);

      let trackingObj = {
        order_id: result1.data,
        // stage_tracking: req.body.stage_tracking,
        // poc_tracking: req.body.poc_tracking,
        user_id: user?.id_users,
      };
      const result2 = await fetchJson(`/api/tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackingObj),
      });
      console.log(result2);

      createToast({
        type: "success",
        title: "Success",
        message: "Created order successfully",
      });
    } catch (err) {
      console.log(err);
      createToast({
        type: "error",
        title: "An error occurred",
        message: "Check console for more info.",
        timeOut: 3000,
      });
    }
    // if (user) {
    //   let newUserData = { ...user };
    //   newUserData.default_address_users = data.address_id;
    //   mutateUser(newUserData);
    // }
    // console.log(data);
  };

  return (
    <>
      <PageHeader
        content="Add New Order"
        showCalender={false}
        title="Add New Order | MazExpress"
      />
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
            name="reference_id_orders"
            type="string"
            register={register("reference_id_orders")}
            error={errors.reference_id_orders}
          />
          <ReactHookFormInput
            label="Store Link"
            name="store_link_orders"
            type="string"
            register={register("store_link_orders")}
            error={errors.store_link_orders}
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
        <div className="grid grid-cols-3 gap-3 py-5">
          {addresses !== undefined &&
            addresses.length > 0 &&
            addresses
              .filter((el) => el.status_addresses === 1)
              .map((data) => {
                return (
                  <UserSavedAddress
                    key={data.id_addresses}
                    address={data}
                    register={register("address_id")}
                    edit={toggleEditUserAddressModal}
                    update={mutateAddresses}
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
        update={mutateAddresses}
      />
      {showEditUserAddressModal && (
        <EditUserAddressModal
          update={mutateAddresses}
          show={showEditUserAddressModal}
          close={toggleEditUserAddressModal}
          address={editableAddress!}
        />
      )}
    </>
  );
};

export default AddNewOrder;
