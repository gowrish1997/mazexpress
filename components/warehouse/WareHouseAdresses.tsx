import React from "react";
import Image from "next/image";
import copy from "copy-to-clipboard";
interface IProp {
    id: string;
    title: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    city: string;
    state: string;
    postalCode: string;
    mobileNumber: number;
    status: string;
}

const WareHouseAddresses = (props: { address: IProp }) => {
    const wareHouseAddressStatusColorHandler = (status: string) => {
        switch (status) {
            case "Active":
                return "active";

            case "Inactive":
                return "in_active";

            case "Closed":
                return "closed";

            default:
        }
    };

    const copyToClipboard = () => {
        copy(
            `${props.address.addressLine1} ,${props.address.addressLine2}, ${props.address.city}, ${props.address.state}, ${props.address.country}, ${props.address.postalCode}, ${props.address.mobileNumber}`
        );
        alert(
            `you have copied ${props.address.addressLine1} ,${props.address.addressLine2}, ${props.address.city}, ${props.address.state}, ${props.address.country}, ${props.address.postalCode}, ${props.address.mobileNumber}`
        );
    };

    return (
        <div className=" box-border min-w-[32%] h-[180px] border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] ">
            <div className="flex-type3 space-x-[10px]">
                <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">{props.address.title}</p>
                <div className={`flex-type1 customRadioInput_type2 ${wareHouseAddressStatusColorHandler(props.address.status)} `}>
                    <input type="radio" checked={true} />
                    <span className="ml-[5px]">{props.address.status}</span>
                </div>
            </div>
            <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">{props.address.country}</p>
            <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.addressLine1}, ${props.address.addressLine2}, ${props.address.city}, ${props.address.state}, ${props.address.country}`}</p>

            <div className="flex-type1 mt-[15px]">
                <Image src="/mobile.png" height={12} width={12} alt="mobile" />
                <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">{props.address.mobileNumber}</div>
            </div>

            <div className="flex-type1 text-[12px] text-[#3672DF] font-[500] leading-[17px] space-x-[5px] mt-[15px] cursor-pointer " onClick={copyToClipboard}>
                <Image src="/copy.png" alt="copy" height={12} width={12} />
                <span>Copy</span>
            </div>
        </div>
    );
};

export default WareHouseAddresses;
