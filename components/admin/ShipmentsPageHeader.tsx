import { perPageOptinsList } from "@/lib/helper";
import { bulkActionHandler, getOrderIdList } from "@/lib/selectOrder";
import { createToast } from "@/lib/toasts";
import { Order } from "@/models/order.model";
import { IPageHeaderProp } from "@/models/pageHeader.interface";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import AdminOptionDropDown from "./AdminOptionDropDown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";
import PageheaderTitle from "./PageheaderTitle";
import ReactPaginateComponent from "./ReactPaginate";
import MovedOutConfirmModal from "./modal/MovedOutConfirmModal";
import SortOptionDropDown from "./SortOptionDropDown";

const adminOption = ["Moved out"];

const ShipmentsPageHeader = (props: IPageHeaderProp) => {
    const perPageOptions = perPageOptinsList();
    const router = useRouter();

    const warehousesDropDownOptoin = ["istanbul"];
    const [showMovedOutConfirmModal, setMovedOutConfirmModal] = useState(false);

    const toggleMovedOutConfirmModal = () => {
        setMovedOutConfirmModal((prev) => !prev);
    };

    const MovedOutHanlder = async () => {
        try {
            const status = await bulkActionHandler(
                props.selectedOrder as Order[],
                "in-transit",
                2,
                "Order left Istanbul warehouse!",
                "has left our Istanbul warehouse and will be reach Libya soon.",
                true
            );

            createToast({
                type: "success",
                title: "success",
                message: `orders with ID ${getOrderIdList(
                    props.selectedOrder
                )} successfully updated `,
                timeOut: 2000,
            });

            props.mutateOrder?.();
            props.setSelectedOrder?.([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div
                className={
                    "w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "
                }
            >
                <Head>
                    <title>{props.title}</title>
                </Head>
                <PageheaderTitle
                    content={props.content}
                    allLiveOrders={props.allLiveOrders}
                    filterByDate={props.filterByDate}
                    createdDateFilterKey={props.createdDateFilterKey}
                />
                <ReactPaginateComponent
                    pageCount={props.pageCount!}
                    currentPageHandler={props.currentPageHandler}
                    itemsPerPage={props.itemsPerPage}
                    currentPage={props.currentPage}
                />
                {((props.allLiveOrders && props.allLiveOrders.length > 0) ||
                    props.isFilterPresent) && (
                    <div className="flex-type1 space-x-[10px]  ">
                        <MazStatsDropddown
                            options={perPageOptions}
                            header="per_page"
                            onChange={props.itemPerPageHandler!}
                            className="h-[38px] px-[10px]"
                            itemPerPage={props.itemsPerPage}
                        />
                        <FilterOptionDropDown
                            options={warehousesDropDownOptoin}
                            type="warehouse"
                        />

                        <AdminOptionDropDown
                            option={adminOption}
                            toggle={toggleMovedOutConfirmModal}
                            disabled={!props.selectedOrder?.length}
                            orders={props.allLiveOrders}
                        />
                        <SortOptionDropDown />
                    </div>
                )}
            </div>

            <MovedOutConfirmModal
                close={toggleMovedOutConfirmModal}
                show={showMovedOutConfirmModal}
                total={props.selectedOrder?.length!}
                confirm={MovedOutHanlder}
            />
        </>
    );
};

export default ShipmentsPageHeader;
