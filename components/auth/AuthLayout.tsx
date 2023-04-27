import Image from "next/image";
import React from "react";
import img from "../../public/loginImage.png";
import { useRouter } from "next/router";

const AuthLayout = (props: any) => {
    const router = useRouter();
    const { locale } = router;
    return (
        <div className="flex h-screen w-screen overflow-y-auto ">
            <div className="hidden md:block w-[30%] h-[100vh] fixed ">
                <Image src={img} alt={"maz gate banner"} fill />
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
            </div>
            <div
                className={`flex flex-1 justify-center items-start ${
                    locale == "en" ? "md:ml-[30%]" : "md:mr-[30%]"
                }  pt-10 `}
            >
                <div className="w-[300px] sm:w-[65%] xmd:w-[47%] space-y-[20px] flex flex-col justify-start items-center md:items-start ">
                    {" "}
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
