import React, { useState } from "react";
import PageHeader from "@/components/orders/PageHeader";
import UserSavedAddresses from "@/components/orders/UserSavedAddresses";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import { nanoid } from "nanoid";
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
    //     {
    //         id: nanoid(),
    //         title: "Gowiesh hpuse",
    //         addressLine1: "byndoor udupu",
    //         addressLine2: "kundapure",
    //         country: "India",
    //         city: "byndoor",
    //         state: "karantak",
    //         postalCode: "576214",
    //         mobileNumber: 96863993098,
    //         default: null,
    //     },
    //     {
    //         id: nanoid(),
    //         title: "Gowiesh hpuse",
    //         addressLine1: "byndoor udupu",
    //         addressLine2: "kundapure",
    //         country: "India",
    //         city: "byndoor",
    //         state: "karantak",
    //         postalCode: "576214",
    //         mobileNumber: 96863993098,
    //         default: null,
    //     },
];
const AddressBook = () => {
    const [userSavedAddresses, setUserSavedAddresses] = useState(addresses);
    const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

    const toggleAddNewAddressModal = () => {
        setShowAddNewAddressModal((prev) => !prev);
    };

    return (
        <>
            <PageHeader content="AddressBook" />
            <div className="flex-type1 flex-wrap mt-[20px] gap-[20px] ">
                {userSavedAddresses.map((data) => {
                    return <UserSavedAddresses key={data.id} address={data} />;
                })}
            </div>
            <div>
                <button className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] mt-[25px]" onClick={toggleAddNewAddressModal} >
                    + Add New
                </button>
            </div>

            <AddNewAddressModal show={showAddNewAddressModal} close={toggleAddNewAddressModal} />
        </>
    );
};

export default AddressBook;
