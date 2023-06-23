import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import WhiteLogo from "../../public/new_logo_white.png";
import Instagram from "../../public/instagram.png";
import Facebook from "../../public/facebook.png";
import Youtube from "../../public/youtube.png";
import Linkedin from "../../public/linkedin.png";
import Twitter from "../../public/twitter.png";
interface Iprop {
  calRef?: React.MutableRefObject<HTMLDivElement>;
  enquiryRef?: React.MutableRefObject<HTMLDivElement>;
  supportRef?: React.MutableRefObject<HTMLDivElement>;
}

const media_type1 = [
  { url: Instagram, label: "Instagram" },
  { url: Facebook, label: "Facebook" },
  { url: Youtube, label: "YouTube" },
];
const media_type2 = [
  { url: Linkedin, label: "LinkedIn" },
  { url: Twitter, label: "Twitter" },
];

const Footer = React.forwardRef<HTMLDivElement, Iprop>((props, ref) => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;

  var footerLeftSide: string[] = t("landingPage.footer.leftSide.Content", {
    returnObjects: true,
  });
  var footerRightSide: string[] = t("landingPage.footer.rightSide.Content", {
    returnObjects: true,
  });

  return (
    <div
      className=" bg-[#2B2B2B]  px-[15px] xmd:px-[120px] py-[15px] md:py-[70px] space-y-[30px] font-inter "
      ref={ref}
    >
      <div className=" flex flex-row max-[500px]:gap-y-[30px] gap-x-[10px] justify-center items-baseline">
        <div className="flex flex-col justify-center items-center gap-y-[10px] ">
          <div
            className="w-[100%] flex flex-row justify-center items-baseline gap-x-[20px] cursor-pointer mb-[15px] "
            onClick={() => router.push("/")}
          >
            <div className="relative h-[47px] w-[60px] ">
              <Image src={WhiteLogo} fill alt="logo" />
            </div>
            <h1 className="-ml-[10px] text-[20px] text-[#FFFFFF] font-[700] leading-[30px] ">
              {t("landingPage.footer.leftSide.Title")}
            </h1>
          </div>
          <div className="w-full flex-type6 gap-y-[20px] ">
            <div className="w-[100%] flex flex-row justify-start items-start gap-x-[60px] text-[14px] text-[#BFB8AF] font-[400] leading-[21px] ">
              <ul className="space-y-[15px]">
                <li className="cursor-pointer" onClick={() => router.push("/")}>
                  {footerLeftSide[0]}
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    props.calRef?.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  {footerLeftSide[1]}
                </li>
                <li className="">info@mazexpress</li>
              </ul>
              <ul className="space-y-[15px]">
                <li
                  className="cursor-pointer"
                  onClick={() => router.push("/about")}
                >
                  {footerLeftSide[3]}
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    props.enquiryRef?.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  {footerLeftSide[4]}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="flex-1 flex flex-col justify-start items-start gap-y-[10px]">
          <h1 className="text-[20px] text-[#FFFFFF] font-[700] leading-[30px] font-manrope ">
            {t("landingPage.footer.rightSide.Title")}
          </h1>
          <div className="w-full flex flex-row justify-start items-start">
            <div className="flex-1 flex-type6 gap-y-[20px]  ">
              <div className="w-[100%] flex flex-row justify-start items-start text-[14px] text-[#BFB8AF] font-[400] leading-[21px]  gap-x-[60px] ">
                <ul className="space-y-[15px]">
                  {media_type1.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="flex-type1 gap-x-[5px] cursor-pointer"
                      >
                        <div className="relative h-[20px] w-[20px] ">
                          <Image src={data.url} fill alt="logo" sizes="" />
                        </div>
                        <div className="">{footerRightSide[index]}</div>
                      </div>
                    );
                  })}
                </ul>
                <ul className="space-y-[15px]">
                  {media_type2.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="flex-type1 gap-x-[5px] cursor-pointer"
                      >
                        <div className="relative h-[20px] w-[20px] ">
                          <Image src={data.url} fill alt="logo" sizes="" />
                        </div>
                        <div className="">{footerRightSide[index + 3]}</div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="text-center text-[#BFB8AF] text-[14px] leading-[20.4px] font-[400]">
        {t("landingPage.footer.Copyright")}
      </div>
    </div>
  );
});

Footer.displayName = "Footer";
export default Footer;
