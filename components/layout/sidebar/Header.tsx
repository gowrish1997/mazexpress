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
            <div className="relative w-[47px] h-[47px]">
              <Image
                src="/logo.png"
                layout="fill"
                objectFit="contain"
                alt="logo"
              />
            </div>
            {/* <h3 className="font-semibold ml-4 font-[500] text-[20px]">Management</h3> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
