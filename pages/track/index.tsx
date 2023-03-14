import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PageHeader from "@/components/common/PageHeader";
import Layout from "@/components/layout";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import PackageTrackingView from "@/components/ordertracking/PackageTrackingView";
import WarehouseTracking from "@/components/ordertracking/WarehouseTracking";
<<<<<<< HEAD
import useOrders from "@/lib/useOrders";
import useUser from "@/lib/hooks/useUser";
=======
>>>>>>> sessions
import Link from "next/link";
import { useRouter } from "next/router";
import { createToast } from "@/lib/toasts";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
<<<<<<< HEAD

const TrackOrder = (props: any) => {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { user, mutateUser,} = useUser();
    const { orders, ordersIsLoading } = useOrders({ user_id: user?.id });

    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
=======
import useUser from "@/lib/hooks/useUser";
import useOrders from "@/lib/hooks/useOrders";

const TrackOrder = (props: any) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, mutateUser } = useUser();
  const { orders, ordersIsLoading } = useOrders({ user_id: user?.id });

  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;
>>>>>>> sessions

    const [packageStatus, setPackageStatus] = useState(0);

<<<<<<< HEAD
    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    const trackHandler = () => {
        if (searchInputRef.current !== null && searchInputRef.current !== undefined) {
            const id = searchInputRef.current.value;
            if (id !== "") {
                router.push(`/track/${id}`);
            } else {
                createToast({
                    type: "warning",
                    title: "Track failed",
                    message: "Enter a valid Maz tracking id",
                    timeOut: 3000,
                });
            }
        }
    };

    return (
        <>
            <PageHeader content={t("orderTrackingPage.pageHeader.Title")} className="border-none pb-[10px]" title="Track your package | MazExpress" />
            <Layout>
                <div className="flex-type2 w-full">
                    <div className="flex flex-col gap-y-[35px] w-full">
                        <div className="font-[500]">
                            <p className="text-[14px] text-[#2B2B2B] leading-[21px]">{t("orderTrackingPage.PageTitle")}</p>
                            <p className="text-[12px] text-[#8794AD] leading-[17px]">{t("orderTrackingPage.Discription")}</p>
                        </div>
                        <div className="flex-1 min-h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] flex px-[15px] relative">
                            <input
                                className="bg-transparent focus:outline-none searchbar flex-1"
                                id="searchbar"
                                type="text"
                                placeholder={t("orderTrackingPage.InputFieldLabel") as string}
                                ref={searchInputRef}
                            />
                            <div className={`absolute w-[16px] h-[16px] ${locale == "en" ? "right-[10px]" : " left-[10px]"}   top-[15px] cursor-pointer`} onClick={trackHandler}>
                                <Image
                                    src="/search.png"
                                    fill
                                    style={{
                                        objectFit: "contain",
                                    }}
                                    alt="search"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
=======
  useEffect(() => {
    let dir = router.locale == "ar" ? "rtl" : "ltr";
    let lang = router.locale == "ar" ? "ar" : "en";
    document.querySelector("html")?.setAttribute("dir", dir);
    document.querySelector("html")?.setAttribute("lang", lang);
  }, [router.locale]);

  const trackHandler = () => {
    if (
      searchInputRef.current !== null &&
      searchInputRef.current !== undefined
    ) {
      const id = searchInputRef.current.value;
      if (id !== "") {
        router.push(`/track/${id}`);
      } else {
        createToast({
          type: "warning",
          title: "Track failed",
          message: "Enter a valid Maz tracking id",
          timeOut: 3000,
        });
      }
    }
  };

  return (
    <>
      <PageHeader
        content={t("orderTrackingPage.pageHeader.Title")}
        className="border-none pb-[10px]"
        title="Track your package | MazExpress"
      />
      <Layout>
        <div className="flex-type2 w-full">
          <div className="flex flex-col gap-y-[35px] w-full">
            <div className="font-[500]">
              <p className="text-[14px] text-[#2B2B2B] leading-[21px]">
                {t("orderTrackingPage.PageTitle")}
              </p>
              <p className="text-[12px] text-[#8794AD] leading-[17px]">
                {t("orderTrackingPage.Discription")}
              </p>
            </div>
            <div className="flex-1 min-h-[46px] border-[0.5px] boder-[#8794AD] rounded-[6px] flex px-[15px] relative">
              <input
                className="bg-transparent focus:outline-none searchbar flex-1"
                id="searchbar"
                type="text"
                placeholder={t("orderTrackingPage.InputFieldLabel") as string}
                ref={searchInputRef}
              />
              <div
                className={`absolute w-[16px] h-[16px] ${
                  locale == "en" ? "right-[10px]" : " left-[10px]"
                }   top-[15px] cursor-pointer`}
                onClick={trackHandler}
              >
                <Image
                  src="/search.png"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt="search"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
>>>>>>> sessions
};

export default TrackOrder;
export async function getStaticProps({ locale }: { locale: any }) {
<<<<<<< HEAD
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
=======
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
>>>>>>> sessions
}
