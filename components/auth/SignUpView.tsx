import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/new_logo_blue.png";
import LogInWithMail from "./LogInWithMail";
import SignUpContent from "./SignUpContent";
import Home from "@/public/backHome.png";
import Back from "@/public/back.png";

const SignUpComponent = (props: any) => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;

  return (
    <>
      <div
        className="hidden md:flex flex-row justify-start items-center gap-x-[5px] cursor-pointer -mb-[10px] "
        onClick={() => router.push("/")}
      >
        <div className="relative h-[10px] w-[15px]   ">
          <Image src={Back} fill alt="backHome" />
        </div>
        <div className="relative h-[20px] w-[20px]  ">
          <Image src={Home} fill alt="backHome" />
        </div>
      </div>

      <h1
        className={`hidden md:block text-[26px] text-[#000000] font-[600] leading-[36px]`}
      >
        {t("signUpView.Title")}
      </h1>
      <div
        className="w-full md:hidden flex flex-row justify-center items-baseline gap-x-[10px] cursor-pointer "
        onClick={() => router.push("/")}
      >
        <div className="h-[60px] w-[60px] relative">
          <Image src={logo} fill alt="logo" />
        </div>
        <h1
          className={` text-[26px] text-[#35C6F4] font-[900] leading-[36px]  `}
        >
          EXPRESS
        </h1>
      </div>
      <h1
        className={`md:hidden text-center text-[20px] text-[#000000] font-[600] leading-[36px] `}
      >
        {t("signUpView.MobileViewTitle")}
      </h1>
      <SignUpContent switch={props.switch} type="signUp" />
      <LogInWithMail />
    </>
  );
};

export default SignUpComponent;
