import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../../../public/logo.png'


const Header = () => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="px-6 py-6">
      <div className="flex items-center">
        <Link href={"/"} passHref>
          <div className="flex items-center cursor-pointer">
            <div className="relative w-[47px] h-[47px]">
              <Image
                priority={true}
                src={logo}
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
