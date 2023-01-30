import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageHeader from "@/components/orders/PageHeader";
import Input from "@/common/Input";
import UserSavedAddresses from "@/components/orders/UserSavedAddresses";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
const schema = yup
  .object({
    referenceId: yup.string().required(),
    storeLink: yup.string().required(),
  })
  .required();

const addresses = [
  {
    id: nanoid(),
    title: "Gowiesh hpuse",
    addressLine1: "byndoor udupu",
    addressLine2: "kundapure",
    country: "India",
    city: "byndoor",
    state: "karantak",
    postalCode: "576214",
    mobileNumber: 96863993098,
    default: null,
  },
  {
    id: nanoid(),
    title: "Gowiesh hpuse",
    addressLine1: "byndoor udupu",
    addressLine2: "kundapure",
    country: "India",
    city: "byndoor",
    state: "karantak",
    postalCode: "576214",
    mobileNumber: 96863993098,
    default: "on",
  },
  {
    id: nanoid(),
    title: "Gowiesh hpuse",
    addressLine1: "byndoor udupu",
    addressLine2: "kundapure",
    country: "India",
    city: "byndoor",
    state: "karantak",
    postalCode: "576214",
    mobileNumber: 96863993098,
    default: null,
  },
  // {
  //     id: nanoid(),
  //     title: "Gowiesh hpuse",
  //     addressLine1: "byndoor udupu",
  //     addressLine2: "kundapure",
  //     country: "India",
  //     city: "byndoor",
  //     state: "karantak",
  //     postalCode: "576214",
  //     mobileNumber: 96863993098,
  //     default: null,
  // },
];

const AddNewOrder = () => {
  const [userSavedAddresses, setUserSavedAddresses] = useState(addresses);

  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

  const defaultAddressHandler = () => {
    const address = userSavedAddresses.find((data) => {
      return data.default;
    });

    return address;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    referenceId: string;
    storeLink: string;
    address?: string;
  }>({
    defaultValues: {
      address: defaultAddressHandler()?.id,
    },
    resolver: yupResolver(schema),
  });

  const toggleAddNewAddressModal = () => {
    setShowAddNewAddressModal((prev) => !prev);
  };

  const onSubmit: SubmitHandler<{
    referenceId: string;
    storeLink: string;
    address?: string;
  }> = (data) => {
    console.log(data);
  };

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
          />
          <ReactHookFormInput
            label="Store Link"
            name="storeLink"
            type="string"
            register={register("storeLink")}
          />
        </div>
        <div className="mt-[20px]">
          <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px]">
            Address Book
            <span
              className="text-[#3672DF] ml-[10px] cursor-pointer"
              onClick={toggleAddNewAddressModal}
            >
              + Add New{" "}
            </span>
          </p>
        </div>
        <div className="flex-type1 flex-wrap mt-[20px] gap-[20px] ">
          {userSavedAddresses.map((data) => {
            return (
              <UserSavedAddresses
                key={data.id}
                address={data}
                register={register("address")}
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
    </>
  );
};

export default AddNewOrder;
