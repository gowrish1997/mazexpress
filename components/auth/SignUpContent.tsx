import React, { useState } from "react";
<<<<<<< HEAD

import CusotmDropdown from "../LandingPage/CustomDropdown";
import { useTranslation } from "next-i18next";
=======
>>>>>>> sessions
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { createToast } from "@/lib/toasts";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { User, UserGender } from "@/models/user.model";
import fetchJson from "@/lib/fetchServer";


const schema = yup
    .object({
        first_name: yup.string().required("First name is required field"),
        last_name: yup.string().required("Last name is required field"),
        age: yup.string().required("Age is required field"),
        gender: yup.string().required("Gender is required field"),
        email: yup.string().required("Email is required field").email("Please provide valid email"),
        phone: yup
            .number()
            .test("len", "Must be exactly 10 digits", (val) => val?.toString().length === 10)
            .required()
            .typeError("Mobile numbder is required field"),
        password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/, {
            excludeEmptyString: true,
            message: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        }),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password_users")], "Passwords must match")
            .required()
            .typeError("Confirm Password is required field"),
    })
    .required();
=======
import CusotmDropdown from "../LandingPage/CustomDropdown";
import { useTranslation } from "next-i18next";
import { User, UserGender } from "@/models/user.model";
import fetchServer from "@/lib/fetchServer";
import { FetchError } from "@/lib/fetchSelf";

const schema = yup
  .object({
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
      .test(
        "len",
        "Must be exactly 10 digits",
        (val) => val?.toString().length === 10
      )
      .required()
      .typeError("Mobile numbder is required field"),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/, {
        excludeEmptyString: true,
        message:
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
      }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required()
      .typeError("Confirm Password is required field"),
  })
  .required();
>>>>>>> sessions

interface IProp {
  switch?: (i: number) => void;
  type: string;
}

const SignUpContent = (props: IProp) => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;

  const inputFieldLabel: string[] = t("signUpView.form.InputField", {
    returnObjects: true,
  });
  const inputFieldErrors: string[] = t("signUpView.form.Errors", {
    returnObjects: true,
  });
  const submitButtons: string[] = t("signUpView.form.SubmitButton", {
    returnObjects: true,
  });
  const description: string[] = t("signUpView.form.Discription", {
    returnObjects: true,
  });
  const genderOption: { value: string; label: string }[] = t(
    "signUpView.form.GenderOptions",
    { returnObjects: true }
  );

<<<<<<< HEAD

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
      } = useForm<User & { confirmPassword: string }>({
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
    


    const onSubmit: SubmitHandler<User & { confirmPassword: string }> = async (
        data
      ) => {
        // console.log(data);
        try {
          const newUser = await fetchJson("/api/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          // console.log(newUser);
          if (newUser && newUser.msg === "User exists already.") {
            createToast({
              type: "error",
              title: "User exists",
              message: "This email id is already taken.",
              timeOut: 2000,
            });
          } else {
            createToast({
              type: "success",
              title: "Created user",
              message: "Successfully created new user",
              timeOut: 2000,
            });
            router.push("/auth/gate");
          }
        } catch (err) {
          if (err) throw err;
          console.error(err);
        }
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
    const toggleConfirmPasswordTypeHandler = () => {
        if (confirmPasswordType == "string") {
            setConfirmPasswordType("password");
        } else {
            setConfirmPasswordType("string");
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-type6 h-full w-full gap-y-[10px] ">
            <div className="flex-type2 gap-x-[10px] w-full">
                <ReactHookFormInput
                    label={inputFieldLabel[0]}
                    name="first_name_users"
                    type="string"
                    register={register("first_name")}
                    error={errors.first_name?.message && inputFieldErrors[0]}
                />

                <ReactHookFormInput
                    label={inputFieldLabel[1]}
                    name="last_name_users"
                    type="string"
                    register={register("last_name")}
                    error={errors.last_name?.message && inputFieldErrors[1]}
                />
            </div>
            <div className="flex-type2 gap-x-[10px] w-full">
                <ReactHookFormInput
                    label={inputFieldLabel[2]}
                    name="age_users"
                    type="string"
                    register={register("age")}
                    error={errors.age?.message && inputFieldErrors[2]}
                />
                {/* 
=======
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<User & { confirmPassword: string }>({
    resolver: yupResolver(schema),
    defaultValues: {
      age: "22",
      email: "mohamed@maz.com",
      first_name: "mohamed",
      gender: UserGender.UNKNOWN,
      last_name: "ali",
      confirmPassword: "Test123$",
      password: "Test123$",
      phone: 1234567890,
    },
  });

  const onSubmit: SubmitHandler<User & { confirmPassword: string }> = async (
    data
  ) => {
    console.log(data);

    try {
      const result = await fetchServer("/api/users", {
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
      props.switch?.(1);
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
    console.log("passwortype handler");
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-type6 h-full w-full gap-y-[10px] "
    >
      <div className="flex-type2 gap-x-[10px] w-full">
        <ReactHookFormInput
          label={inputFieldLabel[0]}
          name="first_name"
          type="string"
          register={register("first_name")}
          error={errors.first_name}
        />

        <ReactHookFormInput
          label={inputFieldLabel[1]}
          name="last_name"
          type="string"
          register={register("last_name")}
          error={errors.last_name}
        />
      </div>
      <div className="flex-type2 gap-x-[10px] w-full">
        <ReactHookFormInput
          label={inputFieldLabel[2]}
          name="age"
          type="string"
          register={register("age")}
          error={errors.age}
        />
        {/* 
>>>>>>> sessions
<ReactHookFormInput
label="Gender"
name="gender"
type="string"
register={register("gender")}
error={errors.gender}
/> */}
<<<<<<< HEAD
                <CusotmDropdown
                    label={inputFieldLabel[3]}
                    name="gender_users"
                    type="string"
                    IconEnabled={true}
                    register={register("gender")}
                    error={errors.gender?.message && inputFieldErrors[3]}
                    value={getValues("gender")}
                    setValue={setValue}
                    options={genderOption}
                    disabled={true}
                />
            </div>

            <ReactHookFormInput
                label={inputFieldLabel[4]}
                name="email_users"
                type="string"
                register={register("email")}
                error={errors.email?.message && inputFieldErrors[4]}
            />

            <ReactHookFormInput
                label={inputFieldLabel[5]}
                name="phone_users"
                type="number"
                register={register("phone")}
                error={errors.phone?.message && inputFieldErrors[5]}
            />

            <ReactHookFormInput
                label={inputFieldLabel[6]}
                name="password_users"
                type={passwordType}
                register={register("password")}
                error={errors.password?.message && inputFieldErrors[6]}
                icon={{
                    isEnabled: true,
                    src: passwordType === "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                }}
                onClick={togglePasswordTypeHandler}
            />

            <ReactHookFormInput
                label={inputFieldLabel[7]}
                name="confirmPassword_users"
                type={confirmPasswordType}
                register={register("confirmPassword")}
                error={errors.confirmPassword?.message && inputFieldErrors[7]}
                icon={{
                    isEnabled: true,
                    src: confirmPasswordType === "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                }}
                onClick={toggleConfirmPasswordTypeHandler}
            />
=======
        <CusotmDropdown
          label={inputFieldLabel[3]}
          name="gender"
          type="string"
          IconEnabled={true}
          register={register("gender")}
          error={errors.gender}
          value={getValues("gender")}
          setValue={setValue}
          options={genderOption}
          disabled={true}
        />
      </div>

      <ReactHookFormInput
        label={inputFieldLabel[4]}
        name="email"
        type="string"
        register={register("email")}
        error={errors.email}
      />

      <ReactHookFormInput
        label={inputFieldLabel[5]}
        name="phone"
        type="number"
        register={register("phone")}
        error={errors.phone}
      />

      <ReactHookFormInput
        label={inputFieldLabel[6]}
        name="password"
        type={passwordType}
        register={register("password")}
        error={errors.password}
        icon={{
          isEnabled: true,
          src:
            passwordType === "password"
              ? "/eyeIconOpen.png"
              : "/eyeIconClose.png",
          onClick: togglePasswordTypeHandler,
        }}
      />

      <ReactHookFormInput
        label={inputFieldLabel[7]}
        name="confirmPassword"
        type={confirmPasswordType}
        register={register("confirmPassword")}
        error={errors.confirmPassword}
        icon={{
          isEnabled: true,
          src: passwordType === 'password' ?  "/eyeIconOpen.png" : "/eyeIconClose.png",
            onClick: toggleConfirmPasswordTypeHandler,
        }}
      />
>>>>>>> sessions

      <button
        type="submit"
        className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
      >
        {props.type == "signUp" ? submitButtons[0] : "Create Admin"}
      </button>
      {props.type == "signUp" && (
        <div className="text-center w-full text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
          <p>
            {description[0]}{" "}
            <span className="text-[#0057FF]">{description[1]}</span>
          </p>
          <p>
            {description[2]}
            <span
              className="text-[#0057FF] cursor-pointer"
              onClick={() => props.switch?.(1)}
            >
              {description[3]}
            </span>
          </p>
        </div>
      )}
    </form>
  );
};

export default SignUpContent;
