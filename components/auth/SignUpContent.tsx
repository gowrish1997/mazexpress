import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import {
  admin_registerBodyContent,
  user_registerBodyContet,
} from "@/lib/emailContent/bodyContent";
import { useEffect } from "react";
import fetchServer from "@/lib/fetchServer";
import { sentMail } from "@/lib/sentMail";
import { createToast } from "@/lib/toasts";
import { Address } from "@/models/address.model";
import { User } from "@/models/user.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import CustomDropdown from "../LandingPage/CustomDropdown";
import { get } from "http";
import Link from "next/link";

const schema = yup
  .object({
    user: yup.object({
      first_name: yup.string().required("First name is required field"),
      last_name: yup.string().required("Last name is required field"),
      age: yup.string().required("Age is required field"),
      gender: yup.string().required("Gender is required field"),
      email: yup
        .string()
        .required("Email is required field")
        .email("Please provide valid email"),
      phone: yup
        .number()
        .min(0, "Number must be greater than zero")
        // .test(
        //   "len",
        //   "Must be exactly 10 digits",
        //   (val) => val?.toString().length === 10
        // )
        .required()
        .typeError("Mobile number is required field"),
      password: yup
        // .string()
        // .min(8, "Password must be 8 characters long")
        // .matches(/[0-9]/, "Password requires a number")
        // .matches(/[a-z]/, "Password requires a lowercase letter")
        // .matches(/[A-Z]/, "Password requires an uppercase letter")
        // .matches(/[^\w]/, "Password requires a symbol"),
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
          excludeEmptyString: true,
          message:
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        }),
    }),
    addr: yup.object({
      city: yup.string().required("City is required field"),
      address_1: yup.string(),
    }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("user.password")], "Passwords must match")
      .required()
      .typeError("Confirm Password is required field"),
  })
  .required();

interface IProp {
  switch?: (i: number) => void;
  type: string;
  close?: () => void;
}

const SignUpContent = (props: IProp) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;
  interface ISignupForm {
    user: User;
    addr: Address;
    confirmPassword: string;
  }

  const inputFieldLabel: string[] = t("signUpView.form.InputField", {
    returnObjects: true,
  });
  const inputFieldErrors: string[] = t("signUpView.form.Errors", {
    returnObjects: true,
  });
  const submitButtons: string[] = t("signUpView.form.SubmitButton", {
    returnObjects: true,
  });
  const discription: string[] = t("signUpView.form.Discription", {
    returnObjects: true,
  });
  const genderOption: { value: string; label: string }[] = t(
    "signUpView.form.GenderOptions",
    { returnObjects: true }
  );
  const cityOption: { value: string; label: string }[] = t(
    "addNewOrderPage.addressForm.CityOptions",
    { returnObjects: true }
  );

  const [errorMsg, setErrorMsg] = useState("");
  const [terms, setTerms] = useState(true);

  const termsAndConditionHandler = (e) => {
    setTerms((prev) => {
      if (prev) {
        return false;
      } else {
        setErrorMsg("");
        return true;
      }
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<ISignupForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    if (isButtonDisabled) {
      return; // Exit early if the button is already disabled
    }

    setIsButtonDisabled(true);

    if (props.type == "signUp" && !terms) {
      setErrorMsg("Please accept terms and condition");
      return;
    }

    if (props.type == "admin") {
      data.user.is_admin = true;
    }
    const toList = [
      {
        type: "register",
        toType: "admin",
        header: "New User joined ✨",
        toName: "admin",
        bodyContent: admin_registerBodyContent(),
        userName: data.user.first_name + " " + data.user.last_name,
        userProfile: data.user.avatar_url,
        userContactNumber: data.user.phone,
        userEmail: data.user.email,
      },
      {
        type: "register",
        toType: "user",
        header: "Welcome to Maz Express",
        toName: data.user.first_name + " " + data.user.last_name,
        toMail: data.user.email,
        bodyContent: user_registerBodyContet(),
        buttonContent: "Let’s Get Started",
        redirectLink: `${
          process.env.NODE_ENV !== "production"
            ? "http://localhost:3000/auth/gate?mode=1"
            : "https://mazexpress.com.ly/auth/gate?mode=1"
        }`,
      },
    ];
    try {
      const userResult = await fetchServer("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.user),
      });

      if (userResult.ok === true) {
        // toast
        if (props.type == "admin") {
          createToast({
            type: "success",
            title: "Success",
            message: "New admin added successfully",
            timeOut: 3000,
          });
        } else {
          createToast({
            type: "success",
            title: "your registration has been successfully completed",
            message: "Please log in with your login credentials",
            timeOut: 3000,
          });
        }

        /**    sending mail after signup  */

        try {
          sentMail(toList);
        } catch (error) {
          console.error(error);
        }

        // send to login page with cred
        props.switch?.(1);
      } else {
        // toast
        createToast({
          type: "error",
          title: "Sign up failed.",
          message: "Please try again.",
          timeOut: 3000,
        });
      }
      props.close?.();
    } catch (error) {
      // console.error(error.message);
      createToast({
        type: "error",
        title: (error as Error).message as string,
        message: "Please try with different email",
        timeOut: 3000,
      });
    }
    setIsButtonDisabled(false);
  };

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const togglePasswordTypeHandler = () => {
    console.log("passwortype handler");
    if (passwordType == "string") {
      setPasswordType("password");
    } else {
      setPasswordType("string");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-type6 h-full w-full gap-y-[10px] "
    >
      <div className="flex-type2 gap-x-[10px] w-full">
        <Controller
          name="user.first_name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ReactHookFormInput
              label={inputFieldLabel[0]}
              name="user.first_name"
              type="string"
              onChange={onChange}
              value={value}
              error={errors.user?.first_name && inputFieldErrors[0]}
            />
          )}
        />

        <Controller
          name="user.last_name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ReactHookFormInput
              label={inputFieldLabel[1]}
              name="user.last_name"
              value={value}
              onChange={onChange}
              type="string"
              error={errors.user?.last_name && inputFieldErrors[1]}
            />
          )}
        />
      </div>
      <div className="flex-type2 gap-x-[10px] w-full">
        <Controller
          name="user.age"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ReactHookFormInput
              label={inputFieldLabel[2]}
              name="user.age"
              value={value!}
              onChange={onChange}
              type="string"
              error={errors.user?.age && inputFieldErrors[2]}
            />
          )}
        />

        <CustomDropdown
          label={inputFieldLabel[3]}
          name="user.gender"
          type="string"
          IconEnabled={true}
          error={errors.user?.gender?.message}
          value={getValues("user.gender")}
          setValue={setValue}
          options={genderOption}
          disabled={true}
        />
      </div>
      <Controller
        name="user.email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactHookFormInput
            label={inputFieldLabel[4]}
            name="user.email"
            type="string"
            value={value!}
            onChange={onChange}
            error={errors.user?.email && inputFieldErrors[4]}
          />
        )}
      />
      <Controller
        name="user.phone"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactHookFormInput
            label={inputFieldLabel[5]}
            name="user.phone"
            type="number"
            value={value}
            onChange={onChange}
            error={errors.user?.phone && inputFieldErrors[5]}
          />
        )}
      />
      <CustomDropdown
        label={inputFieldLabel[12]}
        name="addr.city"
        type="string"
        IconEnabled={true}
        register={register("addr.city")}
        error={errors.addr?.city?.message}
        value={getValues("addr.city")}
        setValue={setValue}
        options={cityOption}
        disabled={true}
      />
      <Controller
        name="user.password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactHookFormInput
            label={inputFieldLabel[6]}
            name="user.password"
            value={value}
            onChange={onChange}
            type={passwordType}
            error={errors.user?.password && inputFieldErrors[6]}
            icon={{
              isEnabled: true,
              src:
                passwordType === "string"
                  ? "/eyeIconOpen.png"
                  : "/eyeIconClose.png",
            }}
            onClick={togglePasswordTypeHandler}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactHookFormInput
            label={inputFieldLabel[7]}
            value={value!}
            onChange={onChange}
            name="confirmPassword"
            type="password"
            error={errors.confirmPassword && inputFieldErrors[7]}
            // icon={{
            //   isEnabled: true,
            //   src:
            //     confirmPasswordType === "string"
            //       ? "/eyeIconOpen.png"
            //       : "/eyeIconClose.png",
            // }}
            // onClick={toggleConfirmPasswordTypeHandler}
          />
        )}
      />

      {/* <ReactHookFormInput
                label={inputFieldLabel[8]}
                name="addr.tag"
                type="string"
                register={register("addr.tag")}
                error={errors.addr?.tag}
            /> */}

      <div className="flex-type2 gap-x-[10px] w-full">
        <ReactHookFormInput
          label={inputFieldLabel[9]}
          name="addr.address_1"
          type="string"
          register={register("addr.address_1")}
          error={errors.addr?.address_1}
        />

        {/* <ReactHookFormInput
                    label={inputFieldLabel[10]}
                    name="addr.address_2"
                    type="string"
                    register={register("addr.address_2")}
                    error={errors.addr?.address_2}
                /> */}
      </div>
      <div className="flex-type2 gap-x-[10px] w-full">
        {/* <ReactHookFormInput
                    label={inputFieldLabel[11]}
                    name="addr.phone"
                    type="string"
                    register={register("addr.phone")}
                    error={errors.addr?.phone}
                /> */}
      </div>
      {props.type == "signUp" ? (
        <>
          {" "}
          <div className="flex flex-row justify-center items-center gap-x-[5px] ">
            <input
              type="radio"
              checked={terms}
              onClick={termsAndConditionHandler}
            />

            <a href="/TermsAndCondition" target="_blank">
              <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[13px]">
                {discription[0]}{" "}
                <span
                  className="text-[#0057FF] cursor-pointer"
                  // onClick={termsAndConditionRedirectHandler}
                >
                  {discription[1]}
                </span>
              </p>
            </a>
          </div>
          <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
            {errorMsg}
          </p>
        </>
      ) : (
        <></>
      )}
      {props.type == "signUp" ? (
        <button
          type="submit"
          className="relative w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] disabled:bg-[#35C6F4]/50 "
          disabled={isButtonDisabled}
        >
          {isButtonDisabled && (
            <div className="absolute top-0 left-0 w-full h-full flex justify-center ">
              <div className="w-[20px] h-[20px] border-[1px] border-white animate-spin rounded-full " />
            </div>
          )}

          {submitButtons[0]}
        </button>
      ) : (
        <div className="w-full flex flex-row justify-between  items-center">
          <button
            type="submit"
            className="relative h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] px-[15px] disabled:bg-[#35C6F4]/50 "
          >
            {isButtonDisabled && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
                <div className="w-[20px] h-[20px] border-[1px] border-white animate-spin rounded-full " />
              </div>
            )}
            Create Admin
          </button>
          <button
            type="submit"
            className=" h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] px-[15px] "
            onClick={() => props?.close?.()}
          >
            Cancel
          </button>
        </div>
      )}

      {props.type == "signUp" && (
        <div className="text-center w-full text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
          <p>
            {discription[2]}
            <span
              className="text-[#0057FF] cursor-pointer"
              onClick={() => props.switch?.(1)}
            >
              {discription[3]}
            </span>
          </p>
        </div>
      )}
    </form>
  );
};

export default SignUpContent;
