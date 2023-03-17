import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { createToast } from "@/lib/toasts";
import { useRouter } from "next/router";
import CusotmDropdown from "../LandingPage/CustomDropdown";
import { useTranslation } from "next-i18next";
import { User, UserGender } from "@/models/user.model";
import fetchServer from "@/lib/fetchServer";
import { FetchError } from "@/lib/fetchSelf";
import { Address, City } from "@/models/address.model";

const schema = yup
    .object({
        user: yup.object({
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
                .matches(
                    /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
                    {
                        excludeEmptyString: true,
                        message:
                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
                    }
                ),
        }),
        addr: yup.object({}),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required()
            .typeError("Confirm Password is required field"),
    })
    .required();

interface IProp {
    switch?: (i: number) => void;
    type: string;
    close?: () => void;
}

const SignUpContent = (props: IProp) => {
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;
    console.log(router);

    interface ISignupForm {
        user: User;
        addr: Address;
        confirmPassword: string;
    }

    const inputFieldLabel: string[] = t("signUpView.form.InputField", {
        returnObjects: true,
    });
    const inputFieldErrors: string[] = t("signUpView.form.Errors", {
        returnObjects: true,
    });
    const submitButtons: string[] = t("signUpView.form.SubmitButton", {
        returnObjects: true,
    });
    const description: string[] = t("signUpView.form.Description", {
        returnObjects: true,
    });
    const genderOption: { value: string; label: string }[] = t(
        "signUpView.form.GenderOptions",
        { returnObjects: true }
    );
    const cityOption: { value: string; label: string }[] = t(
        "addNewOrderPage.addressForm.CityOptions",
        { returnObjects: true }
    );

    console.log(cityOption);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<ISignupForm>({
        // resolver: yupResolver(schema),
        defaultValues: {
            user: {
                age: "22",
                is_admin: router.pathname.includes("admin") ? true : false,
                email: "mohamed@maz.com",
                first_name: "mohamed",
                gender: UserGender.UNKNOWN,
                last_name: "ali",
                password: "Test123$",
                phone: 123456789,
            },
            addr: {
                address_1: "",
                address_2: "",
                city: City.T,
                country: "Libya",
                phone: 123456789,
                tag: "default addr",
            },
            confirmPassword: "Test123$",
        },
    });

    const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
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
                    name="user.first_name"
                    type="string"
                    register={register("user.first_name")}
                    error={errors.user?.first_name}
                />

                <ReactHookFormInput
                    label={inputFieldLabel[1]}
                    name="user.last_name"
                    type="string"
                    register={register("user.last_name")}
                    error={errors.user?.last_name}
                />
            </div>
            <div className="flex-type2 gap-x-[10px] w-full">
                <ReactHookFormInput
                    label={inputFieldLabel[2]}
                    name="user.age"
                    type="string"
                    register={register("user.age")}
                    error={errors.user?.age}
                />
                <CusotmDropdown
                    label={inputFieldLabel[3]}
                    name="user.gender"
                    type="string"
                    IconEnabled={true}
                    register={register("user.gender")}
                    error={errors.user?.gender}
                    value={getValues("user.gender")}
                    setValue={setValue}
                    options={genderOption}
                    disabled={true}
                />
            </div>

            <ReactHookFormInput
                label={inputFieldLabel[4]}
                name="user.email"
                type="string"
                register={register("user.email")}
                error={errors.user?.email}
            />

            <ReactHookFormInput
                label={inputFieldLabel[5]}
                name="user.phone"
                type="number"
                register={register("user.phone")}
                error={errors.user?.phone}
            />

            <ReactHookFormInput
                label={inputFieldLabel[6]}
                name="user.password"
                type={passwordType}
                register={register("user.password")}
                error={errors.user?.password}
                icon={{
                    isEnabled: true,
                    src:
                        passwordType === "string"
                            ? "/eyeIconOpen.png"
                            : "/eyeIconClose.png",
                }}
                onClick={togglePasswordTypeHandler}
            />

            <ReactHookFormInput
                label={inputFieldLabel[7]}
                name="confirmPassword"
                type={confirmPasswordType}
                register={register("confirmPassword")}
                error={errors.confirmPassword}
                // icon={{
                //     isEnabled: true,
                //     src:
                //         confirmPasswordType === "string"
                //             ? "/eyeIconOpen.png"
                //             : "/eyeIconClose.png",
                // }}
                // onClick={toggleConfirmPasswordTypeHandler}
            />
            <div className="flex-type2 gap-x-[10px] w-full">
                <ReactHookFormInput
                    label={"Address line 1"}
                    name="addr.address_1"
                    type="string"
                    register={register("addr.address_1")}
                    error={errors.addr?.address_1}
                />

                <ReactHookFormInput
                    label={"Address line 2"}
                    name="addr.address_2"
                    type="string"
                    register={register("addr.address_2")}
                    error={errors.addr?.address_2}
                />
            </div>
            <div className="flex-type2 gap-x-[10px] w-full">
                <ReactHookFormInput
                    label={"Address phone"}
                    name="addr.phone"
                    type="string"
                    register={register("addr.phone")}
                    error={errors.addr?.phone}
                />
                <CusotmDropdown
                    label={"City"}
                    name="addr.city"
                    type="string"
                    IconEnabled={true}
                    register={register("addr.city")}
                    error={errors.addr?.city}
                    value={getValues("addr.city")}
                    setValue={setValue}
                    options={cityOption}
                    // disabled={true}
                />
            </div>
            {props.type == "signUp" ? (
                <button
                    type="submit"
                    className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
                >
                    {submitButtons[0]}
                </button>
            ) : (
                <div className="w-full flex flex-row justify-between  items-center">
                    <button
                        type="submit"
                        className=" h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] px-[15px] "
                    >
                        Create Admin
                    </button>
                    <button
                        type="submit"
                        className=" h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] px-[15px] "
                        onClick={() => props?.close?.()}
                    >
                        Cancel
                    </button>
                </div>
            )}

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
