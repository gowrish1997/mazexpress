import PageHeader from "@/components/common/PageHeader";
import WarehouseCard from "@/components/admin/warehouse/WarehouseCard";
import useWarehouses from "@/lib/hooks/useWarehouses";
import AddNewWarehouseModal from "@/components/admin/warehouse/modal/AddNewWarehouseModal";
import { Warehouse } from "@/models/warehouse.model";

import React, { useState, useEffect } from "react";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const WarehousePage = () => {
  const router = useRouter();
  const { warehouses, mutateWarehouses } = useWarehouses();

  const { locales, locale: activeLocale } = router;

  useEffect(() => {
    // console.log("use efft");
    router.push(router.asPath, router.asPath, { locale: "en" });
  }, []);
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
          return (
            <WarehouseCard
              key={data.id}
              address={data}
              update={mutateWarehouses}
            />
          );
        })}
      </div>
      <div>
        <button
          className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] mt-[25px]"
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
export async function getStaticProps({ locale }: { locale: any }) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
