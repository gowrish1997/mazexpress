import React from "react";
import Image from "next/image";
import Truck from "../../public/truck.png";
import Cloud from "../../public/cloud.png";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const content = [
    {
        Title: "Warehousing:",
        Content:
            " Our warehousing service enables customers to shop from Turkish online retailers and conveniently send their shipment to our ITurkish-based warehouse. We provide secure, storage and handle the consolidation and shipment of your orders to Libya by air or sea, as per your preferences.",
    },
    {
        Title: "Warehousing:",
        Content:
            " Our warehousing service enables customers to shop from Turkish online retailers and conveniently send their shipment to our ITurkish-based warehouse. We provide secure, storage and handle the consolidation and shipment of your orders to Libya by air or sea, as per your preferences.",
    },
    {
        Title: "Warehousing:",
        Content:
            " Our warehousing service enables customers to shop from Turkish online retailers and conveniently send their shipment to our ITurkish-based warehouse. We provide secure, storage and handle the consolidation and shipment of your orders to Libya by air or sea, as per your preferences.",
    },
    {
        Title: "Warehousing:",
        Content:
            " Our warehousing service enables customers to shop from Turkish online retailers and conveniently send their shipment to our ITurkish-based warehouse. We provide secure, storage and handle the consolidation and shipment of your orders to Libya by air or sea, as per your preferences.",
    },
];

const Service = React.forwardRef<HTMLDivElement>((props, ref) => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;

    // var content = t("landingPage.service.content", {
    //     returnObjeFcts: true,
    // });

    return (
        <div
            className="w-full bg-[#F9FDFF] mt-[30px] flex flex-col  justify-start items-center  py-[70px] "
            ref={ref}
        >
            <div className="w-[80%] flex flex-row justify-between items-start  gap-x-[50px]">
                <div className="hidden min-[1300px]:block relative w-[526px] h-[661px] ">
                    <Image src={Truck} fill alt="truck" />
                </div>
                <div className="flex-1">
                    <p className="text-[30px] text-[#121212] font-[500] leading-[50px] ">
                        {t("landingPage.service.Title")}
                    </p>
                    <div className="mt-[20px] flex flex-col justify-start items-start  gap-y-[40px]">
                        {content.map((data,index) => {
                            return (
                                <div key={index} className="flex flex-row justify-start items-start gap-[10px] ">
                                    <div className="relative w-[20px] h-[15px] ">
                                        <Image src={Cloud} alt="cloud" fill />
                                    </div>

                                    <p className="flex-1 -mt-[5px] text-[16px] text-[ #18181B] font-[400] leading-[28px]  ">
                                        <span className="text-[18px] text-[#090914] font-[600] leading-[28px]">
                                            {content[0].Title}
                                        </span>
                                        {content[0].Content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});
Service.displayName="Service"
export default Service;
