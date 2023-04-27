import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/new_logo_blue.png";
import LogInWithMail from "./LogInWithMail";
import SignUpContent from "./SignUpContent";

const SignUpComponent = (props: any) => {
    console.log(props);

    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;

    return (
        <>
            <h1
                className={`hidden md:block text-[26px] text-[#000000] font-[600] leading-[36px]  `}
            >
                {t("signUpView.Title")}
            </h1>
            <div className="w-full md:hidden flex flex-row justify-center items-baseline gap-x-[10px] ">
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
