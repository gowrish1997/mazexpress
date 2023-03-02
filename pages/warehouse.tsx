import React from "react";
import PageHeader from "@/components/common/PageHeader";
import useWarehouses from "@/lib/hooks/useWarehouses";
import WarehouseCard from "@/components/warehouse/WarehouseCard";

const Warehouse = () => {
  const { warehouses, mutateWarehouses } = useWarehouses();
  return (
    <>
      <PageHeader content="Our Warehouse" title="Our Warehouses | MazExpress" />
      <div className="grid grid-cols-3 gap-3 py-5">
        {warehouses?.map((data) => {
          return <WarehouseCard key={data.id} address={data} />;
        })}
      </div>
    </>
  );
};
export default Warehouse;
