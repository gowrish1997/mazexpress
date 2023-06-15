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
import PaperPlane from "@/public/paperplane.png";
import Image from "next/image";
import MazLogo from "@/public/Maz_logo.png";
import Expertize from "@/components/LandingPage/Expertize";
import New_logo_white from "@/public/new_logo_white.png";
import OurCustomer from "@/components/LandingPage/OurCustomer";

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
              <div className=" bg-[#35C6F4] mt-[20px] relative flex justify-center py-[60px]  ">
                <div className="w-[95%] sm:w-[90%] xmd:w-[80%]">
                  <div
                    className={`w-[55%] aspect-[1/0.8] top-[3%] absolute min-[1600px]:-top-[20%] min-[1300px]:-top-[13%]  xmd:-top-[5%] add_md:-top-[0%] table_md:top-[2%] md:top-[0%]  sm:top-[2%]  ${
                      router.locale == "en" ? "right-[8%]" : "left-[8%]"
                    } `}
                  >
                    <Image
                      src={PaperPlane}
                      fill
                      style={{ objectFit: "contain" }}
                      alt="document"
                    />
                  </div>
                  <div className="w-[100%] flex flex-row justify-start ">
                    <div className="w-[100%] z-20">
                      {/* <h1 className="text-left text-[36px]  text-[#000000] font-[900] leading-[40px]   ">
                      {t("landingPage.welcome.Title")}
                    </h1> */}
                      <div className="flex flex-row justify-start items-end gap-x-[7px] ">
                        <div className="h-[45px] w-[70px] add_sm:h-[62px] table_md:h-[70px] add_sm:w-[80px] table_md:w-[85px] relative ">
                          <Image src={New_logo_white} fill alt="document" />
                        </div>
                        <p className="text-[#143055] text-[27px] add_sm:text-[40px] font-[800] -mb-[11px] add_sm:-mb-[14px] ">
                          Express
                        </p>
                      </div>

                      <p className="w-[100%] min-[900px]:w-[35%] text-left text-[14px] add_sm:text-[16px] table_md:text-[18px]  text-[#121212] font-[700] add_sm:leading-[22px] leading-[18px] table_md:leading-[25px]  mt-[15px]  ">
                        {t("landingPage.welcome.Caption")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col min-[900px]:flex-row justify-start items-start min-[900px]:items-center gap-x-[50px] ">
                    {" "}
                    <MaxExpressFlowDiagram />
                    <div className="max-[500px]:w-[100%] max-[900px]:w-[400px] flex-1 bg-[#FFFFFF] rounded-[4px] mt-[70px] py-[20px] sm:py-[40px] px-[20px] z-20 ">
                      <p className=" text-[14px] text-[#000000] font-[400] leading-[24px] mt-[10px] mb-[10px] ">
                        {t("landingPage.trackOrder.CaptionPart1")}
                      </p>
                      <div className="w-full h-[35px] sm:h-[56px] flex flex-row justify-start max-[500px]:items-center max-[500px]:gap-y-[10px] gap-x-[20px]">
                        <input
                          className="w-full h-full border-[1px] border-[#8794AD]  px-[10px] rounded-[25px]"
                          placeholder={
                            t("landingPage.trackOrder.Placeholder") as string
                          }
                          onChange={trackingIdInputHandler}
                        />
                        <button
                          className="h-full bg-[#35C6F4] rounded-[10px] px-[10px] text-[12px] sm:text-[16px] text-[#FFFFFF] font-[400] leading-[24px]"
                          onClick={openPackageTrackingModal}
                        >
                          {t("landingPage.trackOrder.SubmitButton")}
                        </button>
                      </div>
                      {trackingIdError && (
                        <p className="mt-[5px] text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                          {" "}
                          {t("landingPage.trackOrder.Error")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Expertize />
              <OurCustomer />
              <div id="shipmentCalculatorSection">
                <ShipmentCostCalculator ref={shipmentCalculatorSectionRef} />
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
