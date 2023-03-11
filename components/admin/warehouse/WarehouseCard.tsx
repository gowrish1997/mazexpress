import React from "react";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { IWarehouse, IWarehouseProps } from "@/models/warehouse.interface";
import { capitalizeFirstLetter } from "@/lib/helper";

const WarehouseCard = (props: { address: IWarehouseProps }) => {
  const getBg = (status: string) => {
    switch (status) {
      case "active":
        return {
          // color: "#34A853",
          backgroundColor: "#34A853",
          // borderColor: "#34A853",
        };

      case "inactive":
        return {
          // color: "#34A853",
          backgroundColor: "#34A853",
          // borderColor: "#34A853",
        };

      case "closed":
        return {
          // color: "#34A853",
          backgroundColor: "#34A853",
          // borderColor: "#34A853",
        };

      default:
        return {
          // color: "#34A853",
          backgroundColor: "black",
          // borderColor: "#34A853",
        };
    }
  };

  const getBorder = (status: string) => {
    switch (status) {
      case "active":
        return {
          // color: "#34A853",
          // backgroundColor: "#34A853",
          borderColor: "#34A853",
        };

      case "inactive":
        return {
          // color: "#34A853",
          // backgroundColor: "#34A853",
          borderColor: "#34A853",
        };

      case "closed":
        return {
          // color: "#34A853",
          // backgroundColor: "#34A853",
          borderColor: "#34A853",
        };

      default:
        return {
          // color: "#34A853",
          // backgroundColor: "black",
          borderColor: "#34A853",
        };
    }
  };

  const getColor = (status: string) => {
    switch (status) {
      case "active":
        return {
          color: "#34A853",
          // backgroundColor: "#34A853",
          // borderColor: "#34A853",
        };

      case "inactive":
        return {
          color: "#34A853",
          // backgroundColor: "#34A853",
          // borderColor: "#34A853",
        };

      case "closed":
        return {
          color: "#34A853",
          // backgroundColor: "#34A853",
          // borderColor: "#34A853",
        };

      default:
        return {
          color: "#34A853",
          // backgroundColor: "black",
          // borderColor: "#34A853",
        };
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
    <div className="min-w-[32%] min-h-[180px] bg-[#EDF5F9] rounded-[4px] p-[25px] ">
      <div className="flex-type3 space-x-[10px]">
        <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] capitalize ">
          {props.address.tag_warehouses}
        </p>
        <div className="flex items-center">
          <div
            className="border box-border p-[2px] rounded-full flex flex-col items-center justify-center"
            style={getBorder(props.address.status_warehouses)}
          >
            <span
              className="min-h-[10px] min-w-[10px] block rounded-full flex-1 box-border"
              style={getBg(props.address.status_warehouses)}
            ></span>
          </div>
          <span className="ml-[5px] text-[12px] text-[#2B2B2B] font-[500] leading-[18px] capitalize ">
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

      <div className="text-[12px] text-[#3672DF] font-[500] leading-[17px] flex justify-end flex-1 grow">
          <div className="space-x-[20px] flex items-end  ">
            <button className='hover:font-[600] '>
              Edit
            </button>
            <button className='hover:font-[600] '>Remove</button>
          </div>
        </div>
    </div>
  );
};

export default WarehouseCard;
