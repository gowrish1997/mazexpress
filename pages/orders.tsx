import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import PageHeaders from "@/components/common/PageHeader";
import Table from "@/components/orders/table";
import AddButton from "@/components/common/AddButton";
import useUser from "@/lib/useUser";
import useOrders from "@/lib/useOrders";
import { FetchError } from "@/lib/fetchJson";
import { useTranslation } from "next-i18next";
import { IOrderResponse } from "@/models/order.interface";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const tableHeaders = ["MAZ Tracking ID", "Store Link", "Reference ID", "Est. Delivery", "Address", "Status"];

const MyOrders = () => {
    const { user, mutateUser } = useUser();
    const { orders, mutateOrders, ordersIsLoading, ordersError } = useOrders({
        user_id: 1,
    });

    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
    const blankPageDiscription: string[] = t("indexPage.blankPage.Discription", { returnObjects: true });
    const tableHeaders: string[] = t("indexPage.orderTable.TableHeader", { returnObjects: true });

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    const addNewOrderHandler = () => {
        router.push(`/add-new-order`);
    };

    if (ordersError) throw ordersError;
    return (
        <>
            <PageHeaders content={t("indexPage.pageHeader.Title")} showCalender={true} title="My Orders | MazExpress" />

            <div className="flex flex-col justify-between relative flex-1 h-full">
                {ordersIsLoading ||
                    (orders && (orders as IOrderResponse[]).length <= 0 && (
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
                                    <span className="text-[#0057FF] font-[500] p-[5px] rounded-[4px] hover:bg-[#EDF5F9] "> {blankPageDiscription[1]}</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                {orders && (orders as IOrderResponse[]).length > 0 && (
                    <>
                        <Table rows={orders as any} headings={tableHeaders} type="order" />
                        <AddButton onClick={addNewOrderHandler} />
                    </>
                )}
            </div>
        </>
    );
};

export default MyOrders;
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
