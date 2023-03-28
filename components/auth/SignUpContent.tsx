import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { createToast } from "@/lib/toasts";
import { useRouter } from "next/router";
import CustomDropdown from "../LandingPage/CustomDropdown";
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
                    "Must be exactly 9 digits",
                    (val) => val?.toString().length === 9
                )
                .required()
                .typeError("Mobile number is required field"),
            password: yup
                // .string()
                // .min(8, "Password must be 8 characters long")
                // .matches(/[0-9]/, "Password requires a number")
                // .matches(/[a-z]/, "Password requires a lowercase letter")
                // .matches(/[A-Z]/, "Password requires an uppercase letter")
                // .matches(/[^\w]/, "Password requires a symbol"),
                .string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
            .oneOf([yup.ref("user.password")], "Passwords must match")
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
    const discription: string[] = t("signUpView.form.Discription", {
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

    //   console.log(cityOption);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm<ISignupForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
        // defaultValues: {
        //     user: {
        //         age: "20",
        //         email: "connor@maz.com",
        //         first_name: "connor",
        //         is_admin: false,
        //         gender: UserGender.UNKNOWN,
        //         last_name: "ali",
        //         password: "Test123$",
        //         phone: 123456789,
        //     },
        //     addr: {
        //         address_1: "، مصراتة",
        //         address_2: "93FR+Q6J",
        //         city: City.M,
        //         country: "Libya",
        //         phone: 123456789,
        //         tag: "جزيرة العلم",
        //     },
        //     confirmPassword: "Test123$",
        // },
    });

    const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
        console.log(data);

        try {
            const userResult = await fetchServer("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data.user),
            });

        console.log(userResult); // id created

            // add address
            // const addressResult = await fetchServer(
            //     `/api/addresses/${userResult.data[0].email}`,
            //     {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({
            //             ...data.addr,
            //         }),
            //     }
            // );

            // console.log(addressResult.data);
            // if (userResult.ok === true && addressResult.ok === true) {
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
                console.log(error)
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
                <Controller
                    name="user.first_name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <ReactHookFormInput
                            label={inputFieldLabel[0]}
                            name="user.first_name"
                            type="string"
                            onChange={onChange}
                            value={value}
                            error={
                                errors.user?.first_name && inputFieldErrors[0]
                            }
                        />
                    )}
                />

                <Controller
                    name="user.last_name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <ReactHookFormInput
                            label={inputFieldLabel[1]}
                            name="user.last_name"
                            value={value}
                            onChange={onChange}
                            type="string"
                            error={
                                errors.user?.last_name && inputFieldErrors[1]
                            }
                        />
                    )}
                />
            </div>
            <div className="flex-type2 gap-x-[10px] w-full">
                <Controller
                    name="user.age"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <ReactHookFormInput
                            label={inputFieldLabel[2]}
                            name="user.age"
                            value={value!}
                            onChange={onChange}
                            type="string"
                            error={errors.user?.age && inputFieldErrors[2]}
                        />
                    )}
                />

                <CustomDropdown
                    label={inputFieldLabel[3]}
                    name="user.gender"
                    type="string"
                    IconEnabled={true}
                    error={errors.user?.gender?.message}
                    value={getValues("user.gender")}
                    setValue={setValue}
                    options={genderOption}
                    disabled={true}
                />
            </div>
            <Controller
                name="user.email"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <ReactHookFormInput
                        label={inputFieldLabel[4]}
                        name="user.email"
                        type="string"
                        value={value!}
                        onChange={onChange}
                        error={errors.user?.email && inputFieldErrors[4]}
                    />
                )}
            />
            <Controller
                name="user.phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <ReactHookFormInput
                        label={inputFieldLabel[5]}
                        name="user.phone"
                        type="number"
                        value={value}
                        onChange={onChange}
                        error={errors.user?.phone && inputFieldErrors[5]}
                    />
                )}
            />
            <Controller
                name="user.password"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <ReactHookFormInput
                        label={inputFieldLabel[6]}
                        name="user.password"
                        value={value}
                        onChange={onChange}
                        type={passwordType}
                        error={errors.user?.password && inputFieldErrors[6]}
                        icon={{
                            isEnabled: true,
                            src:
                                passwordType === "string"
                                    ? "/eyeIconOpen.png"
                                    : "/eyeIconClose.png",
                        }}
                        onClick={togglePasswordTypeHandler}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <ReactHookFormInput
                        label={inputFieldLabel[7]}
                        value={value!}
                        onChange={onChange}
                        name="confirmPassword"
                        type={confirmPasswordType}
                        error={errors.confirmPassword && inputFieldErrors[7]}
                        icon={{
                            isEnabled: true,
                            src:
                                confirmPasswordType === "string"
                                    ? "/eyeIconOpen.png"
                                    : "/eyeIconClose.png",
                        }}
                        onClick={toggleConfirmPasswordTypeHandler}
                    />
                )}
            />

            <ReactHookFormInput
                label={inputFieldLabel[8]}
                name="addr.tag"
                type="string"
                register={register("addr.tag")}
                error={errors.addr?.tag}
            />

            <div className="flex-type2 gap-x-[10px] w-full">
                <ReactHookFormInput
                    label={inputFieldLabel[9]}
                    name="addr.address_1"
                    type="string"
                    register={register("addr.address_1")}
                    error={errors.addr?.address_1}
                />

                <ReactHookFormInput
                    label={inputFieldLabel[10]}
                    name="addr.address_2"
                    type="string"
                    register={register("addr.address_2")}
                    error={errors.addr?.address_2}
                />
            </div>
            <div className="flex-type2 gap-x-[10px] w-full">
                <ReactHookFormInput
                    label={inputFieldLabel[11]}
                    name="addr.phone"
                    type="string"
                    register={register("addr.phone")}
                    error={errors.addr?.phone}
                />
                <CustomDropdown
                    label={inputFieldLabel[12]}
                    name="addr.city"
                    type="string"
                    IconEnabled={true}
                    register={register("addr.city")}
                    error={errors.addr?.city?.message}
                    value={getValues("addr.city")}
                    setValue={setValue}
                    options={cityOption}
                    // disabled={true}
                />
            </div>
            {props.type == "signUp" ? (
                <button
                    type="submit"
                    className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
                >
                    {submitButtons[0]}
                </button>
            ) : (
                <div className="w-full flex flex-row justify-between  items-center">
                    <button
                        type="submit"
                        className=" h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] px-[15px] "
                    >
                        Create Admin
                    </button>
                    <button
                        type="submit"
                        className=" h-[46px] lg:h-[55px] xlg:h-[70px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] px-[15px] "
                        onClick={() => props?.close?.()}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {props.type == "signUp" && (
                <div className="text-center w-full text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[10px] ">
                    <p>
                        {discription[0]}{" "}
                        <span className="text-[#0057FF]">{discription[1]}</span>
                    </p>
                    <p>
                        {discription[2]}
                        <span
                            className="text-[#0057FF] cursor-pointer"
                            onClick={() => props.switch?.(1)}
                        >
                            {discription[3]}
                        </span>
                    </p>
                </div>
            )}
        </form>
    );
};

export default SignUpContent;
