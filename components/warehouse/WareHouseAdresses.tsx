import React from "react";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { Warehouse } from "@/models/entity/Warehouse";

const WareHouseAddresses = (props: { address: Warehouse }) => {
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
      `${props.address.address_1} ,${props.address.address_2}, ${props.address.city}, ${props.address.country}, ${props.address.phone}`
    );
    alert(
      `you have copied ${props.address.address_1} ,${props.address.address_2}, ${props.address.city}, ${props.address.country}, ${props.address.phone}`
    );
  };

  return (
    <div className=" box-border w-[32%] h-[180px] border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] ">
      <div className="flex-type3 space-x-[10px]">
        <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
          {props.address.tag}
        </p>
        <div className={`flex-type1`}>
          <label
            className={`customRadioInput_type2 ${wareHouseAddressStatusColorHandler(
              props.address.status
            )}`}
          >
            <input type="radio" checked={true} />
            <span className="checkmark"></span>
          </label>

          <span className="ml-[5px] text-[12px] text-[#2B2B2B] font-[500] leading-[18px] ">
            {props.address.status}
          </span>
        </div>
      </div>
      <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
        {props.address.country}
      </p>
      <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.address_1}, ${props.address.address_2}, ${props.address.city} ${props.address.country}`}</p>

      <div className="flex-type1 mt-[15px]">
        <Image src="/mobile.png" height={12} width={12} alt="mobile" />
        <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
          {props.address.phone}
        </div>
      </div>

      <div
        className="flex-type1 text-[12px] text-[#3672DF] font-[500] leading-[17px] space-x-[5px] mt-[15px] cursor-pointer "
        onClick={copyToClipboard}
      >
        <Image src="/copy.png" alt="copy" height={12} width={12} />
        <span>Copy</span>
      </div>
    </div>
  );
};

export default WareHouseAddresses;
