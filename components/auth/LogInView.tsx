import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInWithMail from "./LogInWithMail";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { useRouter } from "next/router";
import useUser from "@/lib/useUser";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { IUser } from "@/models/user.interface";
import user from "@/pages/api/auth/user";

type Inputs = {
  password: string;
  email: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("please include @ in the email"),
    password: yup.string().required("Password is required field"),
  })
  .required();

const LogInComponent = (props: any) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const { user, mutateUser } = useUser({redirectIfFound: true});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data);
    try {
      const result: IUser = await fetchJson("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // console.log(result);
      await mutateUser(result, false);

      // if (user?.is_admin_users === 1) {
      //   // console.log('push to admin')
      //   router.push("/admin");
      // } else {
      //   // console.log('push to home')
      //   router.push("/");
      // }
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
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
    <div className="w-[400px] space-y-[20px] ">
      <h1 className="text-[26px] text-[#000000] font-[600] leading-[36px] text-left ">
        Log In
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-type6 gap-y-[12px] "
      >
        <ReactHookFormInput
          label="Email"
          name="email"
          type="string"
          register={register("email")}
          error={errors.email?.message}
        />

        <ReactHookFormInput
          label="Password"
          name="password"
          type={passwordType}
          icon={{
            isEnabled: true,
          src:
              passwordType === "string"
                ? "/eyeIconOpen.png"
                : "/eyeIconClose.png",
          }}
          register={register("password")}
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
      <div className="text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[16px] ">
        <p>
          By logging in, you agree to our{" "}
          <span className="text-[#0057FF]">Terms of Service.</span>
        </p>
        <p className="">
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
