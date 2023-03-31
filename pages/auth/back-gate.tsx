import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import logo from "../../public/new_logo_blue.png";
import fetchJson from "@/lib/fetchServer";
import { createToast } from "@/lib/toasts";
import { FetchError } from "@/lib/fetchSelf";
import AuthLayout from "@/components/auth/AuthLayout";
import LogInView from "@/components/auth/LogInView";
import SignUpView from "@/components/auth/SignUpView";
import { Head } from "next/document";
import MagicLinkView from "@/components/auth/MagicLinkView";

type Inputs = {
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          excludeEmptyString: true,
          message:
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        }
      ),

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
      const userResult = await fetchJson(`/api/users/test@testco.com`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.password }),
      });

      console.log(userResult); // id created
      if (userResult.ok === true) {
        // toast
        createToast({
          type: "success",
          title: "New user created.",
          message: "Please log in with your new login credentials",
          timeOut: 3000,
        });

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
    } catch (error) {
      if (error instanceof FetchError) {
        console.log(error);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Sign in | Register</title>
      </Head>
      <AuthLayout>
        <ResetPasswordView />
      </AuthLayout>
    </div>
  );
};

export default ResetPasswordView;
