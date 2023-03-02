import React from "react";
import Image from "next/image";
import WhiteLogo from "../../public/whiteLogo.png";
import Instagram from "../../public/instagram.png";
import Facebook from "../../public/facebook.png";
import Youtube from "../../public/youtube.png";
import Linkedin from "../../public/linkedin.png";
import Twitter from "../../public/twitter.png";

const media_type1 = [
  { url: Instagram, label: "Instagram" },
  { url: Facebook, label: "Facebook" },
  { url: Youtube, label: "YouTube" },
];
const media_type2 = [
  { url: Linkedin, label: "LinkedIn" },
  { url: Twitter, label: "Twitter" },
];

const Footer = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      className="h-[396px] bg-[#2B2B2B] mt-[100px] px-[120px] py-[70px] space-y-[50px]"
      ref={ref}
    >
      <div className="flex-type2">
        <div className="flex-1 flex-type6 space-y-[20px] ">
          <div className="flex-type1 space-x-[20px]">
            <div className="relative h-[47px] w-[47px] ">
              <Image src={WhiteLogo} fill alt="logo" />
            </div>
            <h1 className="text-[20px] text-[#FFFFFF] font-[700] leading-[30px] ">
              MAZ Express
            </h1>
          </div>
          <div className="w-[70%] flex-type4 text-[14px] text-[#BFB8AF] font-[400] leading-[21px] ">
            <ul className="space-y-[15px]">
              <li className="cursor-pointer">Tracking</li>
              <li className="cursor-pointer">Shipping</li>
              <li className="cursor-pointer">Help & Support</li>
            </ul>
            <ul className="space-y-[15px]">
              <li className="cursor-pointer">About Us</li>
              <li className="cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="flex-1 flex-type6 space-y-[20px]">
          <h1 className="text-[20px] text-[#FFFFFF] font-[700] leading-[30px] ">
            Connect with Us
          </h1>
          <div className="w-[70%] flex-type4 text-[14px] text-[#BFB8AF] font-[400] leading-[21px] ">
            <ul className="space-y-[15px]">
              {media_type1.map((data, index) => {
                return (
                  <div className="flex-type1 cursor-pointer" key={index}>
                    <div className="relative h-[20px] w-[20px] ">
                      <Image src={data.url} fill alt="logo" />
                    </div>
                    <div className="ml-[5px]">{data.label}</div>
                  </div>
                );
              })}
            </ul>
            <ul className="space-y-[15px]">
              {media_type2.map((data, index) => {
                return (
                  <div className="flex-type1 cursor-pointer" key={index}>
                    <div className="relative h-[20px] w-[20px] ">
                      <Image src={data.url} fill alt="logo" />
                    </div>
                    <div className="ml-[5px]">{data.label}</div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div>
        Copyright ©1994- 2023 United Parcel Service of America, Inc. All rights
        reserved.
      </div>
    </div>
  );
});

Footer.displayName = "Footer";
export default Footer;
