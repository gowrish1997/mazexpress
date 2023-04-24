import WarehouseCard from "@/components/admin/warehouse/WarehouseCard";
import AddNewWarehouseModal from "@/components/admin/warehouse/modal/AddNewWarehouseModal";
import EditNewWarehouseModal from "@/components/admin/warehouse/modal/EditNewWarehouseModal";
import PageHeader from "@/components/common/PageHeader";
import useWarehouses from "@/lib/hooks/useWarehouses";
import { Warehouse } from "@/models/warehouse.model";
import { GetServerSidePropsContext } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import AdminPageWrapper from "@/components/common/AdminPageWrapper";

const WarehousePage = () => {
    const router = useRouter();
    const { warehouses, mutateWarehouses } = useWarehouses();

    const [editableWarehouse, setEditableWarehouse] = useState<Warehouse>();

    const [showAddNewWarehouseModal, setShowAddNewWarehouseModal] =
        useState(false);
    const [showEditNewWarehouseModal, setEditNewWarehouseModal] =
        useState(false);

    const toggleAddNewWarehouseModal = () => {
        setShowAddNewWarehouseModal((prev) => !prev);
    };
    const toggleEditNewWarehouseModal = (addressId?: string) => {
        if (showEditNewWarehouseModal) {
            setEditNewWarehouseModal(false);
        } else {
            setEditNewWarehouseModal(true);
            const address = (warehouses as Warehouse[])?.find((data) => {
                return data.id == addressId;
            });
            setEditableWarehouse(address);
        }
    };

    return (
        <AdminPageWrapper>
            <PageHeader
                content="Warehouses"
                title="Warehouses | MazExpress Admin"
            />
            <div className="grid grid-cols-3 gap-3 py-5">
                {(warehouses as Warehouse[])?.map((data) => {
                    return (
                        <WarehouseCard
                            key={data.id}
                            address={data}
                            update={mutateWarehouses}
                            edit={toggleEditNewWarehouseModal}
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
            {showAddNewWarehouseModal && (
                <AddNewWarehouseModal
                    show={showAddNewWarehouseModal}
                    close={toggleAddNewWarehouseModal}
                    update={mutateWarehouses}
                />
            )}
            {showEditNewWarehouseModal && (
                <EditNewWarehouseModal
                    close={toggleEditNewWarehouseModal}
                    address={editableWarehouse!}
                    update={mutateWarehouses}
                />
            )}
        </AdminPageWrapper>
    );
};

export default WarehousePage;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    // console.log("redders", ctx.req.cookies);
    // if (ctx.req.cookies.is_admin !== "true") {
    //   return {
    //     redirect: {
    //       destination: "/",
    //       permanent: false,
    //     },
    //   };
    // }
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ["common"])),
        },
    };
}
