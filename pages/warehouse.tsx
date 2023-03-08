import React from "react";
import PageHeader from "@/components/common/PageHeader";
import useWarehouses from "@/lib/hooks/useWarehouses";
import WarehouseCard from "@/components/warehouse/WarehouseCard";
import { Warehouse } from "@/models/entity/Warehouse";

const WarehousePage = () => {
  const { warehouses, mutateWarehouses, warehousesIsLoading } = useWarehouses();


  return (
    <>
      <PageHeader content="Our Warehouse" title="Our Warehouses | MazExpress" />
      {
        warehousesIsLoading && <div>Loading warehouses</div>
      }
      <div className="grid grid-cols-3 gap-3 py-5">
        {warehouses?.map((data) => {
          return <WarehouseCard key={(data as Warehouse).id} address={data as Warehouse} />;
        })}
      </div>
    </>
  );
};
export default WarehousePage;
