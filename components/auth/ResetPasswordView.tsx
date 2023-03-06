import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInWithMail from "./LogInWithMail";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Inputs = {
    password: string;
    confirmPassword: string;
};

const schema = yup
    .object({
        password: yup.string().required("Password is required field"),

        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
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
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
        <div className={`w-[400px] space-y-[20px] ${locale == "en" ? "-ml-[100px]" : "-mr-[100px]"}`}>
            <h1 className="text-[26px] text-[#000000] font-[600] leading-[36px] text-left ">Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-type6 gap-y-[12px] ">
                <ReactHookFormInput
                    label="Password"
                    name="password"
                    type={passwordType}
                    register={register("password")}
                    error={errors.password?.message}
                    icon={{
                        isEnabled: true,
                        src: passwordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                    }}
                    onClick={togglePasswordTypeHandler}
                />

                <ReactHookFormInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type={confirmPasswordType}
                    register={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                    icon={{
                        isEnabled: true,
                        src: confirmPasswordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                    }}
                    onClick={toggleConfirmPasswordTypeHandler}
                />

                <button type="submit" className="w-full h-[46px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] ">
                    Reset Password
                </button>
            </form>
            <div className="text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
                <p>
                    By logging in, you agree to our <span className="text-[#0057FF]">terms of service.</span>
                </p>
                <p>
                    New to MAZ Express?{" "}
                    <span className="text-[#0057FF] cursor-pointer" onClick={() => props.switch(0)}>
                        Sign up.
                    </span>
                </p>
            </div>
            {/* <LogInWithMail /> */}
        </div>
    );
};

export default ResetPasswordView;
