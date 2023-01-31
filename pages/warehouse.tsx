import React from "react";
import PageHeader from "@/components/orders/PageHeader";
import useWarehouses from "@/lib/useWarehouses";
import WarehouseCard from "@/components/warehouse/WarehouseCard";

const Warehouse = () => {
  const { warehouses, mutateWarehouses } = useWarehouses();
  return (
    <>
      <PageHeader content="Our Warehouse" title="Our Warehouses | MazExpress" />
      <div className="grid grid-cols-3 gap-3 py-5">
        {warehouses?.map((data) => {
          return <WarehouseCard key={data.id_warehouses} address={data} />;
        })}
      </div>
    </>
  );
};
export default Warehouse;
