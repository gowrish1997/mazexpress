import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <div className="px-6 py-6">
      <div className="flex items-center">
        <Link href={"/"} passHref>
          <div className="flex items-center cursor-pointer">
            <div className="relative w-[32px] h-[32px]">
              {/* <Image  layout="fill" objectFit="contain" alt='logo' /> */}
            </div>
            <h3 className="font-semibold ml-4 font-[500] text-[20px]">
              Management
            </h3>
          </div>
        </Link>

        <div className="absolute top-6 -right-4 bg-[#FCFCFC] rounded-full w-7 h-7 shadow-md flex items-center justify-center z-1">
          <FontAwesomeIcon icon={faAngleLeft} size="xs" />
        </div>
      </div>
    </div>
  );
};

export default Header;