import React from "react";
import Image from "next/image";
import Profile from "../../public/image.png";
import Line from "../../public/line.png";
import Icon from "../../public/Icon.png";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;

    var content: string[] = t("landingPage.about.Content", {
        returnObjects: true,
    });

    return (
        <div
            className="w-full flex flex-col  justify-start items-center"
            ref={ref}
        >
            <div className="bg-[#35C6F4] w-full mt-[60px] flex flex-row justify-center ">
                <div className="w-[80%] flex flex-row justify-between items-center  gap-x-[15px] relative">
                    <div className="box-border flex flex-col justify-start w-[65%] py-[60px] ">
                        <p className="text-[12px] md:text-[14px] xmd:text-[16px] mt-[20px] text-[#000000] font-[500] leading-[25.5px]">
                            {t("landingPage.about.Title")}
                        </p>
                        <p className="text-[20px] md:text-[30px] xmd:text-[38px] text-[#FFFFFF]  font-[500] md:font-[600] xmd:font-[700] leading-[23.5px] md:leading-[34px] xmd:leading-[45px] ">
                            {t("landingPage.about.Description")}
                        </p>
                    </div>
                    <div className="w-[35%]">
                        <div className="relative h-[150px] w-[150px] md:w-[250px] md:h-[250px] xmd:h-[300px] xmd:w-[300px] ">
                            <Image src={Profile} fill alt="imag" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="w-[100%] flex flex-row justify-between items-center  gap-x-[15px] relative">
                <div className="absolute h-[350px] w-[112px] top-0 left-[4%]">
                    <Image src={Line} fill alt="line" />
                </div>
            </div> */}

            <div className="w-[80%] mt-[70px] flex flex-row justify-start items-start flex-wrap  gap-x-[120px]">
                {content.map((data, index) => {
                    return (
                        <div
                            key={index}
                            className="w-[100%] xmd:w-[43%]  mt-[40px] flex flex-row justify-start items-start gap-x-[5px] "
                        >
                            <div className="relative h-[22px] w-[22px] ">
                                <Image src={Icon} fill alt="imag" />
                            </div>
                            <p className="flex-1 text-[18px] text-[#090914] leading-[27px] font-[500] -mt-[5px] font-manRope">
                                {data}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

About.displayName = "About";
export default About;
