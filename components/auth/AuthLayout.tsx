import Image from "next/image";
import React from "react";
import img from "../../public/homePic.png";

const AuthLayout = (props: any) => {
  return (
    <div className="flex h-screen w-screen overflow-y-auto ">
      <div className="w-[450px] h-[100vh] fixed ">
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
      <div className="flex flex-1 items-start ml-[40%] pt-10 ">
        {props.children}
      </div>
    </div>
  );
};

export default AuthLayout;
