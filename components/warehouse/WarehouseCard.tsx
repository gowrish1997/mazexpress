import React from "react";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { IWarehouse, IWarehouseProps } from "@/models/warehouse.interface";
import { capitalizeFirstLetter } from "@/lib/helper";

const WarehouseCard = (props: { address: IWarehouseProps }) => {

  const wareHouseAddressStatusColorHandler = (status: string) => {
    switch (status) {
      case "active":
        return "active";

      case "inactive":
        return "in_active";

      case "closed":
        return "closed";

      default:
    }
  };

  const copyToClipboard = () => {
    copy(
      `${props.address.address_1_warehouses} ,${props.address.address_2_warehouses}, ${props.address.city_warehouses}, ${props.address.state_warehouses}, ${props.address.country_warehouses}, ${props.address.pincode_warehouses}, ${props.address.phone_warehouses}`
    );
    alert(
      `you have copied ${props.address.address_1_warehouses} ,${props.address.address_2_warehouses}, ${props.address.city_warehouses}, ${props.address.state_warehouses}, ${props.address.country_warehouses}, ${props.address.pincode_warehouses}, ${props.address.phone_warehouses}`
    );
  };

  return (
    <div className=" box-border min-w-[32%] min-h-[180px] border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] ">
      <div className="flex-type3 space-x-[10px]">
        <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
          {capitalizeFirstLetter(props.address.tag_warehouses)}
        </p>
        <div className={`flex-type1`}>
          <label
            className={`customRadioInput_type2 ${wareHouseAddressStatusColorHandler(
              props.address.status_warehouses
            )}`}
          >
            {/* <input type="radio" checked={true} /> */}
            <span className="checkmark"></span>
          </label>

          <span className="ml-[5px] text-[12px] text-[#2B2B2B] font-[500] leading-[18px] ">
            {props.address.status_warehouses}
          </span>
        </div>
      </div>
      <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
        Turkey
      </p>
      <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.address_1_warehouses}, ${props.address.address_2_warehouses}`}</p>
      <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
        {props.address.city_warehouses}
      </p>

      <div className="flex-type1 mt-[15px]">
        <Image src="/mobile.png" height={12} width={12} alt="mobile" />
        <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
          {props.address.phone_warehouses}
        </div>
      </div>

      <div
        className="flex justify-end text-[12px] text-[#3672DF] font-[500] leading-[17px] space-x-[5px] mt-[15px] cursor-pointer "
        onClick={copyToClipboard}
      >
        <Image src="/copy.png" alt="copy" height={12} width={12} />
        <span>Copy</span>
      </div>
    </div>
  );
};

export default WarehouseCard;
