import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInWithMail from "./LogInWithMail";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import axios from "axios";
import { useRouter } from "next/router";
type Inputs = {
  password: string;
  email: string;
};
const LogInComponent = (props: any) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data)
    axios({
      method: 'POST',
      url: '/api/auth/login',
      data: data
    })
    .then(response => {
      console.log(response.data)
      // redirect to dash
      router.push('/')
    })
  };

  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordTypeHandler = () => {
    if (passwordType == "string") {
      setPasswordType("password");
    } else {
      setPasswordType("string");
    }
  };

  return (
    <div className="w-[400px] space-y-[20px] ">
      <h1 className="text-[26px] text-[#000000] font-[600] leading-[36px] text-left ">
        Log In
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-type6">
        <ReactHookFormInput
          label="Email"
          name="email"
          type="string"
          register={register("email")}
          parentClassName="mb-[10px]"
          inputClassName="h-[46px]"
        />

        <ReactHookFormInput
          label="Password"
          name="password"
          type={passwordType}
          dropDownIcon={{
            iconIsEnabled: true,
            iconSrc:
              passwordType == "string"
                ? "/eyeIconOpen.png"
                : "/eyeIconClose.png",
          }}
          register={register("password")}
          parentClassName="mb-[10px]"
          inputClassName="h-[46px]"
          onClick={togglePasswordTypeHandler}
        />
        <button
          className="text-[14px] text-[#3672DF] font-[500] leading-[13px] cursor-pointer"
          onClick={() => props.switch(2)}
        >
          Forgot password
        </button>
        <button
          type="submit"
          className="w-full h-[46px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] "
        >
          Log In
        </button>
      </form>
      <div className="text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
        <p>
          By Logging in, you agree to our{" "}
          <span className="text-[#0057FF]">Terms of Service.</span>
        </p>
        <p>
          New to MAZ Express?{" "}
          <span
            className="text-[#0057FF] cursor-pointer"
            onClick={() => props.switch(0)}
          >
            Sign up.
          </span>
        </p>
      </div>
      <LogInWithMail />
    </div>
  );
};

export default LogInComponent;
