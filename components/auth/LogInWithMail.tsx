import React from "react";
import Image from "next/image";
import google from "../../public/google.png";
import mail from "../../public/mail.png";
const LogInWithMail = () => {
    return (
        <div className="space-y-[10px] text-[14px] font-[500] leading-[19px]">
            <button type="submit" className=" w-full h-[46px] bg-[#3672DF] rounded-[4px] text-[#FFFFFF]">
                <div className="flex flex-row justify-center items-center space-x-[10px]  ">
                    <Image src={mail} width={22} height={18} alt="google" />
                    <span> Sign up using Email</span>
                </div>
            </button>
            <button type="submit" className="w-full h-[46px] border-[1px] border-[#BBC2CF] rounded-[4px] text-[#525D72]">
                <div className="flex flex-row justify-center items-center space-x-[10px] ">
                    <Image src={google} width={22} height={18} alt="mail" />
                    <span> Sign up using Google</span>
                </div>
            </button>
        </div>
    );
};

export default LogInWithMail;
