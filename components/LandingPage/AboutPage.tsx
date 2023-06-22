import AboutCustomer from "@/public/AboutCusotmer.png";
import AboutTruck from "@/public/AboutTruck.png";
import AboutGoods from "@/public/Aboutgoods.png";
import AboutShipPlane from "@/public/ShipPlane.png";
import AboutShip from "@/public/aboutblueImage.png";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import HomepageNavbar from "../common/HomepageNavbar";

const aboutImage = [AboutGoods, AboutShipPlane, AboutTruck, AboutCustomer];
interface Iprop {
  calRef: React.MutableRefObject<HTMLDivElement>;
  enquiryRef: React.MutableRefObject<HTMLDivElement>;
  supportRef: React.MutableRefObject<HTMLDivElement>;
}

const About = React.forwardRef<HTMLDivElement, Iprop>((props: Iprop, ref) => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;

  var content: { Title: string; Desc: string }[] = t(
    "landingPage.about.Content",
    {
      returnObjects: true,
    }
  );

  return (
    <div
      className="w-full flex flex-col  justify-center items-center"
      ref={ref}
    >
      <div
        className="w-full h-[350px] add_sm:h-[500px] xmd:h-[620px] relative min-[1650px]:h-[680px] "
        style={{
          backgroundImage: `url('/aboutPlane.png')`,
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",

          backgroundSize: "cover",
        }}
      >
        <div className=" ">
          <HomepageNavbar
            color="#121212"
            shipmentCalculatorSectionRef={props.calRef}
            enquirySectionRef={props.enquiryRef}
            supportSectionRef={props.supportRef}
          />
        </div>

        <div className="absolute top-[30%] left-0 w-[100%] flex flex-col justify-start items-center gap-y-[20px] ">
          <h1 className="text-[30px] add_sm:text-[40px] xmd:text-[50px] leading-[30px] add_sm:leading-[45px] xmd:leading-[62px] text-[#090914] font-[700]">
            {t("landingPage.about.Title")}
          </h1>
          <p className="text-[14px] add_sm:text-[18px] xmd:text-[22px] leading-[22px] add_sm:leading-[28px] xmd:leading-[35px] text-[#606060] font-[600] w-[80%] add_sm:w-[70%] xmd:w-[65%] min-[1650px]:w-[53%] text-center">
            {t("landingPage.about.Description")}
          </p>
        </div>
      </div>
      <h1 className="w-[95%] sm:hidden text-[20px] add_sm:text-[27px] xmd:text-[45px] min-[1650px]:text-[50px] leading-[30px] add_sm:leading-[40px] xmd:leading-[62px] min-[1650px]:leading-[68px] text-[#090914] font-[700] mt-[60px] ">
        {t("landingPage.about.Caption")}
      </h1>
      <div className="w-[95%] sm:w-[90%] xmd:w-[77%] min-[1650px]:w-[72%] flex flex-col-reverse sm:flex-row  justify-between items-center  sm:mt-[60px] xmd:mt-[80px] ">
        <div className="w-[100%] md:w-[45%] flex flex-col justify-start items-start gap-y-[10px] ">
          <h1 className="hidden sm:block text-[22px] add_sm:text-[27px] xmd:text-[45px] min-[1650px]:text-[50px] leading-[30px] add_sm:leading-[40px] xmd:leading-[62px] min-[1650px]:leading-[68px] text-[#090914] font-[700]">
            {t("landingPage.about.Caption")}
          </h1>
          <p
            className={`w-full text-[14px] add_sm:text-[16px] xmd:text-[22px] min-[1650px]:text-[24px] leading-[20px] add_sm:leading-[24px] xmd:leading-[36px] text-[#606060] font-[600]  ${
              router.locale == "en" ? "text-left" : "text-right"
            }`}
          >
            {t("landingPage.about.Desc")}
          </p>
        </div>
        <div className="w-[100%] sm:w-[50%] min-[900px]:w-[50%] ">
          <div className="w-[100%] aspect-[1/0.5] sm:aspect-[1/0.8] relative">
            <Image
              src={AboutShip}
              fill
              style={{ objectFit: "fill" }}
              alt="docfument"
            />
          </div>
        </div>
      </div>
      <div className="w-[95%] sm:w-[90%] xmd:w-[80%] flex flex-row flex-wrap justify-start mt-[60px] add_sm:mt-[65px] xmd:mt-[80px] gap-x-[15px] gap-y-[15px] items-stretch ">
        {content.map((data, index) => {
          return (
            <div
              className="border-[1px] border-[#DCDCDC] rounded-[8px] w-[100%] sm:w-[48%] table_md:flex-1 p-[15px] flex flex-col  justify-between gap-y-[20px]  hover:bg-[#F1F5F9] "
              key={index}
            >
              <div className="flex flex-col gap-y-[10px] px-[5px]  ">
                {" "}
                <p className="text-[15px] add_sm:text-[17px] xmd:text-[20px] min-[1650px]:text-[24px] leading-[20px] add_sm:leading-[23px] xmd:leading-[27px] min-[1650px]:leading-[33px] text-[#090914] font-[600]">
                  {data.Title}
                </p>
                <p className="text-[13px] add_sm:text-[14px] xmd:text-[16px] leading-[16px] add_sm:leading-[19px] xmd:leading-[22px] text-[#474747] font-[500]">
                  {data.Desc}
                </p>
              </div>

              <div className="w-full aspect-[1/0.4] sm:aspect-[1/0.7] min-[700px]:aspect-[1/0.5]  table_md:aspect-[1/0.8] min-[1650px]:aspect-[1/0.7] relative">
                <Image
                  src={aboutImage[index]}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="docfument"
                  className="rounded-[10px] "
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

About.displayName = "About";
export default About;
