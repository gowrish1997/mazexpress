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
    <div className="w-[100%] min-[900px]:w-[60%] flex flex-row justify-start items-start mt-[60px] add_sm:mt-[70px] table_md:mt-[80px] z-10 font-inter ">
      <div className="w-[100%] flex flex-col sm:flex-row justify-between items-center  sm:items-start gap-x-[10px] table_md:gap-x-[30px] gap-y-[10px] ">
        <div className="w-full flex flex-row sm:flex-col justify-start items-center sm:items-start gap-y-[20px] gap-x-[10px] ">
          <div className="flex flex-row justify-start items-center ">
            <div className="h-[56px] w-[56px] relative">
              <Image
                src={Document}
                fill
                style={{ objectFit: "contain" }}
                alt="document"
              />
            </div>
            <div
              className={`hidden sm:block ${
                locale == "ar" ? "rotate-180" : "rotate-0"
              }  h-[40px] w-[60px] min-[1400px]:w-[80px] ${
                locale == "ar"
                  ? "mr-[10px] table_md:mr-[20px]  min-[1400px]:mr-[50px]"
                  : "ml-[10px] table_md:ml-[20px]  min-[1400px]:ml-[50px]"
              }    relative   `}
            >
              <Image
                src={Flowarrow}
                fill
                style={{ objectFit: "contain" }}
                alt="document"
              />
            </div>
          </div>

          <p
            className={`box-border text-[14px] text-[#2B2B2B] font-[700] leading-[20px] ${
              router.locale == "en" ? "text-left" : "text-right"
            } z-10 `}
          >
            {flowText[0]}
          </p>
        </div>
        <div className="sm:mt-[20px] sm:hidden ">
          <div
            className={`rotate-90 sm:rotate-0 max-[500px]:my-[10px] h-[40px] w-[40px] sm:ml-[15px] min-[1100px]:ml-[30px]  relative  ${
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
          <div className="flex flex-row justify-start items-center ">
            <div className="h-[56px] w-[56px] relative">
              <Image
                src={Shoppingbag}
                fill
                style={{ objectFit: "contain" }}
                alt="document"
              />
            </div>
            <div
              className={`hidden sm:block  ${
                locale == "ar" ? "rotate-180" : "rotate-0"
              }  h-[40px] w-[60px] min-[1400px]:w-[80px] ${
                locale == "ar"
                  ? "mr-[10px] table_md:mr-[20px]  min-[1400px]:mr-[50px]"
                  : "ml-[10px] table_md:ml-[20px]  min-[1400px]:ml-[50px]"
              }   relative    `}
            >
              <Image
                src={Flowarrow}
                fill
                style={{ objectFit: "contain" }}
                alt="document"
              />
            </div>
          </div>

          <p
            className={` box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px]${
              router.locale == "en" ? "text-left" : "text-right"
            } z-10   `}
          >
            {flowText[1]}
          </p>
        </div>
        <div className="sm:mt-[20px] sm:hidden">
          <div
            className={`rotate-90 sm:rotate-0 max-[500px]:my-[10px] h-[40px] w-[40px] relative sm:ml-[15px] min-[1100px]:ml-[30px] ${
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
          <div className="flex flex-row justify-start items-center ">
            <div
              className={`h-[56px] w-[56px] relative sm:mt-[5px] ${
                locale == "ar" ? "transform -scale-x-100" : ""
              }`}
            >
              <Image
                src={Plane}
                fill
                style={{ objectFit: "contain" }}
                alt="document"
              />
            </div>
            <div
              className={`hidden sm:block  ${
                locale == "ar" ? "rotate-180" : "rotate-0"
              }  h-[40px] w-[60px] min-[1400px]:w-[80px]  ${
                locale == "ar"
                  ? "mr-[10px] table_md:mr-[20px]  min-[1400px]:mr-[50px]"
                  : "ml-[10px] table_md:ml-[20px]  min-[1400px]:ml-[50px]"
              }  relative   `}
            >
              <Image
                src={Flowarrow}
                fill
                style={{ objectFit: "contain" }}
                alt="document"
              />
            </div>
          </div>

          <p
            className={` box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px] ${
              router.locale == "en" ? "text-left" : "text-right"
            } z-10  `}
          >
            {flowText[2]}
          </p>
        </div>
        <div className="sm:mt-[20px] sm:hidden">
          <div
            className={`rotate-90 sm:rotate-0 max-[500px]:my-[10px] h-[40px] w-[40px] relative sm:ml-[15px] min-[1100px]:ml-[30px] ${
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
          <p
            className={` box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px] ${
              router.locale == "en" ? "text-left" : "text-right"
            }  z-10  `}
          >
            {flowText[3]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaxExpressFlowDiagram;
