import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { useRouter } from "next/router";
import useUser from "@/lib/hooks/useUser";
import { signIn } from "next-auth/react";
import { createToast } from "@/lib/toasts";

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
    const response = await signIn("credentials", {
      redirect: false,
      password: data.password,
      email: data.email,
    });

    if (response?.ok === false) {
      // no user found
      createToast({
        type: "error",
        message: "No user found with this email id",
        title: "No user found",
        timeOut: 2000,
      });
    } else {
      router.push("/");
    }
    console.log(response);
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
          error={errors.email}
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
          error={errors.password}
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
      {/* <LogInWithMail /> */}
      <button
        className="p-3 bg-amber-400 rounded"
        // onClick={googleSignInHandler}
      >
        Sign in with google
      </button>
    </div>
  );
};

export default LogInComponent;
