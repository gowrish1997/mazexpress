import React from "react";
import Image from "next/image";
import google from "../../public/google.png";
import mail from "../../public/mail.png";
import { useTranslation } from "next-i18next";
const LogInWithMail = () => {
    const { t } = useTranslation("");
    const submitButtons: string[] = t("signUpView.form.SubmitButton", { returnObjects: true });

    return (
        <div className="w-full box-border space-y-[10px] text-[14px] font-[500] leading-[19px]">
            {/* <button type="submit" className=" w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#3672DF] rounded-[4px] text-[#FFFFFF]">
                <div className="flex flex-row justify-center items-center gap-x-[10px]  ">
                    <Image src={mail} width={22} height={18} alt="google" />
                    <span> {submitButtons[1]}</span>
                </div>
            </button> */}
            <button type="submit" className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] border-[1px] border-[#BBC2CF] rounded-[4px] text-[#525D72]">
                <div className="flex flex-row justify-center items-center gap-x-[10px] ">
                    <Image src={google} width={22} height={18} alt="mail" />
                    <span> {submitButtons[2]}</span>
                </div>
            </button>
        </div>
    );
};

export default LogInWithMail;
