import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Location from "../../public/blue_location.png";
import Vehicle from "../../public/blue_vehicle.png";
import Warehouse from "../../public/blue_warehouse.png";
import Ship from "../../public/ship.png";
import Truck from "../../public/truck.png";

const pngImages = [Warehouse, Vehicle, Location, Ship];

const Service = React.forwardRef<HTMLDivElement>((props, ref) => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;

    var content: { Title: string; Content: string }[] = t(
        "landingPage.service.content",
        {
            returnObjects: true,
        }
    );

    return (
        <div
            className="w-full bg-[#F9FDFF] mt-[30px] flex flex-col  justify-start items-center py-[70px] "
            ref={ref}
        >
            <div className="w-[80%] flex flex-row justify-between items-start  gap-x-[50px]">
                <div className="hidden min-[1300px]:block relative w-[526px] h-[580px] ">
                    <Image src={Truck} fill alt="truck" />
                </div>
                <div className="flex-1">
                    <p className="text-[30px] text-[#121212] font-[500] leading-[50px] ">
                        {t("landingPage.service.Title")}
                    </p>
                    <div className="mt-[20px] flex flex-col justify-start items-start  gap-y-[50px]">
                        {content.map((data, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-row justify-start items-start gap-[10px] "
                                >
                                    <div className="relative w-[20px] h-[20px] ">
                                        <Image
                                            src={pngImages[index]}
                                            alt="cloud"
                                            fill
                                        />
                                    </div>

                                    <p className="flex-1 -mt-[5px] text-[16px] text-[ #18181B] font-[400] leading-[28px]  ">
                                        <span className="text-[18px] text-[#090914] font-[600] leading-[28px]">
                                            {data.Title}
                                        </span>
                                        {data.Content}
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
Service.displayName = "Service";
export default Service;
