import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { createToast } from "@/lib/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/dist/client/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import logo from "../../public/new_logo_blue.png";
import LogInWithMail from "./LogInWithMail";
type Inputs = {
  password: string;
  username: string;
};

const schema = yup
  .object({
    username: yup
      .string()
      .required("Email is required")
      .email("please include @ in the email"),
    password: yup.string().required("Password is required field"),
  })
  .required();
const LogInComponent = (props: any) => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;
  const [errorMsg, setErrorMsg] = useState("");
  // const jet: AuthManager = useContext(AuthCTX)["jet"];
  // const { status: googleStatus } = useGoogle({});

  const inputFieldLabel: string[] = t("loginView.form.InputField", {
    returnObjects: true,
  });
  const inputFieldErrors: string[] = t("loginView.form.Errors", {
    returnObjects: true,
  });
  const submitButtons: string[] = t("loginView.form.SubmitButton", {
    returnObjects: true,
  });
  const description: string[] = t("loginView.form.Description", {
    returnObjects: true,
  });

  // const user: IWhiteListedUser = useContext(AuthCTX)["active_user"];
  // const { set_active_user } = useContext(AuthCTX);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const returnDate = await signIn("credentials", {
        username: data.username,
        password: data.password,

        callbackUrl: `${
          process.env.NODE_ENV !== "production"
            ? `http://localhost:3000/`
            : `https://${process.env.NEXT_PUBLIC_HOST}/`
        }`,
        redirect: false,
      });
      if (returnDate.ok) {
        router.push(returnDate.url);
      } else {
        throw new Error(returnDate.error);
      }
    } catch (error) {
      console.log(error);
      createToast({
        type: "error",
        message: (error as Error).message,
        title: "Error",
        timeOut: 2000,
      });
    }
  };

  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordTypeHandler = () => {
    if (passwordType === "string") {
      setPasswordType("password");
    } else {
      setPasswordType("string");
    }
  };

  return (
    <>
      <h1
        className={`hidden md:block text-[26px] text-[#000000] font-[600] leading-[36px]  `}
      >
        {t("loginView.Title")}
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
        {" "}
        {t("signUpView.MobileViewTitle")}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex-type6 gap-y-[12px] "
      >
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ReactHookFormInput
              value={value}
              onChange={onChange}
              label={inputFieldLabel[0]}
              name="username"
              type="string"
              error={errors.username && inputFieldErrors[0]}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ReactHookFormInput
              label={inputFieldLabel[1]}
              name="password"
              value={value}
              onChange={onChange}
              type={passwordType}
              icon={{
                isEnabled: true,
                src:
                  passwordType === "password"
                    ? "/eyeIconClose.png"
                    : "/eyeIconOpen.png",
              }}
              onClick={togglePasswordTypeHandler}
              error={errors.password?.message && inputFieldErrors[1]}
            />
          )}
        />

        <div className="flex flex-col items-center w-full space-x-[10px]">
          <button
            type="submit"
            className="w-full h-[40px] py-[2px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px]"
          >
            {submitButtons[0]}
          </button>
          {/* <LogInWithMail /> */}
        </div>
        <button
          className="text-[14px] text-[#35C6F4] font-[500] leading-[13px] cursor-pointer"
          onClick={() => props.switch(2)}
        >
          {inputFieldLabel[2]}
        </button>
        <div className="w-full text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[16px] ">
          <p className="">
            {description[2]}
            <span
              className="text-[#0057FF] cursor-pointer"
              onClick={() => props.switch(0)}
            >
              {description[3]}
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default LogInComponent;
