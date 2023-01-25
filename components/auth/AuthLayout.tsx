import Image from "next/image";
import React from "react";

const AuthLayout = (props: any) => {
  return (
    <div className="flex h-screen w-screen">
      <div className="relative w-[40%] h-[100vh]">
        <Image src={"/homePic.png"} alt={"maz gate banner"} layout='fill' objectFit="cover" />
      </div>
      {props.children}
    </div>
  );
};

export default AuthLayout;
