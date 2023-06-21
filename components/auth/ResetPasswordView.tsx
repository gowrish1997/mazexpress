import ReactHookFormInput from "@/components/common/ReactHookFormInput";

import { user_passwordChangedContent } from "@/lib/emailContent/bodyContent";
import fetchJson from "@/lib/fetchServer";
import { sentMail } from "@/lib/sentMail";
import { createToast } from "@/lib/toasts";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import logo from "../../public/new_logo_blue.png";

type Inputs = {
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    password: yup.string(),
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //     {
    //       excludeEmptyString: true,
    //       message:
    //         "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    //     }
    //   ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required()
      .typeError("Confirm Password is required field"),
  })
  .required();

const ResetPasswordView = (props: any) => {
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
    try {
      const updateUserRes: APIResponse<User> = await fetchJson(
        `/api/users/${props.user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: data.confirmPassword }),
        }
      );

      if (updateUserRes.msg === "success") {
        const toList = [
          {
            type: "password_changed",
            toType: "user",
            header:
              "Your Maz Express Password has been changed successfully ✨",
            toName: props.user.first_name,
            toMail: props.user.email,
            bodyContent: user_passwordChangedContent(),
            buttonContent: "Login now",
            redirectLink: `${
              process.env.NODE_ENV !== "production"
                ? `http://localhost:3000/auth/gate?mode=1`
                : `https://${process.env.NEXT_PUBLIC_HOST}/auth/gate?mode=1`
            }`,
          },
        ];
        try {
          sentMail(toList);
        } catch (error) {
          console.error(error);
        }
        // done

        // destroy link
        const destroy = await fetchJson(
          `/api/magic-links/${props.user.email}`,
          {
            method: "DELETE",
          }
        );

        if (destroy)
          createToast({
            type: "success",
            message: "Changed password please log in.",
            timeOut: 2000,
            title: "success",
          });
      } else {
        // failed
        createToast({
          type: "error",
          message: "Password change failed contact dev.",
          timeOut: 2000,
          title: "Password update failed.",
        });
      }
      router.push("/auth/gate");
    } catch (error) {
      // errored
      console.error(error);
    }
  };

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const togglePasswordTypeHandler = () => {
    if (passwordType == "string") {
      setPasswordType("password");
    } else {
      setPasswordType("string");
    }
  };
  const toggleConfirmPasswordTypeHandler = () => {
    if (confirmPasswordType == "string") {
      setConfirmPasswordType("password");
    } else {
      setConfirmPasswordType("string");
    }
  };

  return (
    <>
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
          name="password"
          type={passwordType}
          register={register("password")}
          error={errors.password?.message && inputFieldErrors[0]}
          icon={{
            isEnabled: true,
            src:
              confirmPasswordType === "password"
                ? "/eyeIconClose.png"
                : "/eyeIconOpen.png",
          }}
          onClick={toggleConfirmPasswordTypeHandler}
        />

        <ReactHookFormInput
          label={inputFieldLabel[1]}
          name="confirmPassword"
          type="password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message && inputFieldErrors[1]}
        />

        <button
          type="submit"
          className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] "
        >
          {submitButtons[0]}
        </button>
        <div className="text-center w-full text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
          {/* <p>
            {discription[0]}{" "}
            <span className="text-[#0057FF]">{discription[1]}</span>
          </p> */}
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
    </>
  );
};

export default ResetPasswordView;
