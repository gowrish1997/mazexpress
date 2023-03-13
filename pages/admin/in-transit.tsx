import React, { useEffect, useState ,useCallback} from "react";
import useOrders from "@/lib/hooks/useOrders";
import InTransitPageHeader from "@/components/admin/InTransitPageHeader";
import { useRouter } from "next/router";
import Table from "@/components/orders/table";
import { selectOrder } from "@/lib/selectOrder";
import BlankPage from "@/components/admin/BlankPage";
import LoadingPage from "@/components/common/LoadingPage";
<<<<<<< HEAD
import { Order } from "@/models/order.model";
=======
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
>>>>>>> translate

const tableHeaders = [
  "Customer",
  "MAZ Tracking ID",
  "Store Link",
  "Reference ID",
  "Created Date",
  // "Warehouse",
  "Status",
];

const Intransit = () => {
  const router = useRouter();



  const [itemsPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [mazTrackingIdFilterKey, setMazTrackingIdFilterKey] =
    useState<string>("");
  const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
    string | Date
  >("");
  const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
    per_page: itemsPerPage,
    page: currentPage,
    status: ['in-transit']
  });

  const { locales, locale: activeLocale } = router;

  useEffect(() => {
      console.log("use efft");
      router.push(router.asPath, router.asPath, { locale: "en" });
  }, []);

  const [allInTransitOrders, setallInTransitOrders] =
    useState<Order[]>();


  const [selectedOrder, setSelectedOrder] = useState<string[]>();

  const pageCount = Math.ceil((orders as Order[])?.length / itemsPerPage);

  const currentPageHandler = (value: number) => {
    setCurrentPage(value);
  };
  const itemPerPageHandler = useCallback((value: string | number) => {
    setCurrentPage(0)
    setItemPerPage(value as number);
}, []);


  const filterByCreatedDate = (value: Date | string) => {
    setCreatedDateFilterKey(value);
  };

  const selectOrderHandler = (value: string, type: string) => {
    console.log(value)
    selectOrder(
      value,
      type,
      setSelectedOrder,
     orders?.data,
      selectedOrder!
    );
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
        <InTransitPageHeader
          content="in-transit"
          allLiveOrders={orders as Order[]}
          filterByDate={filterByCreatedDate}
          selectedOrder={selectedOrder}
          title="In-Transit | MazExpress Admin"
          pageCount={pageCount}
          currentPageHandler={currentPageHandler}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          itemPerPageHandler={itemPerPageHandler!}
        />

        <div className="flex flex-col justify-between relative flex-1 h-full">
          {!orders && <BlankPage />}
          {orders && (
            <>
              <Table
                rows={orders as Order[]}
                headings={tableHeaders}
                type="in-transit"
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

export default Intransit;
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
