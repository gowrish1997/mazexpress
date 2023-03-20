import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/new_logo_blue.png";

const Header = () => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="px-6 py-6">
      <div className="flex items-center">
        <Link href={"/"} passHref>
          <div className="flex items-center cursor-pointer pl-[10px]">
            <div className="relative w-[60px] h-[60px]  ">
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
            </div>
            {/* <h3 className="font-semibold ml-4 font-[500] text-[20px]">Management</h3> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
