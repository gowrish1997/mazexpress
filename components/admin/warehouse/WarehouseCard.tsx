import React, { useState } from "react";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { capitalizeFirstLetter } from "@/lib/helper";
import fetchJson from "@/lib/fetchServer";
import { Warehouse } from "@/models/warehouse.model";
import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import RemoveWarehouseConfirmModal from "../modal/RemoveWarehouseConfirmModal";

interface IProp {
    address: Warehouse;
    update: () => void;
    edit: (addressId?: string) => void;
}

const WarehouseCard = (props: IProp) => {
    const [
        showWarehouseRemoveConfirmModal,
        setshowWarehouseRemoveConfirmModal,
    ] = useState(false);
    const wareHouseStatusColorHandler = (status: string) => {
        switch (status) {
            case "closed":
                return <RedRadioButton />;

            case "active":
                return <GreenRadioButton />;

            case "inactive":
                return <YellowRadioButton />;
            default:
                return "pending";
        }
    };

    const copyToClipboard = () => {
        copy(
            `${props.address.address_1} ,${props.address.address_2}, ${props.address.city}, ${props.address.country}, ${props.address.phone}`
        );
        alert(
            `you have copied ${props.address.address_1} ,${props.address.address_2}, ${props.address.city}, ${props.address.country}, ${props.address.phone}`
        );
    };

    const toggleRemvoeWarehouseConfirmModal = () => {
        setshowWarehouseRemoveConfirmModal((prev) => !prev);
    };

    const deleteWarehouseHandler = async () => {
        try {
            const result = await fetchJson(
                `/api/warehouses/${props.address.id}`,
                {
                    method: "DELETE",
                }
            );

            // console.log(result)
            props.update();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="min-w-[32%] min-h-[180px] bg-[#EDF5F9] rounded-[4px] p-[25px] ">
                <div className="flex-type3 space-x-[10px]">
                    <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
                        {capitalizeFirstLetter(props.address.tag)}
                    </p>
                    <div className="flex items-center">
                        <div>
                            {wareHouseStatusColorHandler(props.address.status)}
                        </div>
                        <span className="ml-[5px] text-[12px] text-[#2B2B2B] font-[500] leading-[18px] ">
                            {capitalizeFirstLetter(props.address.status)}
                        </span>
                    </div>
                </div>
                <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
                    Turkey
                </p>
                <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.address_1}, ${props.address.address_2}`}</p>
                <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
                    {props.address.city}
                </p>

                <div className="flex-type1 mt-[15px]">
                    <Image
                        src="/mobile.png"
                        height={12}
                        width={12}
                        alt="mobile"
                    />
                    <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
                        {props.address.phone}
                    </div>
                </div>

                <div className="text-[12px] text-[#35C6F4] font-[500] leading-[17px] flex justify-end flex-1 grow">
                    <div className="space-x-[20px] flex items-end  ">
                        <button
                            className="hover:font-[600]"
                            onClick={() => props.edit(props.address.id)}
                        >
                            Edit
                        </button>
                        <button
                            className="hover:font-[600] "
                            onClick={toggleRemvoeWarehouseConfirmModal}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            {showWarehouseRemoveConfirmModal && (
                <RemoveWarehouseConfirmModal
                    confirm={deleteWarehouseHandler}
                    close={toggleRemvoeWarehouseConfirmModal}
                />
            )}
        </>
    );
};

export default WarehouseCard;
