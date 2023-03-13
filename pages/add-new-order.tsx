import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageHeader from "@/components/common/PageHeader";
import UserSavedAddress from "@/components/orders/UserSavedAddress";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import useAddresses from "@/lib/hooks/useAddresses";
import useUser from "@/lib/hooks/useUser";
import fetchJson from "@/lib/fetchServer";
// import { createToast } from "@/lib/toasts";
import { createToast } from "@/lib/toasts";
import { Address } from "@/models/address.model";
import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";

const schema = yup
  .object({
    reference_id: yup.string().required(),
    store_link: yup.string().required(),
  })
  .required();

const AddNewOrder = () => {
  const [editableAddress, setEditableAddress] = useState<Address>();
  const [showEditUserAddressModal, setShowEditUserAddressModal] =
    useState<boolean>(false);
  const { user, mutateUser } = useUser();
  const { addresses, mutateAddresses, addressesIsLoading } = useAddresses({
    user_id: user?.id,
  });

  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

  // const defaultAddressHandler = () => {
  //   // mutateAddresses();
  //   if (addresses?.data !== undefined && addresses?.data !== null && addresses.data.length > 0) {
  //     const address = (addresses?.data as AddressEntity[]).find(
  //       (el: AddressEntity) => el.id === user?.default_address
  //     );
  //     return address;
  //   }
  //   return null;
  // };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{
    reference_id: string;
    store_link: string;
    address_id: string | null | undefined;
  }>({
    defaultValues: {
      address_id: user?.default_address,
      reference_id: "euirfismeodicokew",
      store_link: "flipkart.com",
    },
    resolver: yupResolver(schema),
  });

  const toggleAddNewAddressModal = () => {
    setShowAddNewAddressModal((prev) => !prev);
  };

  const toggleEditUserAddressModal = (addressId?: string) => {
    // console.log(addressId);

    if (showEditUserAddressModal) {
      setShowEditUserAddressModal(false);
    } else {
      setShowEditUserAddressModal(true);
      // if (addresses?.data !== null) {
      //   const address = (addresses?.data as AddressEntity[]).find(
      //     (el: AddressEntity) => el.id === user?.default_address
      //   );
      //   setEditableAddress(address);
      // }
    }
  };

  const onSubmit: SubmitHandler<{
    reference_id: string | null | undefined;
    store_link: string | null | undefined;
    address_id: string | null | undefined;
  }> = async (data) => {
    // console.log(data);
    try {
      let orderObj = {
        user_id: user?.id,
        address_id: data.address_id,
        reference_id: data.reference_id,
        store_link: data.store_link,
      };
      const result: APIResponse<Order> = await fetchJson(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderObj),
      });
      // console.log(result);

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

  useEffect(() => {
    console.log(addresses);
  }, [addresses]);
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
            name="reference_id"
            type="string"
            register={register("reference_id")}
            error={errors.reference_id}
          />
          <ReactHookFormInput
            label="Store Link"
            name="store_link"
            type="string"
            register={register("store_link")}
            error={errors.store_link}
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
          {addressesIsLoading && <div>loading addresses...</div>}
          {addresses &&
            addresses !== null &&
            (addresses as Address[]).map((data: Address) => {
              return (
                <UserSavedAddress
                  key={data.id}
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
          update={() => new Promise(() => {})}
          show={showEditUserAddressModal}
          close={toggleEditUserAddressModal}
          address={editableAddress!}
        />
      )}
    </>
  );
};

export default AddNewOrder;
