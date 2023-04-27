import React from "react";
import Image from "next/image";
import Document from "@/public/document.png";
import House from "@/public/house.png";
import Shoppingbag from "@/public/shopping-bag.png";
import Plane from "@/public/plane.png";
import Flowarrow from "@/public/flow_arrow.png";
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
        <div className="w-full flex flex-row justify-center items-start mt-[50px] ">
            <div className="w-[80%] flex flex-row justify-between items-start">
                <div className="flex-1 flex flex-col justify-start items-center gap-y-[20px] ">
                    <div className="h-[56px] w-[56px] relative">
                        <Image
                            src={Document}
                            fill
                            style={{ objectFit: "contain" }}
                            alt="document"
                        />
                    </div>
                    <p className="box-border text-[14px] text-[#2B2B2B] font-[700] leading-[20px] text-center px-[20px] ">
                        {flowText[0]}
                    </p>
                </div>
                <div className="mt-[20px]">
                    <div
                        className={`h-[17px] w-[8px] relative ${
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
                <div className="flex-1 flex flex-col justify-start items-center gap-y-[20px] ">
                    <div className="h-[56px] w-[56px] relative">
                        <Image
                            src={Shoppingbag}
                            fill
                            style={{ objectFit: "contain" }}
                            alt="document"
                        />
                    </div>
                    <p className=" box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px] text-center px-[20px] ">
                        {flowText[1]}
                    </p>
                </div>
                <div className="mt-[20px]">
                    <div
                        className={`h-[17px] w-[8px] relative ${
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
                <div className="flex-1 flex flex-col justify-start items-center gap-y-[20px] ">
                    <div className="h-[56px] w-[56px] relative">
                        <Image
                            src={Plane}
                            fill
                            style={{ objectFit: "contain" }}
                            alt="document"
                        />
                    </div>
                    <p className=" box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px] text-center px-[20px] ">
                        {flowText[2]}
                    </p>
                </div>
                <div className="mt-[20px]">
                    <div className={`h-[17px] w-[8px] relative ${
                            locale == "ar" && "rotate-180"
                        }  `}>
                        <Image
                            src={Flowarrow}
                            fill
                            style={{ objectFit: "contain" }}
                            alt="document"
                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center gap-y-[20px] ">
                    <div className="h-[56px] w-[56px] relative">
                        <Image
                            src={House}
                            fill
                            style={{ objectFit: "contain" }}
                            alt="document"
                        />
                    </div>
                    <p className=" box-border  text-[14px] text-[#2B2B2B] font-[700] leading-[20px] text-center px-[10px] ">
                        {flowText[3]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MaxExpressFlowDiagram;
