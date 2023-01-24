import React from "react";
import Image from "next/image";

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
    default: string | null;
}

const UserSavedAddresses = (props: { address: IProp; register?: any }) => {
    return (
        <div className=" box-border flex-type2 min-w-[32%] h-[180px] border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] ">
            <input type="radio" name="address" checked={props.address.default} value={props.address.id} {...(props.register?props.register:"")} className="cursor-pointer" />
            <div className="-mt-[5px] ml-[7px]">
                <div className="flex-type1 space-x-[10px] ">
                    <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">{props.address.title}</p>
                    {props.address.default && <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px] ">Default</div>}
                </div>
                <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">{props.address.country}</p>
                <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.addressLine1}, ${props.address.addressLine2}, ${props.address.city}, ${props.address.state}, ${props.address.country}`}</p>

                <div className="flex-type1 mt-[15px]">
                    <Image src="/mobile.png" height={12} width={12} alt="mobile" />
                    <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">{props.address.mobileNumber}</div>
                </div>

                <div className="text-[12px] text-[#3672DF] font-[500] leading-[17px] space-x-[10px] mt-[15px] ">
                    <button>Edit</button>
                    <button>Remove</button>
                </div>
            </div>
        </div>
    );
};

export default UserSavedAddresses;
