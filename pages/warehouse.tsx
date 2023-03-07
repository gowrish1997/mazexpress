import React, { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import useWarehouses from "@/lib/hooks/useWarehouses";
import WarehouseCard from "@/components/warehouse/WarehouseCard";
import { WarehouseEntity } from "@/lib/adapter/entities/WarehouseEntity";

const Warehouse = () => {
  const { warehouses, mutateWarehouses, warehousesIsLoading } = useWarehouses();

  useEffect(() => {
    console.log(warehouses?.data)
  }, [warehouses])
  return (
    <>
      <PageHeader content="Our Warehouse" title="Our Warehouses | MazExpress" />
      {
        warehousesIsLoading && <div>Loading warehouses</div>
      }
      <div className="grid grid-cols-3 gap-3 py-5">
        {warehouses?.data?.map((data) => {
          return <WarehouseCard key={(data as WarehouseEntity).id} address={data as WarehouseEntity} />;
        })}
      </div>
    </>
  );
};
export default Warehouse;
