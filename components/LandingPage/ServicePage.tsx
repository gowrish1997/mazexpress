import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Location from "../../public/blue_location.png";
import Vehicle from "../../public/blue_vehicle.png";
import Warehouse from "../../public/blue_warehouse.png";
import Ship from "../../public/ship.png";
import serviceWarehouse from "@/public/serviceWarehouse.png";
import serviceShip from "@/public/serviceShip.png";
import serviceSeaship from "@/public/serviceSeaShip.png";
import serviceOnline from "@/public/ServiceOnine.png";
import HomepageNavbar from "../common/HomepageNavbar";

const pngImages = [Warehouse, Vehicle, Location, Ship];
const serviceImage = [
  serviceWarehouse,
  serviceShip,
  serviceSeaship,
  serviceOnline,
];

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
      className="w-full bg-[#F9FDFF]  flex flex-col  justify-start items-center"
      ref={ref}
    >
      <div
        className="w-full h-[350px] add_sm:h-[400px] xmd:h-[500px] relative "
        style={{
          backgroundImage: `url('/servicePlaneLayer.png'),url('/serviceplane.png')`,
          backgroundPosition: "center center,center center,",
          backgroundRepeat: "no-repeat,no-repeat",

          backgroundSize: "cover,cover",
        }}
      >
        <div className="">
          <HomepageNavbar color="#FFFFFF" />
        </div>
        <div className="w-[100%] absolute top-[25%]  left-0 flex flex-col justify-start items-center gap-y-[20px] ">
          <h1
            className="text-[30px] add_sm:text-[40px] xmd:text-[50px] leading-[30px] add_sm:leading-[45px] xmd:leading-[62px] text-[#FFFFFF] font-[700] "
            style={{ fontFamily: "manRope" }}
          >
            {t("landingPage.service.Title")}
          </h1>
          <p className="text-[14px] add_sm:text-[18px] xmd:text-[22px] leading-[22px] add_sm:leading-[28px] xmd:leading-[30px] text-[#FFFFFF] font-[400] w-[80%] add_sm:w-[70%] xmd:w-[45%] text-center">
            {t("landingPage.service.Description")}
          </p>
        </div>
      </div>
      <div className="w-[95%] sm:w-[80%] table_md:w-[57%] min-[1600px]:w-[45%] flex flex-col justify-start items-center  gap-y-[20px] mt-[50px]">
        <h1 className="text-[26px] add_sm:text-[32px] xmd:text-[40px] leading-[20px] add_sm:leading-[24px] xmd:leading-[49px] text-[#1B1F29] font-[700]">
          {t("landingPage.service.Caption")}
        </h1>
        <p className="text-[14px] add_sm:text-[18px] xmd:text-[18px] leading-[20px] add_sm:leading-[24px] xmd:leading-[28px] text-[#1B1F29] font-[400]  text-center">
          {t("landingPage.service.Desc")}
        </p>
      </div>
      <div className="w-[95%] table_md:w-[80%] flex flex-col justify-start items-center mt-[50px] gap-y-[30px] add_sm:gap-y-[60px]">
        {content.map((data, index) => {
          return (
            <div
              className={`w-full flex ${
                index % 2 == 0
                  ? "flex-col add_sm:flex-row "
                  : "flex-col add_sm:flex-row-reverse"
              } justify-center items-start gap-x-[30px] gap-y-[10px] `}
              key={index}
            >
              <div className="add_sm:hidden">
                <div
                  className={` flex flex-row  items-center justify-start gap-x-[5px]  `}
                >
                  <div className="w-[22px] aspect-square relative ">
                    <Image
                      src={pngImages[index]}
                      fill
                      style={{ objectFit: "fill" }}
                      alt="document"
                    />
                  </div>
                  <p className="text-[13px] md:text-[16px] xmd:text-[18px] leading-[21px] md:leading-[22px] xmd:leading-[28px] font-[600] text-[#475569] ">
                    {" "}
                    {data.Title}
                  </p>
                </div>
                <h1 className="text-[20px] md:text-[24px] xmd:text-[30px] leading-[33px] md:leading-[36px]  xmd:leading-[45px] font-[700] text-[#090914] ">
                  {" "}
                  {data.Title}
                </h1>
              </div>
              <div className="w-[100%] aspect-[1/0.5] add_sm:w-[32%]  min-[1600px]:w-[28%] add_sm:aspect-square relative ">
                <Image
                  src={serviceImage[index]}
                  fill
                  style={{ objectFit: "fill" }}
                  alt="document"
                />
              </div>
              <div
                className={`w-[100%] add_sm:w-[50%] min-[1700px]:w-[40%] flex flex-col justify-start ${
                  index % 2 == 0 ? "items-start" : "items-end"
                } `}
              >
                <div
                  className={`hidden add_sm:flex flex-col justify-start ${
                    index % 2 == 0 ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`flex flex-row  items-center justify-start gap-x-[5px]  `}
                  >
                    <div className="w-[22px] aspect-square relative ">
                      <Image
                        src={pngImages[index]}
                        fill
                        style={{ objectFit: "fill" }}
                        alt="document"
                      />
                    </div>
                    <p className="text-[13px] md:text-[16px] xmd:text-[18px] leading-[21px] md:leading-[22px] xmd:leading-[28px] font-[600] text-[#475569] ">
                      {" "}
                      {data.Title}
                    </p>
                  </div>
                  <h1 className="text-[20px] md:text-[24px] xmd:text-[30px] leading-[33px] md:leading-[36px]  xmd:leading-[45px] font-[700] text-[#090914] ">
                    {" "}
                    {data.Title}
                  </h1>
                </div>
                <div
                  className={`text-[13px] md:text-[18px] xmd:text-[21px] min-[1400px]:text-[24px] leading-[21px] md:leading-[22px] xmd:leading-[30px] min-[1400px]:leading-[36px] font-[400] text-[#606060] ${
                    router.locale == "en" ? "text-left" : "text-right"
                  } ${
                    index % 2 == 0
                      ? `${
                          router.locale == "en"
                            ? "add_sm:text-left"
                            : "add_sm:text-right"
                        } `
                      : `${
                          router.locale == "en"
                            ? "add_sm:text-right"
                            : "add_sm:text-left"
                        }`
                  }`}
                >
                  {data.Content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
Service.displayName = "Service";
export default Service;

// <div className="hidden min-[1300px]:block relative w-[526px] h-[580px] ">
// <Image src={Truck} fill alt="truck" />
// </div>
// <div className="flex-1">
// <p className="text-[30px] text-[#121212] font-[500] leading-[50px] ">
//   {t("landingPage.service.Title")}
// </p>
// <div className="mt-[20px] flex flex-col justify-start items-start  gap-y-[50px]">
//   {content.map((data, index) => {
//     return (
//       <div
//         key={index}
//         className="flex flex-row justify-start items-start gap-[10px] "
//       >
//         <div className="relative w-[20px] h-[20px] ">
//           <Image src={pngImages[index]} alt="cloud" fill />
//         </div>

//         <p className="flex-1 -mt-[5px] text-[16px] text-[ #18181B] font-[400] leading-[28px]  ">
//           <span className="text-[18px] text-[#090914] font-[600] leading-[28px]">
//             {data.Title}
//           </span>
//           {data.Content}
//         </p>
//       </div>
//     );
//   })}
// </div>
// </div>
