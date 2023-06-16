import AboutPlane from "@/public/aboutPlane.png";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Footer from "./Footer";
import AboutShip from "@/public/aboutShip.png";
import AbputGoods from "@/public/Aboutgoods.png";
import AboutShipPlane from "@/public/ShipPlane.png";
import AboutTruck from "@/public/AboutTruck.png";
import AboutCustomer from "@/public/AboutCusotmer.png";

const aboutImage = [AbputGoods, AboutShipPlane, AboutTruck, AboutCustomer];

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
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
      <div className="w-full h-[350px] add_sm:h-[400px] xmd:h-[500px] relative ">
        <div className="h-full w-full relative">
          <Image
            src={AboutPlane}
            fill
            style={{ objectFit: "fill" }}
            alt="docfument"
          />
        </div>
        <div className="absolute top-[25%]  flex flex-col justify-start items-center gap-y-[20px] ">
          <h1 className="text-[30px] add_sm:text-[40px] xmd:text-[50px] leading-[30px] add_sm:leading-[45px] xmd:leading-[62px] text-[#090914] font-[700]">
            {t("landingPage.about.Title")}
          </h1>
          <p className="text-[16px] add_sm:text-[18px] xmd:text-[22px] leading-[24px] add_sm:leading-[28px] xmd:leading-[30px] text-[#606060] font-[600] w-[80%] add_sm:w-[70%] xmd:w-[55%] text-center">
            {t("landingPage.about.Description")}
          </p>
        </div>
      </div>
      <h1 className="w-[95%] sm:hidden text-[20px] add_sm:text-[27px] xmd:text-[45px] leading-[30px] add_sm:leading-[40px] xmd:leading-[62px] text-[#090914] font-[700] mt-[60px] ">
        {t("landingPage.about.Caption")}
      </h1>
      <div className="w-[95%] sm:w-[90%] xmd:w-[80%] flex flex-col-reverse sm:flex-row  justify-between items-center  sm:mt-[60px] xmd:mt-[80px] ">
        <div className="w-[100%] md:w-[45%] flex flex-col justify-start items-start gap-y-[10px] ">
          <h1 className="hidden sm:block text-[22px] add_sm:text-[27px] xmd:text-[45px] leading-[30px] add_sm:leading-[40px] xmd:leading-[62px] text-[#090914] font-[700]">
            {t("landingPage.about.Caption")}
          </h1>
          <p className=" w-full text-[14px] add_sm:text-[16px] xmd:text-[22px] leading-[20px] add_sm:leading-[24px] xmd:leading-[30px] text-[#606060] font-[600] text-left">
            {t("landingPage.about.Desc")}
          </p>
        </div>
        <div className="w-[100%] sm:w-[50%] min-[900px]:w-[45%] ">
          <div className="w-[100%] aspect-[1/0.5] sm:aspect-[1/1] relative">
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
              className="border-[1px] border-[#DCDCDC] rounded-[8px] w-[100%] sm:w-[48%] table_md:flex-1 p-[15px] flex flex-col  justify-between gap-y-[20px] "
              key={index}
            >
              <div className="flex flex-col gap-y-[10px]">
                {" "}
                <p className="text-[15px] add_sm:text-[17px] xmd:text-[20px] leading-[20px] add_sm:leading-[23px] xmd:leading-[27px] text-[#090914] font-[600]">
                  {data.Title}
                </p>
                <p className="text-[13px] add_sm:text-[14px] xmd:text-[16px] leading-[16px] add_sm:leading-[19px] xmd:leading-[22px] text-[#474747] font-[500]">
                  {data.Desc}
                </p>
              </div>

              <div className="w-full aspect-[1/0.4] sm:aspect-[1/0.7] min-[700px]:aspect-[1/0.5]  table_md:aspect-square relative">
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
