import React, { useMemo } from "react";
import Head from "next/head";
import FilterOptionDropDown from "./FilterOptionDropDown";
import PageheaderTitle from "./PageheaderTitle";
import ReactPaginateComponent from "./ReactPaginate";
import MazStatsDropddown from "./MazStats/MazStatsDropddown";
import AdminOptionDropDown from "./AdminOptionDropDown";
import { perPageOptinsList } from "@/lib/helper";
import { IPageHeaderProp } from "@/models/pageHeader.interface";
import useOrders from "@/lib/hooks/useOrders";

const warehouse = ["istanbul"];

const LiveOrderPageHeader = (props: IPageHeaderProp) => {
<<<<<<< Updated upstream
  const perPageOptions = perPageOptinsList();
  const packageStatusDropDownOptoin = useMemo(() => {
    return ["all status", "pending", "in-transit", "at-warehouse", "delivered"];
  }, []);
  const warehouseDropDownOption = useMemo(() => {
    return ["istanbul"];
  }, []);
=======
    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
      count_all:true
    });
   console.log(orders)
    const perPageOptions = perPageOptinsList();
    const packageStatusDropDownOptoin = useMemo(() => {
        return [
            "all status",
            "pending",
            "in-transit",
            "at-warehouse",
            "delivered",
        ];
    }, []);
    const warehouseDropDownOption = useMemo(() => {
        return ["istanbul"];
    }, []);
>>>>>>> Stashed changes

    //         setPackageStatusDropDownOptoin((prev) => {
    //             return ["all status", ...(Array.from(packageStatus) as string[])];
    //         });
    //     }
    // }, [props.allLiveOrders]);

    return (
        <>
            <div
                className={
                    "w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative z-10 "
                }
            >
                <Head>
                    <title>{props.title}</title>
                </Head>
                <PageheaderTitle
                    content={props.content}
                    allLiveOrders={props.allLiveOrders}
                    filterByDate={props.filterByDate}
                />
                <ReactPaginateComponent
                    pageCount={props.pageCount}
                    currentPageHandler={props.currentPageHandler}
                    itemsPerPage={props.itemsPerPage}
                    currentPage={props.currentPage}
                />

                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
                    <div className="flex-type1 space-x-[10px] ">
                        {/* <SearchMazTrackingIdInputField filterById={props.filterById} /> */}

<<<<<<< Updated upstream
            <MazStatsDropddown
              options={perPageOptions}
              header="per_page"
              onChange={props.itemPerPageHandler!}
              className="h-[38px] px-[10px]"
              selection={[]}
            />
            <FilterOptionDropDown
              options={packageStatusDropDownOptoin}
              type="packageStatus"
              onChange={props.onChangeStatus!}
              statusFilterKey={props.statusFilterKey}
            />
=======
                        <MazStatsDropdown
                            options={perPageOptions}
                            header="per_page"
                            onChange={props.itemPerPageHandler!}
                            className="h-[38px] px-[10px]"
                            selection={[]}
                        />
                        <FilterOptionDropDown
                            options={packageStatusDropDownOptoin}
                            type="packageStatus"
                            onChange={props.onChangeStatus!}
                            statusFilterKey={props.statusFilterKey}
                            allLiveOrders={props.allLiveOrders}
                        />
>>>>>>> Stashed changes

                        <AdminOptionDropDown
                            disabled={!props.selectedOrder?.length}
                            orders={props.allLiveOrders}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default React.memo(LiveOrderPageHeader);
