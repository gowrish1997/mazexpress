import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageHeader from "@/components/orders/PageHeader";
import UserSavedAddresses from "@/components/orders/UserSavedAddresses";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import { IAddressProps } from "@/models/address.interface";
import { IOrder } from "@/models/order.interface";

const schema = yup
    .object({
        referenceId: yup.string().required(),
        storeLink: yup.string().required(),
    })
    .required();

const addresses = [
    {
        id_addresses: 12,
        tag_addresses: "home",
        address_1_addresses: "yeljitn",
        address_2_addresses: "kotikero",
        country_addresses: "india",
        city_addresses: "banfaloore",
        state_addresses: "karnatka",
        pincode_addresses: "57632",
        phone_addresses: 82344352,
        default_addresses: "on",
    },
];

const AddNewOrder = () => {
    const [userSavedAddresses, setUserSavedAddresses] = useState<IAddressProps[]>(addresses);
    const [editableAddress, setEditableAddress] = useState<IAddressProps>();
    const [showEditUserAddressModal, setShowEditUserAddressModal] = useState<boolean>(false);
    const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

    const defaultAddressHandler = () => {
        const address = userSavedAddresses.find((data) => {
            return data.default_addresses;
        });

        return address;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IOrder>({
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
            const address = userSavedAddresses.find((data) => {
                return data.id_addresses == addressId;
            });
            setEditableAddress(address);
        }
    };

    const onSubmit: SubmitHandler<IOrder> = (data) => {
        if (userSavedAddresses.length) {
            console.log(data);
        } else {
            setShowAddNewAddressModal(true);
        }
    };

    return (
        <>
            <PageHeader content="Add New Order" showCalender={false} />
            <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
                    <Image src="/blueexclamatory.png" alt="icon" width={16} height={16} />
                    <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                        Here is a link to some fake information that contains crucial information, <span className="text-[#3672DF]">Link here →</span>
                    </p>
                </div>
                <div className="flex-type1 space-x-[10px] mt-[25px]">
                    <ReactHookFormInput label="Reference ID" name="referenceId" type="string" register={register("referenceId")} error={errors.referenceId} />
                    <ReactHookFormInput label="Store Link" name="storeLink" type="string" register={register("storeLink")} error={errors.storeLink} />
                </div>
                <div className="mt-[20px]">
                    <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px]">
                        Address Book
                        <span className="text-[#3672DF] ml-[10px] cursor-pointer" onClick={toggleAddNewAddressModal}>
                            + Add New{" "}
                        </span>
                    </p>
                </div>
                <div className="flex-type1 flex-wrap mt-[20px] gap-[15px] ">
                    {userSavedAddresses.map((data) => {
                        return <UserSavedAddresses key={data.id_addresses} address={data} register={register("address")} edit={toggleEditUserAddressModal} />;
                    })}
                </div>
                <button className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] mt-[25px]" type="submit">
                    Place order
                </button>
            </form>
            <AddNewAddressModal show={showAddNewAddressModal} close={toggleAddNewAddressModal} />
            {showEditUserAddressModal && <EditUserAddressModal show={showEditUserAddressModal} close={toggleEditUserAddressModal} address={editableAddress!} />}
        </>
    );
};

export default AddNewOrder;
