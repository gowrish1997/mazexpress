import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import Image from "next/image";
import newlogoBlue from "../public/new_logo_blue.png";
import ShipmentCostCalculator from "@/components/LandingPage/ShipmentCostCalculator";
import Footer from "@/components/LandingPage/Footer";
import PackageTrackingModal from "@/components/LandingPage/PackageTrackingModal";
import { useRouter } from "next/router";
import LanguageSwitcher from "@/components/LandingPage/LanguageSwitcher";
import MazCommunityForm from "@/components/LandingPage/MazCommunityForm";
import { useTranslation } from "next-i18next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Index = () => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;
    console.log(locale);
    var section: string[] = t("landingPage.navBar.Section", { returnObjects: true });
    var auth: string[] = t("landingPage.navBar.Auth", { returnObjects: true });

    const trackingSectionRef = useRef<HTMLDivElement>(null);
    const shipmentCalculatorSectionRef = useRef<HTMLDivElement>(null);
    const supportSectionRef = useRef<HTMLDivElement>(null);

    const [trackingId, setTrackingId] = useState<string>("");
    const [trackingIdError, setTrackingIdError] = useState<boolean>(false);
    const [showPackageTrackingModal, setShowPackageTrackingModal] = useState(false);

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    const trackingIdInputHandler = (e: SyntheticEvent) => {
        setTrackingIdError(false);
        setTrackingId((e.target as HTMLInputElement).value);
    };

    const openPackageTrackingModal = () => {
        if (trackingId) {
            router.push({
                query: { id: trackingId },
            });
            setShowPackageTrackingModal(true);
            setTrackingIdError(false);
        } else {
            setTrackingIdError(true);
        }
    };

    const closePackageTrackingModal = () => {
        router.back();
        setShowPackageTrackingModal(false);
    };

    return (
        <>
            <div className="">
                <div className="w-full flex justify-center items-center h-[46px] bg-[#2B2B2B] text-[14px] text-[#FFFFFF] font-[500] leading-[24px] ">{t("landingPage.Header")}</div>
                <div className="lg:px-[150px] px-[50px] ">
                    <div className="w-full flex flex-row justify-between items-end h-[80px] text-[14px] text-[#121212] font-[500] leading-[24px] ">
                        <div className="flex flex-row justify-between items-baseline gap-x-[20px] ">
                            <div className="relative h-[47px] w-[47px] ">
                                <Image src={newlogoBlue} fill alt="logo" />
                            </div>
                            <ul className="flex-type3 gap-x-[20px] ">
                                <li className="cursor-pointer" onClick={() => trackingSectionRef?.current?.scrollIntoView({ behavior: "smooth" })}>
                                    {t(section[0])}
                                </li>
                                <li className="cursor-pointer" onClick={() => shipmentCalculatorSectionRef?.current?.scrollIntoView({ behavior: "smooth" })}>
                                    {t(section[1])}
                                </li>
                                <li className="cursor-pointer" onClick={() => supportSectionRef?.current?.scrollIntoView({ behavior: "smooth" })}>
                                    {t(section[2])}
                                </li>
                            </ul>
                        </div>

                        <div className="flex-type1 gap-x-[20px]">
                            <button>{auth[1]}</button>
                            <button className="bg-[#35C6F4] text-[#FFFFFF] rounded-[4px] px-[15px] py-[5px] ">{auth[0]}</button>
                            <LanguageSwitcher />
                        </div>
                    </div>
                    <div className="flex-type5 mt-[55px] w-[100%]" ref={trackingSectionRef}>
                        <div className="w-[65%] flex flex-row justify-center gap-x-[20px]">
                            <input
                                className="flex-1 border-[1px] border-[#8794AD] h-[56px] px-[10px] rounded-[4px]"
                                placeholder={t("landingPage.trackOrder.Placeholder") as string}
                                onChange={trackingIdInputHandler}
                            />
                            <button
                                className="h-[56px] bg-[#35C6F4] rounded-[4px] px-[40px] text-[16px] text-[#FFFFFF] font-[400] leading-[24px]"
                                onClick={openPackageTrackingModal}
                            >
                                {t("landingPage.trackOrder.SubmitButton")}
                            </button>
                        </div>
                        {trackingIdError && <p className="mt-[5px] text-[12px] text-[#f02849] mb-[-10px] leading-[16px]"> {t("landingPage.trackOrder.Error")}</p>}
                        <div className="">
                            <p className="text-center text-[16px] text-[#000000] font-[400] leading-[24px] mt-[10px] ">
                                {t("landingPage.trackOrder.CaptionPart1")} <span className="text-[#3672DF] cursor-pointer "> {t("landingPage.trackOrder.CaptionPart2")}</span>
                            </p>
                            <h1 className="text-center text-[32px] text-[#121212] font-[600] leading-[50px] mt-[40px] ">{t("landingPage.Title")}</h1>
                            <p className="text-center text-[16px] text-[#525D72] font-[500] leading-[25.5px]">{t("landingPage.Discription")}</p>
                        </div>
                    </div>
                    <ShipmentCostCalculator ref={shipmentCalculatorSectionRef} />
                </div>
                <MazCommunityForm />
                <Footer ref={supportSectionRef} />
            </div>
            {showPackageTrackingModal && <PackageTrackingModal close={closePackageTrackingModal} />}
        </>
    );
};

export default Index;

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
