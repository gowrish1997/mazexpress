import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInWithMail from "./LogInWithMail";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import AuthLayout from "./AuthLayout";
import { ISignUp } from "@/models/user.interface";

const schema = yup
    .object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().required("Email is required").email("please include @ in the email"),
        mobileNumber: yup
            .number()
            .test("len", "Must be exactly 10 digits", (val) => val?.toString().length === 10)
            .required()
            .typeError("Mobile numbder is required field"),
        password: yup
            .string()
            .min(8, "Password must be 8 characters long")
            .matches(/[0-9]/, "Password requires a number")
            .matches(/[a-z]/, "Password requires a lowercase letter")
            .matches(/[A-Z]/, "Password requires an uppercase letter")
            .matches(/[^\w]/, "Password requires a symbol"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();

const SignUpComponent = (props: any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignUp>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<ISignUp> = (data) => console.log(data);

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
            <h1 className="text-[26px] text-[#000000] font-[600] leading-[36px] text-left ">Sign up to get started</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-type6 gap-y-[10px] ">
                <div className="flex-type2 space-x-[10px] w-full">
                    <ReactHookFormInput label="First name" name="first_name_users" type="string" register={register("first_name_users")} error={errors.first_name_users!} />

                    <ReactHookFormInput label="Last name" name="last_name_users" type="string" register={register("last_name_users")} error={errors.last_name_users!} />
                </div>

                <ReactHookFormInput label="Email" name="email_users" type="string" register={register("email_users")} error={errors.email_users!} />

                <ReactHookFormInput label="Mobile number" name="phone_users" type="number" register={register("phone_users")} error={errors.phone_users} />

                <ReactHookFormInput
                    label="Password"
                    name="password_users"
                    type={passwordType}
                    register={register("password_users")}
                    error={errors.password_users}
                    icon={{
                        isEnabled: true,
                        src: passwordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
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
                        src: confirmPasswordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                    }}
                    onClick={toggleConfirmPasswordTypeHandler}
                />

                <button type="submit" className="w-full h-[46px] bg-[#BBC2CF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] ">
                    Sign Up
                </button>
            </form>
            <div className="text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
                <p>
                    By signing up, you agree to our <span className="text-[#0057FF]">Terms of Service.</span>
                </p>
                <p>
                    Already have an account?{" "}
                    <span className="text-[#0057FF] cursor-pointer" onClick={() => props.switch(1)}>
                        Log in.
                    </span>
                </p>
            </div>
            <LogInWithMail />
        </div>
    );
};

export default SignUpComponent;
