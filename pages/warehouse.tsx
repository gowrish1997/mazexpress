import React from "react";
import PageHeader from "@/components/orders/PageHeader";
import useWarehouses from "@/lib/useWarehouses";
import WarehouseCard from "@/components/warehouse/WarehouseCard";

const Warehouse = () => {
  const { warehouses, mutateWarehouses } = useWarehouses();
  return (
    <>
      <PageHeader content="Our Warehouse" />
      <div className="flex-type1 flex-wrap mt-[20px] gap-[20px] ">
        {warehouses?.map((data) => {
          return <WarehouseCard key={data.id_warehouses} address={data} />;
        })}
      </div>
    </>
  );
};
export default Warehouse;
