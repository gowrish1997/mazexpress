import React, { useState } from "react";
import Image from "next/image";
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
import { useTranslation } from "next-i18next";
import logo from "../../public/new_logo_blue.png";

const schema = yup
    .object({
        first_name_users: yup.string().required("First name is required field"),
        last_name_users: yup.string().required("Last name is required field"),
        age_users: yup.string().required("Age is required field"),
        gender_users: yup.string().required("Gender is required field"),
        email_users: yup.string().required("Email is required field").email("Please provide valid email"),
        phone_users: yup
            .number()
            .test("len", "Must be exactly 10 digits", (val) => val?.toString().length === 10)
            .required()
            .typeError("Mobile numbder is required field"),
        password_users: yup.string().matches(/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/, {
            excludeEmptyString: true,
            message: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        }),
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
    const { t } = useTranslation("");
    const { locale } = router;

    const inputFieldLabel: string[] = t("signUpView.form.InputField", { returnObjects: true });
    const inputFieldErrors: string[] = t("signUpView.form.Errors", { returnObjects: true });
    const submitButtons: string[] = t("signUpView.form.SubmitButton", { returnObjects: true });
    const discription: string[] = t("signUpView.form.Discription", { returnObjects: true });
    const genderOption: { value: string; label: string }[] = t("signUpView.form.GenderOptions", { returnObjects: true });

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<ISignUp>({
        resolver: yupResolver(schema),
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
        <div className={`w-[300px] sm:w-[65%] xmd:w-[47%] space-y-[20px] flex flex-col justify-start items-center md:items-start  ${locale == "en" ? "md:-ml-[20%]" : "md:-mr-[20%]"} `}>
            <h1 className={`hidden md:block text-[26px] text-[#000000] font-[600] leading-[36px]  `}>{t("signUpView.Title")}</h1>
            <div className="w-full md:hidden flex flex-row justify-center items-baseline gap-x-[10px] ">
                <div className="h-[60px] w-[60px] relative">
                    <Image src={logo} fill alt="logo" />
                </div>
                <h1 className={` text-[26px] text-[#35C6F4] font-[900] leading-[36px]  `}>EXPRESS</h1>
            </div>
            <h1 className={`md:hidden text-center text-[20px] text-[#000000] font-[600] leading-[36px] `}>
            {t("signUpView.MobileViewTitle")}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-type6 h-full w-full gap-y-[10px] ">
                <div className="flex-type2 gap-x-[10px] w-full">
                    <ReactHookFormInput
                        label={inputFieldLabel[0]}
                        name="first_name_users"
                        type="string"
                        register={register("first_name_users")}
                        error={errors.first_name_users?.message && inputFieldErrors[0]}
                    />

                    <ReactHookFormInput
                        label={inputFieldLabel[1]}
                        name="last_name_users"
                        type="string"
                        register={register("last_name_users")}
                        error={errors.last_name_users?.message && inputFieldErrors[1]}
                    />
                </div>
                <div className="flex-type2 gap-x-[10px] w-full">
                    <ReactHookFormInput
                        label={inputFieldLabel[2]}
                        name="age_users"
                        type="string"
                        register={register("age_users")}
                        error={errors.age_users?.message && inputFieldErrors[2]}
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
                        label={inputFieldLabel[3]}
                        name="gender_users"
                        type="string"
                        IconEnabled={true}
                        register={register("gender_users")}
                        error={errors.gender_users?.message && inputFieldErrors[3]}
                        value={getValues("gender_users")}
                        setValue={setValue}
                        options={genderOption}
                        disabled={true}
                    />
                </div>

                <ReactHookFormInput
                    label={inputFieldLabel[4]}
                    name="email_users"
                    type="string"
                    register={register("email_users")}
                    error={errors.email_users?.message && inputFieldErrors[4]}
                />

                <ReactHookFormInput
                    label={inputFieldLabel[5]}
                    name="phone_users"
                    type="number"
                    register={register("phone_users")}
                    error={errors.phone_users?.message && inputFieldErrors[5]}
                />

                <ReactHookFormInput
                    label={inputFieldLabel[6]}
                    name="password_users"
                    type={passwordType}
                    register={register("password_users")}
                    error={errors.password_users?.message && inputFieldErrors[6]}
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
                    register={register("confirmPassword_users")}
                    error={errors.confirmPassword_users?.message && inputFieldErrors[7]}
                    icon={{
                        isEnabled: true,
                        src: confirmPasswordType === "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                    }}
                    onClick={toggleConfirmPasswordTypeHandler}
                />

                <button type="submit" className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]">
                    {submitButtons[0]}
                </button>
                <div className="text-center w-full text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
                    <p>
                        {discription[0]} <span className="text-[#0057FF]">{discription[1]}</span>
                    </p>
                    <p>
                        {discription[2]}
                        <span className="text-[#0057FF] cursor-pointer" onClick={() => props.switch(1)}>
                            {discription[3]}
                        </span>
                    </p>
                </div>
            </form>

            <LogInWithMail />
        </div>
    );
};

export default SignUpComponent;
