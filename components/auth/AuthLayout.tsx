import Image from "next/image";
import React from "react";
import img from "../../public/homePic.png";

// const loaderProp =({ src }: {src: string}) => {
//     return src;
// }

const AuthLayout = (props: any) => {
  return (
    <div className="flex h-screen w-screen">
      <div className="relative w-[450px] h-[100vh]">
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
      <div className="p-10 flex flex-1 items-center ml-[10%]">
        {props.children}
      </div>
    </div>
  );
};

export default AuthLayout;
