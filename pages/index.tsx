//==========================
//     co-author: gowrish
//     co-author: raunak
//==========================

import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import Footer from "@/components/LandingPage/Footer";
import MazCommunityForm from "@/components/LandingPage/MazCommunityForm";
import PackageTrackingModal from "@/components/LandingPage/PackageTrackingModal";
import ShipmentCostCalculator from "@/components/LandingPage/ShipmentCostCalculator";
import HomePageWrapper from "@/components/common/HomePageWrapper";
import fetchServer from "@/lib/fetchServer";
import { useScrollspy } from "@/lib/hooks/useScrollSpy";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import MaxExpressFlowDiagram from "@/components/LandingPage/MaxExpressFlowDiagram";

const Index = () => {
    const router = useRouter();
    const { t } = useTranslation("");
    const activeSection = useScrollspy([
        "shipmentCalculatorSection",
        "enquirySection",
        "supportSection",
    ]);

    const trackingSectionRef = useRef<HTMLDivElement>(null);

    const [trackingId, setTrackingId] = useState<string>("");
    const [trackingIdError, setTrackingIdError] = useState<boolean>(false);
    const [showPackageTrackingModal, setShowPackageTrackingModal] =
        useState(false);

    useEffect(() => {
        document.cookie = `NEXT_LOCALE=${router.locale};path=/`;
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    const trackingIdInputHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const isValidMazId = await fetchServer(`/api/orders/validate-maz-id`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ maz_id: e.target.value }),
        });

        if (isValidMazId) {
            setTrackingId((e.target as HTMLInputElement).value);
            setTrackingIdError(false);
        } else {
            setTrackingId("");
            setTrackingIdError(true);
        }
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
            <HomePageWrapper
                type="home"
                activeSection={activeSection}
                render={(
                    shipmentCalculatorSectionRef: React.MutableRefObject<HTMLDivElement>,
                    enquirySectionRef: React.MutableRefObject<HTMLDivElement>,
                    supportSectionRef: React.MutableRefObject<HTMLDivElement>
                ) => {
                    return (
                        <div className="w-full">
                            <div className="px-[10px] md:px-[30px] xmd:px-[150px]  ">
                                <div className="w-[100%] flex flex-row justify-center ">
                                    <div className="w-[75%] mt-[30px] ">
                                        <h1 className="text-center text-[36px]  text-[#000000] font-[900] leading-[40px]  mt-[25px] md:mt-[40px] ">
                                            {t("landingPage.welcome.Title")}
                                        </h1>
                                        <p className="text-center text-[18px]  text-[#121212] font-[700] leading-[25px]  mt-[15px] ">
                                            {t("landingPage.welcome.Caption")}
                                        </p>
                                        {/* <p className="text-center text-[12px] md:text-[14px] xmd:text-[16px] mt-[20px] text-[#525D72] font-[500] leading-[15px] md:leading-[20px] xmd:leading-[25px] ">
                                            {t(
                                                "landingPage.welcome.Description"
                                            )}
                                        </p> */}
                                    </div>
                                </div>

                                <MaxExpressFlowDiagram />
                                <div
                                    className="flex-type5 mt-[70px] w-[100%]"
                                    ref={trackingSectionRef}
                                >
                                    <div className="w-full md:w-[65%] flex flex-col  sm:flex-row justify-center max-[500px]:items-center max-[500px]:gap-y-[10px] gap-x-[20px]">
                                        <input
                                            className="w-full border-[1px] border-[#8794AD] h-[40px] md:h-[56px] px-[10px] rounded-[25px]"
                                            placeholder={
                                                t(
                                                    "landingPage.trackOrder.Placeholder"
                                                ) as string
                                            }
                                            onChange={trackingIdInputHandler}
                                        />
                                        <button
                                            className=" h-[40px] md:h-[56px] bg-[#35C6F4] w-[140px] rounded-[30px] px-[10px] text-[16px] text-[#FFFFFF] font-[400] leading-[24px]"
                                            onClick={openPackageTrackingModal}
                                        >
                                            {t(
                                                "landingPage.trackOrder.SubmitButton"
                                            )}
                                        </button>
                                    </div>
                                    {trackingIdError && (
                                        <p className="mt-[5px] text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                                            {" "}
                                            {t("landingPage.trackOrder.Error")}
                                        </p>
                                    )}
                                    <p className="text-center text-[14px] text-[#000000] font-[400] leading-[24px] mt-[10px] ">
                                        {t(
                                            "landingPage.trackOrder.CaptionPart1"
                                        )}
                                        {/* <span className="text-[#35C6F4] cursor-pointer ">
																									{" "}
																									{t("landingPage.trackOrder.CaptionPart2")}
																					</span> */}
                                    </p>
                                </div>
                            </div>

                            <div id="shipmentCalculatorSection">
                                <ShipmentCostCalculator
                                    ref={shipmentCalculatorSectionRef}
                                />
                            </div>
                            <div id="enquirySection">
                                <MazCommunityForm ref={enquirySectionRef} />
                            </div>
                            <div id="supportSection">
                                <Footer ref={supportSectionRef} />
                            </div>
                        </div>
                    );
                }}
            />

            {showPackageTrackingModal && (
                <PackageTrackingModal close={closePackageTrackingModal} />
            )}
        </>
    );
};

export default Index;

export async function getStaticProps({ locale }: { locale: any }) {
    // console.log(process.env);
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
