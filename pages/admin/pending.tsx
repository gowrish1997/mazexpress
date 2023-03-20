import React, { useState, useCallback, useEffect } from "react";
import useOrders from "@/lib/hooks/useOrders";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import PendingPageHeader from "@/components/admin/PendingPageHeader";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import LoadingPage from "@/components/common/LoadingPage";
import { Order } from "@/models/order.model";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const tableHeaders = [
  "Customer",
  "MAZ Tracking ID",
  "Store Link",
  "Reference ID",
  "Created Date",
  // "Warehouse",
  "Status",
];

const PendingOrders = () => {
  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  useEffect(() => {
    // console.log("use efft");
    router.push(router.asPath, router.asPath, { locale: "en" });
  }, []);

  const [itemsPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
    string | Date
  >("");

  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    per_page: itemsPerPage,
    page: currentPage,
    status: ["pending"],
  });
  // console.log(orders);

  const [selectedOrder, setSelectedOrder] = useState<string[]>();

  const pageCount = Math.ceil((orders as Order[])?.length / itemsPerPage);

  const currentPageHandler = (value: number) => {
    setCurrentPage(value);
  };
  const itemPerPageHandler = useCallback((value: string | number) => {
    setCurrentPage(0);
    setItemPerPage(value as number);
  }, []);

  const filterByCreatedDate = (value: Date | string) => {
    setCreatedDateFilterKey(value);
  };

  const selectOrderHandler = (value: string, type: string) => {
    selectOrder(value, type, setSelectedOrder, orders, selectedOrder);
  };

  if (ordersIsLoading) {
    // return <LoadingPage />;
  }
  if (ordersError) {
    return <div>some error happened</div>;
  }

  return (
    <>
      <div>
        <PendingPageHeader
          content="pending"
          allLiveOrders={orders as Order[]}
          selectedOrder={selectedOrder}
          filterByDate={filterByCreatedDate}
          title="Pending Orders | MazExpress Admin"
          pageCount={pageCount}
          currentPageHandler={currentPageHandler}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        itemPerPageHandler={itemPerPageHandler!}
          //   filterById={filterByMazTrackingId}
        />

        <div className="flex flex-col justify-between relative flex-1 h-full">
          {!orders && <BlankPage />}
          {orders && (
            <>
              <Table
                rows={orders as Order[]}
                headings={tableHeaders}
                type="pending"
                onSelect={selectOrderHandler}
                selectedOrder={selectedOrder!}
              />
            </>
          )}
        </div>
        {selectedOrder?.length! > 0 && (
          <div className="fixed bottom-0 bg-[#EDF5F9] w-full py-[10px] -ml-[27px] pl-[20px] rounded-[4px] text-[14px] text-[#606060] font-[500] leading-[19.6px]">{`${selectedOrder?.length} orders are selected`}</div>
        )}
      </div>
    </>
  );
};

export default PendingOrders;
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
