import PageHeader from "@/components/common/PageHeader";
import WarehouseCard from "@/components/admin/warehouse/WarehouseCard";
import useWarehouses from "@/lib/hooks/useWarehouses";
import React, { useState } from "react";
import AddNewWarehouseModal from "@/components/admin/warehouse/modal/AddNewWarehouseModal";
import { Warehouse } from "@/models/entity/Warehouse";

const WarehousePage = () => {
  const { warehouses, mutateWarehouses } = useWarehouses();
  const [showAddNewWarehouseModal, setShowAddNewWarehouseModal] =
    useState(false);

  const toggleAddNewWarehouseModal = () => {
    setShowAddNewWarehouseModal((prev) => !prev);
  };

  return (
    <>
      <PageHeader content="Warehouses" title="Warehouses | MazExpress Admin" />
      <div className="grid grid-cols-3 gap-3 py-5">
        {(warehouses as Warehouse[])?.map((data) => {
          return <WarehouseCard key={data.id} address={data} />;
        })}
      </div>
      <div>
        <button
          className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] mt-[25px]"
          onClick={toggleAddNewWarehouseModal}
        >
          + Add New
        </button>
      </div>
      <AddNewWarehouseModal
        show={showAddNewWarehouseModal}
        close={toggleAddNewWarehouseModal}
        update={mutateWarehouses}
      />
    </>
  );
};

export default WarehousePage;
