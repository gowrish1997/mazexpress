import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { useRouter } from "next/router";
import useUser from "@/lib/hooks/useUser";
import { signIn } from "next-auth/react";
import { createToast } from "@/lib/toasts";
import Image from "next/dist/client/image";
import google_logo from "@/public/google.png";

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

  // const { user, mutateUser } = useUser({ redirectIfFound: true });
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
      username: data.email,
      callbackUrl: "http://localhost:3000/",
    });
    console.log(response)
    if (response?.ok === false) {
      // no user found
      createToast({
        type: "error",
        message: "No user found with this email id",
        title: "No user found",
        timeOut: 2000,
      });
    } else {
      router.push('/')
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

  const googleSignInHandler = async () => {
    // sign in with google
    const response = await signIn("google", {
      callbackUrl: "http://localhost:3000",
      redirect: false,
    });

    if (response?.ok === false) {
      // no user found
      createToast({
        type: "error",
        message: "No user found with this email id",
        title: "No user found",
        timeOut: 2000,
      });
    }
    return response;
    // console.log(response);
  };

  function decodeJwtResponse(token: any) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  function handleToken(token: any) {
    console.log("called authenticated");
    let responsePayload = decodeJwtResponse(token.credential);
    console.log(responsePayload);

    // decode jwt
  }

  useEffect(() => {
    window.handleToken = handleToken;
  }, []);

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
      <button
        className="p-3 flex items-center justify-center border text-[14px] rounded text-center w-full transition duration-300 hover:shadow-lg hover:ring-2 manRope"
        onClick={googleSignInHandler}
      >
        <Image src={google_logo} alt="google logo" width={20} height={20} className='mr-3' />
        Sign in with google
      </button>
    </div>
  );
};

export default LogInComponent;
