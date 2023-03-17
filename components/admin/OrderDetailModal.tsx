import React, { useState } from "react";
import * as yup from "yup";
import Card from "./Card";
import { Order } from "@/models/order.model";

interface IProp {
    row: Order;
    close: () => void;
}

const schema = yup
    .object({
        address_1: yup.string().required(),
        address_2: yup.string().required(),
    })
    .required();

const OrderDetailModal = (props: IProp) => {
    const genderHandler = (type: string) => {
        switch (type) {
            case "m":
                return "Male";
            case "f":
                return "Female";
            case "u":
                return "Unknown";
            case "o":
                return "Other";
        }
    };

    return (
        <>
            <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
                <form className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px]  gap-y-[15px]">
                    <p className="text-[22px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
                        Order Detailed View
                    </p>
                    <div className="flex flex-row justify-start items-start w-full ">
                        <p className="w-[30%] text-[15px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
                            Order detail:
                        </p>
                        <div className="transition duration-300 flex flex-col items-start border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[5px] h-full w-full">
                            <Card content="Maz id" value={props.row.maz_id} />
                            <Card
                                content="Reference id"
                                value={props.row.reference_id}
                            />
                            <Card
                                content="Store link"
                                value={props.row.store_link}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-start w-full ">
                        <p className="w-[30%] text-[15px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
                            User detail:
                        </p>
                        <div className="transition duration-300 flex flex-col items-start border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[5px] h-full w-full">
                            <Card
                                content="Name"
                                value={
                                    props.row.user.first_name +
                                    " " +
                                    props.row.user.last_name
                                }
                            />
                            <Card
                                content="Email"
                                value={props.row.user.email}
                            />
                            <Card
                                content="Phone"
                                value={props.row.address.phone!}
                            />
                            <Card
                                content="Gender"
                                value={genderHandler(props.row.user.gender)!}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-start w-full ">
                        <p className="w-[30%] text-[15px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
                            Address detail:
                        </p>
                        <div className="transition duration-300 flex flex-col items-start border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[5px]  h-full w-full ">
                            <Card
                                content="Address Line1"
                                value={props.row.address.address_1}
                            />
                            <Card
                                content="Address Line2"
                                value={props.row.address.address_2}
                            />
                            <Card
                                content="City"
                                value={props.row.address.city}
                            />
                            <Card
                                content="Country"
                                value={props.row.address.country}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-[10px] mt-[5px] w-full text-right ">
                        <button
                            className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] px-[15px]"
                            onClick={props.close}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default OrderDetailModal;
