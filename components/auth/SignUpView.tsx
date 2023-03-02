import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { createToast } from "@/lib/toasts";
import { useRouter } from "next/router";
import { UserEntity, UserGender } from "@/lib/adapter/entities/UserEntity";
import axios, { AxiosResponse } from "axios";
import { APIResponse } from "@/models/api.model";

const schema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    age: yup.string().required("Age is required"),
    gender: yup.string().required("Gender is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("please include @ in the email"),
    phone: yup
      .number()
      .test(
        "len",
        "Must be exactly 10 digits",
        (val) => val?.toString().length === 9
      )
      .required()
      .typeError("Mobile numbder is required field"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required()
      .typeError("Password is required field"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required()
      .typeError("Confirm Password is required field"),
  })
  .required();

const SignUpComponent = (props: { switch: (i: number) => void }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEntity & { confirmPassword: string }>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "mohamed@maz.com",
      first_name: "mohamed",
      last_name: "ali",
      confirmPassword: "Test123$",
      password: "Test123$",
      phone: 123456789,
      age: "22",
      gender: UserGender.MALE,
    },
  });

  const onSubmit: SubmitHandler<
    UserEntity & { confirmPassword: string }
  > = async (data) => {
    // console.log(data);

    const newuser = new UserEntity();
    newuser.first_name = data.first_name;
    newuser.last_name = data.last_name;
    newuser.email = data.email;
    newuser.age = data.age;
    // newuser.gender = data.gender;
    newuser.phone = data.phone;
    newuser.password = data.password;
    const response: AxiosResponse<APIResponse<UserEntity>> = await axios.post(
      "/api/users",
      newuser,
      {
        method: "POST",
      }
    );
    console.log(response);
    if (response.statusText === "OK") {
      createToast({
        type: "success",
        title: "Created user",
        message: "Successfully created new user",
        timeOut: 2000,
      });
      // sign in user with new credentials
      props.switch(1);
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
            name="first_name"
            type="string"
            register={register("first_name")}
            error={errors.first_name}
          />

          <ReactHookFormInput
            label="Last name"
            name="last_name"
            type="string"
            register={register("last_name")}
            error={errors.last_name}
          />
        </div>
        <div className="flex-type2 space-x-[10px] w-full">
          <ReactHookFormInput
            label="Age"
            name="age"
            type="string"
            register={register("age")}
            error={errors.age}
          />

          <ReactHookFormInput
            label="Gender"
            name="gender"
            type="string"
            register={register("gender")}
            error={errors.gender}
          />
        </div>

        <ReactHookFormInput
          label="Email"
          name="email"
          type="string"
          register={register("email")}
          error={errors.email}
        />

        <ReactHookFormInput
          label="Mobile number"
          name="phone"
          type="number"
          register={register("phone")}
          error={errors.phone}
        />

        <ReactHookFormInput
          label="Password"
          name="password"
          type={passwordType}
          register={register("password")}
          error={errors.password}
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
          name="confirmPassword"
          type={confirmPasswordType}
          register={register("confirmPassword")}
          error={errors.confirmPassword}
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
          className="w-full h-[46px] rounded-[4px] text-[14px] border border-2 transition duration-300 hover:shadow-lg hover:ring hover:ring-black/70 text-[#BBC2CF] hover:text-black/70 font-[600] leading-[19px] mt-[10px]"
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
      {/* <LogInWithMail /> */}
    </div>
  );
};

export default SignUpComponent;
