import PageHeader from "@/components/common/PageHeader";
import WarehouseCard from "@/components/admin/warehouse/WarehouseCard";
import useWarehouses from "@/lib/useWarehouses";
import React from "react";

const Warehouse = () => {
  const { warehouses, mutateWarehouses } = useWarehouses();
  return (
    <>
      <PageHeader content="Warehouses" title="Warehouses | MazExpress Admin" />
      <div className="grid grid-cols-3 gap-3 py-5">
        {warehouses?.map((data) => {
          return <WarehouseCard key={data.id_warehouses} address={data} />;
        })}
      </div>
    </>
  );
};

export default Warehouse;
