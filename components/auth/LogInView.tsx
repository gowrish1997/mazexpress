import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { useRouter } from "next/router";
import { createToast } from "@/lib/toasts";
import Image from "next/dist/client/image";
import google_logo from "@/public/google.png";
import useUser from "@/lib/hooks/useUser";
import fetchSelf, { FetchError } from "@/lib/fetchSelf";
import { useTranslation } from "next-i18next";
import logo from "../../public/new_logo_blue.png";
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

  const inputFieldLabel: string[] = t("loginView.form.InputField", {
    returnObjects: true,
  });
  const inputFieldErrors: string[] = t("loginView.form.Errors", {
    returnObjects: true,
  });
  const submitButtons: string[] = t("loginView.form.SubmitButton", {
    returnObjects: true,
  });
  const discription: string[] = t("loginView.form.Discription", {
    returnObjects: true,
  });

  const { user, mutateUser } = useUser({ redirectIfFound: true });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // console.log(data);
      const response = await fetchSelf("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // console.log(response);

      if (response.data) {
        // console.log(response.data);
        // createToast({
        //   type: "success",
        //   message: `You are now logged in ${response.data.first_name} ${response.data.last_name}`,
        //   title: "Success",
        //   timeOut: 1000,
        // });
        if (response.data.is_admin) {
          router.push("/admin");
        } else {
          router.push("/");
        }

        await mutateUser(response.data, false);
      } else {
        createToast({
          type: "error",
          message: response.msg,
          title: "Error",
          timeOut: 2000,
        });
      }
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
        createToast({
          type: "error",
          message: "Incorrect login credentials",
          title: "Login failed",
          timeOut: 2000,
        });
      } else {
        console.error("An unexpected error happened:", error);
      }
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

  // useEffect(() => {
  //   console.log()
  // })

  return (
    <div
      className={`w-[300px] sm:w-[60%] xmd:w-[47%] space-y-[20px] flex flex-col justify-start items-center md:items-start ${
        locale == "en" ? "md:-ml-[20%]" : "md:-mr-[20%]"
      } `}
    >
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
        <ReactHookFormInput
          label={inputFieldLabel[0]}
          name="username"
          type="string"
          register={register("username")}
          error={errors.username}
        />

        <ReactHookFormInput
          label={inputFieldLabel[1]}
          name="password"
          type={passwordType}
          icon={{
            isEnabled: true,
            src: passwordType === 'password' ?  "/eyeIconOpen.png" : "/eyeIconClose.png",
            onClick: togglePasswordTypeHandler,
          }}
          register={register("password")}

          // error={errors.password?.message && inputFieldErrors[1]}
        />
        <button
          className="text-[14px] text-[#3672DF] font-[500] leading-[13px] cursor-pointer"
          onClick={() => props.switch(2)}
        >
          {inputFieldLabel[2]}
        </button>
        <button
          type="submit"
          className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] "
        >
          {submitButtons[0]}
        </button>
        <div className="w-full text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[16px] ">
          <p>
            {discription[0]}{" "}
            <span className="text-[#0057FF]">{discription[1]}</span>
          </p>
          <p className="">
            {discription[2]}
            <span
              className="text-[#0057FF] cursor-pointer"
              onClick={() => props.switch(0)}
            >
              {discription[3]}
            </span>
          </p>
        </div>
      </form>

      {/* <LogInWithMail /> */}
    </div>
  );
};

export default LogInComponent;
