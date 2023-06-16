import React from "react";
import Image from "next/image";
import Document from "@/public/new_register.png";
import House from "@/public/new_home.png";
import Shoppingbag from "@/public/new_shop.png";
import Plane from "@/public/new_plain.png";
import Flowarrow from "@/public/new_arrow.png";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const MaxExpressFlowDiagram = () => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;

  var flowText: string[] = t("landingPage.flowDiagram.Text", {
    returnObjects: true,
  });

  return (
    <div className="w-[100%] min-[900px]:w-[60%] flex flex-row justify-start items-start mt-[60px] add_sm:mt-[70px] table_md:mt-[80px] z-10 ">
      <div className="w-[100%] flex flex-col sm:flex-row justify-between items-center  sm:items-start gap-x-[10px] table_md:gap-x-[20px] gap-y-[10px] ">
        <div className="w-full flex flex-row sm:flex-col justify-start items-center sm:items-start gap-y-[20px] gap-x-[10px] ">
          <div className="h-[56px] w-[56px] relative">
            <Image
              src={Document}
              fill
              style={{ objectFit: "contain" }}
              alt="document"
            />
          </div>
          <p className="box-border text-[14px] text-[#2B2B2B] font-[700] leading-[20px] text-left z-10 ">
            {flowText[0]}
          </p>
        </div>
        <div className="sm:mt-[20px]">
          <div
            className={`rotate-90 sm:rotate-0 max-[500px]:my-[10px] h-[40px] w-[40px]  relative  ${
              locale == "ar" && "rotate-180"
            }  `}
          >
            <Image
              src={Flowarrow}
              fill
              style={{ objectFit: "contain" }}
              alt="document"
            />
          </div>
        </div>
        <div className="w-full flex flex-row sm:flex-col justify-start items-center sm:items-start gap-y-[20px] gap-x-[10px]">
          <div className="h-[56px] w-[56px] relative">
            <Image
              src={Shoppingbag}
              fill
              style={{ objectFit: "contain" }}
              alt="document"
            />
          </div>
          <p className=" box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px] text-left z-10   ">
            {flowText[1]}
          </p>
        </div>
        <div className="sm:mt-[20px]">
          <div
            className={`rotate-90 sm:rotate-0 max-[500px]:my-[10px] h-[40px] w-[40px] relative ${
              locale == "ar" && "rotate-180"
            }  `}
          >
            <Image
              src={Flowarrow}
              fill
              style={{ objectFit: "contain" }}
              alt="document"
            />
          </div>
        </div>
        <div className="w-full flex flex-row sm:flex-col justify-start items-center sm:items-start gap-y-[20px] gap-x-[10px]">
          <div className="h-[56px] w-[56px] relative sm:mt-[10px]">
            <Image
              src={Plane}
              fill
              style={{ objectFit: "contain" }}
              alt="document"
            />
          </div>
          <p className=" box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px] text-left z-10  ">
            {flowText[2]}
          </p>
        </div>
        <div className="sm:mt-[20px]">
          <div
            className={`rotate-90 sm:rotate-0 max-[500px]:my-[10px] h-[40px] w-[40px] relative ${
              locale == "ar" && "rotate-180"
            }  `}
          >
            <Image
              src={Flowarrow}
              fill
              style={{ objectFit: "contain" }}
              alt="document"
            />
          </div>
        </div>
        <div className="w-full flex flex-row sm:flex-col justify-start items-center sm:items-start  gap-y-[20px] gap-x-[10px] ">
          <div className="h-[56px] w-[56px] relative">
            <Image
              src={House}
              fill
              style={{ objectFit: "contain" }}
              alt="document"
            />
          </div>
          <p className=" box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px] text-left  z-10  ">
            {flowText[3]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaxExpressFlowDiagram;
