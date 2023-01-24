import React, { useState } from "react";
import { nanoid } from "nanoid";
import WareHouseAddresses from "@/components/warehouse/WareHouseAdresses";
import PageHeader from "@/components/orders/PageHeader";
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
        status: "Active",
    },
    {
        id: nanoid(),
        title: "Gowiesh hpuse",
        addressLine1: "kambadakone",
        addressLine2: "kundapure",
        country: "India",
        city: "byndoor",
        state: "karantak",
        postalCode: "576214",
        mobileNumber: 96863993098,
        status: "Inactive",
    },
    {
        id: nanoid(),
        title: "Gowiesh hpuse",
        addressLine1: "shorour",
        addressLine2: "kundapure",
        country: "India",
        city: "byndoor",
        state: "karantak",
        postalCode: "576214",
        mobileNumber: 96863993098,
        status: "Closed",
    },
   
];

const Warehouse = () => {
  
  const [wareHouseaddresses,setWareHouseaddresses]=useState(addresses)

  return <>
  <PageHeader content="Our Warehouse"/>
  <div className="flex-type1 flex-wrap mt-[20px] gap-[20px] ">
      
    {wareHouseaddresses.map((data) => {
        return <WareHouseAddresses key={data.id} address={data}  />;
      })}
</div>
      </>
}
export default Warehouse;
