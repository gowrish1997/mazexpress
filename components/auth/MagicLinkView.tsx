import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import logo from "../../public/new_logo_blue.png";
import { createToast } from "@/lib/toasts";
import fetchJson from "@/lib/fetchServer";

type Inputs = {
  email: string;
};

const schema = yup
  .object({
    email: yup.string(),
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //     {
    //       excludeEmptyString: true,
    //       message:
    //         "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    //     }
    //   ),
  })
  .required();

const MagicLinkView = (props: any) => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const inputFieldLabel: string[] = t("resetPasswordView.form.InputField", {
    returnObjects: true,
  });
  const inputFieldErrors: string[] = t("resetPasswordView.form.Errors", {
    returnObjects: true,
  });
  const submitButtons: string[] = t("resetPasswordView.form.SubmitButton", {
    returnObjects: true,
  });
  const discription: string[] = t("resetPasswordView.form.Description", {
    returnObjects: true,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // send magic link
    // console.log(data)
    try {
      // request for magic link creation
      const magicLink = await fetchJson(`/api/magic-links/${data.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (magicLink && magicLink.msg === "success") {
        createToast({
          type: "success",
          message: "please check your email for magic link.",
          title: "Magic link created.",
          timeOut: 2000,
        });
      }
      //
    } catch (err) {
      if (err) {
        createToast({
          type: "error",
          message: "password reset action failed...",
          title: "Error",
          timeOut: 2000,
        });
      }
    }
  };

  return (
    <div
      className={`w-[300px] sm:w-[60%] xmd:w-[47%] space-y-[20px] flex flex-col justify-start items-center md:items-start  ${
        locale == "en" ? "md:-ml-[20%]" : "md:-mr-[20%]"
      }`}
    >
      <h1
        className={`hidden md:block text-[26px] text-[#000000] font-[600] leading-[36px]  `}
      >
        {t("resetPasswordView.Title")}
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
          name="email"
          type={"string"}
          register={register("email")}
          error={errors.email?.message && inputFieldErrors[0]}
          onClick={() => {}}
        />

        <button
          type="submit"
          className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] "
        >
          {submitButtons[0]}
        </button>
        <div className="text-center w-full text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
          <p>
            {discription[0]}{" "}
            <span className="text-[#0057FF]">{discription[1]}</span>
          </p>
          <p>
            {discription[2]}
            <span
              className="text-[#0057FF] cursor-pointer"
              onClick={() => props.switch(1)}
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

export default MagicLinkView;
