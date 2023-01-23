import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInWithMail from "./LogInWithMail";
import Input from "@/common/Input";
export interface Inputs {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
}

const schema = yup
    .object({
        firstName: yup.string().required(),
        email: yup.string().required(),
    })
    .required();

const SignInComponent = () => {
    const {
        register,
        handleSubmit,
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
        <div className=" h-full flex-1 flex flex-col justify-center items-center">
            <div className="w-[400px] space-y-[20px] ">
                <h1 className="text-[26px] text-[#000000] font-[600] leading-[36px] text-left ">Sign up to get started</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex-type6">
                    <div className="flex-type1 space-x-[10px] w-full">
                        <Input label="First name" name="firstName" type="string" register={register("firstName")} parentClassName="mb-[10px]" inputClassName="h-[46px]"  />
                        
                        <Input label="Last name" name="lastName" type="string" register={register("lastName")} parentClassName="mb-[10px]" inputClassName="h-[46px]" />
                    </div>

                    <Input label="Email" name="email" type="email" register={register("email")} parentClassName="mb-[10px]" inputClassName="h-[46px]"  error={errors.firstName!} />

                    <Input label="Mobile number" name="mobileNumber" type="string" register={register("mobileNumber")} parentClassName="mb-[10px]" inputClassName="h-[46px]" />

                    <Input
                        label="Password"
                        name="password"
                        type={passwordType}
                        register={register("password")}
                        dropDownIcon={{ iconIsEnabled: true, iconSrc: passwordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png" }}
                        parentClassName="mb-[10px]"
                        inputClassName="h-[46px]"
                        onClick={togglePasswordTypeHandler}
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type={confirmPasswordType}
                        register={register("confirmPassword")}
                        dropDownIcon={{ iconIsEnabled: true, iconSrc: confirmPasswordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png" }}
                        parentClassName="mb-[10px]"
                        inputClassName="h-[46px]"
                        onClick={toggleConfirmPasswordTypeHandler}
                    />

                    <button type="submit" className="w-full h-[46px] bg-[#BBC2CF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] ">
                        submit
                    </button>
                </form>
                <div className="text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
                    <p>
                        By signing up, you agree to our <span className="text-[#0057FF]">Terms of Service.</span>
                    </p>
                    <p>
                        Already have an account? <span className="text-[#0057FF]">Log in.</span>
                    </p>
                </div>
                <LogInWithMail />
            </div>
        </div>
    );
};

export default SignInComponent;
