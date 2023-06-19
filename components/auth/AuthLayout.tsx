import Image from "next/image";
import React from "react";
import img from "../../public/loginImage.png";
import { useRouter } from "next/router";
import New_logo_white from "@/public/new_logo_white.png";

const AuthLayout = (props: any) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <div
      className="flex h-screen w-screen overflow-y-auto max-[800px]:bg-[url('/signin.png')] "
      style={{
        backgroundPosition: "center center,",
        backgroundRepeat: "no-repeat",

        backgroundSize: "cover",
      }}
    >
      <div
        className="hidden md:flex flex-row justify-center items-center w-[100%] md:w-[45%] min-[900px]:w-[40%]  xmd:w-[35%] h-[100vh] fixed  "
        style={{
          backgroundImage: `url('/signin.png')`,
          backgroundPosition: "center center,",
          backgroundRepeat: "no-repeat",

          backgroundSize: "cover",
        }}
      >
        {/* <Image src={img} alt={"maz gate banner"} fill /> */}
        {/* <Image
          src={"/homePic.png"}
          alt={"maz gate banner"}
          width={500}
          height={500}
        //   loader={loaderProp}
          onError={(e) => {
            console.log(e);
          }}
        /> */}
        <div className="hidden md:block absolute top-[30%]  ">
          <div className="h-[74px] w-[105px]  relative ">
            <Image src={New_logo_white} fill alt="document" />
          </div>
          {/* <div className="relative h-[47px] w-[60px] ">
                <Image src={New_logo} fill alt="logo" />
              </div> */}
          <p className={` text-[25px] font-[800] `}>Express</p>
        </div>
      </div>
      <div
        className={`flex flex-1 justify-center items-start ${
          locale == "en"
            ? "md:ml-[40%] min-[900px]:ml-[32%] "
            : "md:mr-[40%] min-[900px]:mr-[32%]"
        }  pt-10 `}
      >
        <div className="w-[90%] sm:w-[60%] md:w-[70%] min-[900px]:w-[55%] xmd:w-[47%] space-y-[20px] flex flex-col justify-start items-center md:items-start  bg-white max-[800px]:p-[30px] rounded-[6px] ">
          {" "}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
