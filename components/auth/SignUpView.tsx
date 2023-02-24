import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInWithMail from "./LogInWithMail";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { ISignUp } from "@/models/user.interface";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { createToast } from "@/lib/toasts";
import { useRouter } from "next/router";
import CusotmDropdown from "../LandingPage/CustomDropdown";

const schema = yup
  .object({
    first_name_users: yup.string().required("First name is required"),
    last_name_users: yup.string().required("Last name is required"),
    age_users: yup.string().required("Age is required"),
    gender_users: yup.string().required("Gender is required"),
    email_users: yup
      .string()
      .required("Email is required")
      .email("please include @ in the email"),
    phone_users: yup
      .number()
      .test(
        "len",
        "Must be exactly 10 digits",
        (val) => val?.toString().length === 10
      )
      .required()
      .typeError("Mobile numbder is required field"),
    password_users: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required()
      .typeError("Password is required field"),
    confirmPassword_users: yup
      .string()
      .oneOf([yup.ref("password_users")], "Passwords must match")
      .required()
      .typeError("Confirm Password is required field"),
  })
  .required();

const SignUpComponent = (props: any) => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ISignUp>({
    // resolver: yupResolver(schema),
    defaultValues: {
      //   age_users: "22",
      //   email_users: "mohamed@maz.com",
      //   first_name_users: "mohamed",
      //   gender_users: "m",
      //   last_name_users: "ali",
      //   confirmPassword_users: "Test123$",
      //   password_users: "Test123$",
      //   phone_users: 1234567890,
    },
  });

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    console.log(data);

    try {
      const result = await fetchJson("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      //   console.log(result); // id created

      // toast
      createToast({
        type: "success",
        title: "New user created.",
        message: "Please log in with your new login credentials",
        timeOut: 3000,
      });

      // send to login page with cred
      props.switch(1);
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const togglePasswordTypeHandler = () => {
    console.log('passwortype handler')
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
    <div className="w-[400px] space-y-[20px]">
      <h1 className="text-[26px] text-[#000000] font-[600] leading-[36px] text-left ">
        Sign up to get started
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-type6 gap-y-[10px] "
      >
        <div className="flex-type2 space-x-[10px] w-full">
          <ReactHookFormInput
            label="First name"
            name="first_name_users"
            type="string"
            register={register("first_name_users")}
            error={errors.first_name_users}
          />

          <ReactHookFormInput
            label="Last name"
            name="last_name_users"
            type="string"
            register={register("last_name_users")}
            error={errors.last_name_users}
          />
        </div>
        <div className="flex-type2 space-x-[10px] w-full">
          <ReactHookFormInput
            label="Age"
            name="age_users"
            type="string"
            register={register("age_users")}
            error={errors.age_users}
          />
{/* 
          <ReactHookFormInput
            label="Gender"
            name="gender_users"
            type="string"
            register={register("gender_users")}
            error={errors.gender_users}
          /> */}
          <CusotmDropdown
           label="Gender"
           name="gender_users"
           type="string"
           IconEnabled={true}
           register={register("gender_users")}
           error={errors.gender_users}
           value={getValues("gender_users")}
           setValue={setValue}
           options={[
            { value: "m", label: "Male" },
            { value: "f", label: "Female" },
            { value: "u", label: "Unknown" },
            { value: "o", label: "Other" }

        ]}
        disabled={true}
          />
        </div>

        <ReactHookFormInput
          label="Email"
          name="email_users"
          type="string"
          register={register("email_users")}
          error={errors.email_users}
        />

        <ReactHookFormInput
          label="Mobile number"
          name="phone_users"
          type="number"
          register={register("phone_users")}
          error={errors.phone_users}
        />

        <ReactHookFormInput
          label="Password"
          name="password_users"
          type={passwordType}
          register={register("password_users")}
          error={errors.password_users}
          icon={{
            isEnabled: true,
            src:
              passwordType === "string"
                ? "/eyeIconOpen.png"
                : "/eyeIconClose.png",
          }}
          onClick={togglePasswordTypeHandler}
        />

        <ReactHookFormInput
          label="Confirm Password"
          name="confirmPassword_users"
          type={confirmPasswordType}
          register={register("confirmPassword_users")}
          error={errors.confirmPassword_users}
          icon={{
            isEnabled: true,
            src:
              confirmPasswordType === "string"
                ? "/eyeIconOpen.png"
                : "/eyeIconClose.png",
          }}
          onClick={toggleConfirmPasswordTypeHandler}
        />

        <button
          type="submit"
          className="w-full h-[46px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
        >
          Sign Up
        </button>
      </form>
      <div className="text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
        <p>
          By signing up, you agree to our{" "}
          <span className="text-[#0057FF]">Terms of Service.</span>
        </p>
        <p>
          Already have an account?{" "}
          <span
            className="text-[#0057FF] cursor-pointer"
            onClick={() => props.switch(1)}
          >
            Log in.
          </span>
        </p>
      </div>
      <LogInWithMail />
    </div>
  );
};

export default SignUpComponent;
