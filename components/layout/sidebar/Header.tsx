import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/new_logo_blue.png";
import New_logo from "@/public/new_logo_blue.png";

const Header = () => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="px-6 py-6">
      <div className="flex items-center">
        <Link href={"/"} passHref>
          <div className="flex items-center cursor-pointer ">
            {/* <div className="relative w-[60px] h-[60px]  ">
              <Image
                priority={true}
                src={Logo}
                fill
                style={{ objectFit: "contain" }}
                alt="logo"
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                onError={() => setImageError(true)}
              />
            </div> */}
            <div className="flex flex-col justify-start items-start gap-x-[7px] ">
              <div className="relative h-[47px] w-[70px] ">
                <Image src={New_logo} fill alt="logo" />
              </div>
              <p className="text-[#143055] tracking-[3px] text-[17px] font-[800] ">
                express
              </p>
            </div>
            {/* <h3 className="font-semibold ml-4 font-[500] text-[20px]">Management</h3> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
