import React from "react";
import Image from "next/image";
const BlankPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center w-full ">
      <div className="relative h-[221px] w-[322px] ">
        <Image
          src="/noorder.png"
          fill
          style={{ objectFit: "contain" }}
          alt="happy"
        />
      </div>
      <div className=" w-[375px] h-[122px] text-[21px] text-[#8794AD] font-[600] leading-[33px] mt-[20px] text-center ">
        Oops, there are no orders on your list yet...
        <br />
      </div>
    </div>
  );
};

export default BlankPage;
