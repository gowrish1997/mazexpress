import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import expertizeImage from "@/public/Expertize.png";
import Icon from "@/public/BluebgIcon.png";

const Expertize = () => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;
  var ExpertizeContent: string[] = t("landingPage.expertize.Content", {
    returnObjects: true,
  });
  return (
    <div className="w-full   flex flex-row  justify-center items mt-[100px]">
      <div className="w-[95%] sm:w-[90%] xmd:w-[70%]">
        <p className="md:hidden  text-[30px] add_sm:text-[35px] xmd:text-[52px] leading-[50px] add_sm:leading-[56px] xmd:leading-[62px] text-[#35C6F4] font-[700]  ">
          {" "}
          {t("landingPage.expertize.Title")}
        </p>
        <div className="w-full flex flex-col-reverse md:flex-row md:justify-center items-center p-[10px] gap-y-[40px]  rounded-[8px]  ">
          <div className="flex-1 flex flex-col justify-start items-start gap-y-[10px] table_md:gap-y-[20px] ">
            <p className="hidden md:block text-[30px] add_sm:text-[35px] xmd:text-[52px] leading-[50px] add_sm:leading-[56px] xmd:leading-[62px] text-[#35C6F4] font-[700]  ">
              {" "}
              {t("landingPage.expertize.Title")}
            </p>
            {/* <p className=" text-[21px] leading-[24px] xmd:leading-[28px] xmd:text-[24px]   text-[#2B2B2B] font-[600]    ">
            {" "}
            {t("landingPage.expertize.Description")}
          </p> */}
            <div className="flex flex-row justify-start items-start flex-wrap gap-x-[15px] gap-y-[15px] ">
              {ExpertizeContent.map((data) => {
                return (
                  <div className="w-[220px] flex flex-row justify-start items-start gap-x-[10px]  ">
                    <div className="h-[24px] w-[24px] relative">
                      <Image
                        src={Icon}
                        fill
                        style={{ objectFit: "contain" }}
                        alt="docfument"
                      />
                    </div>
                    <p className="w-full text-[19px] text-[#000000] font-[600] leading-[28px] ">
                      {data}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[100%] md:w-[40%] aspect-[1/0.5] md:aspect-[1/1.2] table_md:aspect-[1/1] relative">
            <Image
              src={expertizeImage}
              fill
              alt="docfument"
              className="rounded-[20px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertize;
