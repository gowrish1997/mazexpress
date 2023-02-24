import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import WhiteLogo from '../../public/whiteLogo.png'
import Instagram from "../../public/instagram.png";
import Facebook from "../../public/facebook.png";
import Youtube from "../../public/youtube.png";
import Linkedin from "../../public/linkedin.png";
import Twitter from "../../public/twitter.png";

const media_type1 = [
    { url: Instagram, label: "Instagram" },
    { url: Facebook, label: "Facebook" },
    { url: Youtube, label: "YouTube" },
];
const media_type2 = [
    { url: Linkedin, label: "LinkedIn" },
    { url: Twitter, label: "Twitter" },
];

const Footer = React.forwardRef<HTMLDivElement>((props,ref) => {

    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;

    var footerLeftSide:string[] = t("landingPage.footer.leftSide.Content", { returnObjects: true });
    var footerRightSide: string[] = t("landingPage.footer.rightSide.Content", { returnObjects: true });

    return (
        <div className="h-[396px] bg-[#2B2B2B] mt-[100px] px-[120px] py-[70px] space-y-[50px]" ref={ref}>
            <div className="flex-type2">
                <div className="flex-1 flex-type6 gap-y-[20px] ">
                    <div className="flex-type1 gap-x-[20px]">
                        <div className="relative h-[47px] w-[47px] ">
                            <Image src={WhiteLogo} fill alt="logo" />
                        </div>
                        <h1 className="text-[20px] text-[#FFFFFF] font-[700] leading-[30px] ">{t("landingPage.footer.leftSide.Title")}</h1>
                    </div>
                    <div className="w-[70%] flex-type4 text-[14px] text-[#BFB8AF] font-[400] leading-[21px] ">
                        <ul className="space-y-[15px]">
                            <li className="cursor-pointer">{footerLeftSide[0]}</li>
                            <li className="cursor-pointer">{footerLeftSide[1]}</li>
                            <li className="cursor-pointer">{footerLeftSide[2]}</li>
                        </ul>
                        <ul className="space-y-[15px]">
                            <li className="cursor-pointer">{footerLeftSide[3]}</li>
                            <li className="cursor-pointer">{footerLeftSide[4]}</li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1 flex-type6 gap-y-[20px]">
                    <h1 className="text-[20px] text-[#FFFFFF] font-[700] leading-[30px] ">{t("landingPage.footer.rightSide.Title")}</h1>
                    <div className="w-[70%] flex-type4 text-[14px] text-[#BFB8AF] font-[400] leading-[21px] ">
                        <ul className="space-y-[15px]">
                            {media_type1.map((data,index) => {
                                return (
                                    <div key={index} className="flex-type1 gap-x-[5px] cursor-pointer">
                                        <div className="relative h-[20px] w-[20px] ">
                                            <Image src={data.url} fill alt="logo" />
                                        </div>
                                        <div className="">{footerRightSide[index]}</div>
                                    </div>
                                );
                            })}
                        </ul>
                        <ul className="space-y-[15px]">
                            {media_type2.map((data,index) => {
                                return (
                                    <div key={index} className="flex-type1 gap-x-[5px] cursor-pointer">
                                        <div className="relative h-[20px] w-[20px] ">
                                            <Image src={data.url} fill alt="logo" />
                                        </div>
                                        <div className="">{footerRightSide[index+3]}</div>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div>{t("landingPage.footer.Copyright")}</div>
        </div>
    );
});

export default Footer;
