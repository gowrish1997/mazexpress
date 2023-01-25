import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInWithMail from "./LogInWithMail";
import ReactHookFormInput from "@/common/ReactHookFormInput";

export interface IInputs {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: Number;
    password: string;
    confirmPassword: string;
}

const schema = yup
    .object({
        firstName: yup.string().required(),
        email: yup.string().required(),
    })
    .required();

const SignUpComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IInputs>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<IInputs> = (data) => console.log(data);

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
                    <form onSubmit={handleSubmit(onSubmit)} className="flex-type6 gap-y-[15px] ">
                        <div className="flex-type2 space-x-[10px] w-full">
                            <ReactHookFormInput label="First name" name="firstName" type="string" register={register("firstName")} />

                            <ReactHookFormInput label="Last name" name="lastName" type="string" register={register("lastName")} />
                        </div>

                        <ReactHookFormInput label="Email" name="email" type="email" register={register("email")} error={errors.firstName!} />

                        <ReactHookFormInput label="Mobile number" name="mobileNumber" type="number" register={register("mobileNumber")} />

                        <ReactHookFormInput
                            label="Password"
                            name="password"
                            type={passwordType}
                            register={register("password")}
                            dropDownIcon={{ iconIsEnabled: true, iconSrc: passwordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png" }}
                            onClick={togglePasswordTypeHandler}
                        />

                        <ReactHookFormInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type={confirmPasswordType}
                            register={register("confirmPassword")}
                            dropDownIcon={{ iconIsEnabled: true, iconSrc: confirmPasswordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png" }}
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
                            Already have an account? <span className="text-[#0057FF]">Log in.</span>
                        </p>
                    </div>
                    <LogInWithMail />
                </div>
            </div>
        
    );
};

export default SignUpComponent;
