import AddButton from "@/components/common/AddButton";
import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/orders/table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { SearchKeyContext } from "@/components/common/Frame";
import LoadingPage from "@/components/common/LoadingPage";
import useOrderCount from "@/lib/hooks/useOrderCount";
import useOrders from "@/lib/hooks/useOrders";
import { getDateInDBFormat } from "@/lib/utils";
import { Order } from "@/models/order.model";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserPageWrapper from "@/components/common/UserPageWrapper";
import { getSession } from "@/lib/selectOrder";

const MyOrders = () => {
    const { searchKey } = React.useContext(SearchKeyContext) as any;
    // console.log(searchKey);

    const [itemsPerPage, setItemPerPage] = useState<number>(25);

    const [currentPage, setCurrentPage] = useState(0);

    const [createdDateFilterKey, setCreatedDateFilterKey] = useState<
        Date | string
    >("");
    const { data: session, update }: { data: any; update: any } = useSession();

    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        type: "get_by_email",
        search: searchKey,
        username: session?.user.email,
        per_page: itemsPerPage,
        page: currentPage,
        date: getDateInDBFormat(createdDateFilterKey as Date),
    });

    const { orderCount, mutateOrderCount } = useOrderCount({
        // status: statusSelection as string[],
        status: [
            "pending",
            "at-warehouse",
            "in-transit",
            "out-for-delivery",
            "delivered",
        ],

        username: "gowrish@eflairwebtech.com",
    });

    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
    const blankPageDiscription: string[] = t(
        "indexPage.blankPage.Description",
        {
            returnObjects: true,
        }
    );
    const tableHeaders: string[] = t("indexPage.orderTable.TableHeader", {
        returnObjects: true,
    });

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    const addNewOrderHandler = () => {
        router.push(`/add-new-order`);
    };

    const currentPageHandler = useCallback((value: number) => {
        setCurrentPage(value);
    }, []);
    const itemPerPageHandler = useCallback((value: string | number) => {
        setCurrentPage(0);
        setItemPerPage(value as number);
    }, []);

    const filterByCreatedDate = useCallback((value: Date | string) => {
        // console.log(value);
        setCreatedDateFilterKey(value);
    }, []);

    if (ordersIsLoading) {
        return <LoadingPage />;
    }

    if (ordersError) throw ordersError;

    return (
        <UserPageWrapper>
            <PageHeader
                content={t("indexPage.pageHeader.Title")}
                showCalender={true}
                title="My Orders | MazExpress"
                itemPerPageHandler={itemPerPageHandler!}
                filterByDate={filterByCreatedDate}
                currentPageHandler={currentPageHandler}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                createdDateFilterKey={createdDateFilterKey}
                allLiveOrders={orders?.data as Order[]}
                pageCount={Math.ceil((orders?.count as number) / itemsPerPage)}
                isFilterPresent={searchKey || createdDateFilterKey}
            />

            <div className="flex flex-col justify-between relative flex-1 h-full">
                {!orders?.data && !searchKey && !createdDateFilterKey ? (
                    <div className="flex-1 flex flex-col justify-center items-center w-full ">
                        <div className="relative h-[221px] w-[322px] ">
                            <Image
                                src="/noorder.png"
                                fill
                                style={{ objectFit: "contain" }}
                                alt="happy"
                                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 100vw,
                100vw"
                                priority={true}
                            />
                        </div>
                        <div className=" w-[375px] h-[122px] text-[21px] text-[#8794AD] font-[600] leading-[33px] mt-[20px] text-center ">
                            {blankPageDiscription[0]}
                            <br />
                            <Link href={`/add-new-order`}>
                                <span className="text-[#0057FF] font-[500] p-[5px] rounded-[4px] hover:bg-[#EDF5F9] ">
                                    {" "}
                                    {blankPageDiscription[1]}
                                </span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <Table
                            rows={orders?.data as any}
                            headings={tableHeaders}
                            type="order"
                        />
                        <AddButton onClick={addNewOrderHandler} />
                    </>
                )}
            </div>
        </UserPageWrapper>
    );
};

export default MyOrders;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ["common"])),
        },
    };
}
