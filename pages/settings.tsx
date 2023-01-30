import React, { useState } from "react";
import PageHeader from "@/components/orders/PageHeader";
import ReactSwitch from "react-switch";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import Layout from "@/components/layout";
import { TUserProfile } from "@/models/user.interface";
import LanguageSelector from "@/common/LanguageSelector";
const sing = {
    first_name_users: "string",
    last_name_users: "string",
    email_users: "strin@gmail.com",
    phone_users: 1234567890,
    password_users: "string",
    newPassword_users: "Efla$321",
    avatarURL_users: "string",
    notification_users: true,
    language_users: "en",
};

const schema = yup
    .object({
        first_name_users: yup.string().required("First name is required"),
        last_name_users: yup.string().required("Last name is required"),
        email_users: yup.string().required("Email is required").email("please include @ in the email"),
        phone_users: yup
            .number()
            .test("len", "Must be exactly 10 digits", (val) => val?.toString().length === 10)
            .required()
            .typeError("Mobile numbder is required field"),

        password_users: yup.string().required(),
        newPassword_users: yup
            .string()
            .min(8, "Password must be 8 characters long")
            .matches(/[0-9]/, "Password requires a number")
            .matches(/[a-z]/, "Password requires a lowercase letter")
            .matches(/[A-Z]/, "Password requires an uppercase letter")
            .matches(/[^\w]/, "Password requires a symbol"),
        avatarURL_users: yup.string(),
        notification_users: yup.boolean().required(),
        language_users: yup.string().required(),
    })
    .required();

const settings = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TUserProfile>({
        resolver: yupResolver(schema),
        defaultValues: sing,
    });

    const [passwordType, setPasswordType] = useState("password");
    const [newPasswordType, setNewPasswordType] = useState("password");

    const togglePasswordTypeHandler = () => {
        if (passwordType == "string") {
            setPasswordType("password");
        } else {
            setPasswordType("string");
        }
    };
    const toggleNewPasswordTypeHandler = () => {
        if (newPasswordType == "string") {
            setNewPasswordType("password");
        } else {
            setNewPasswordType("string");
        }
    };

    const onSubmit: SubmitHandler<TUserProfile> = (data) => console.log(data);

    return (
        <>
            <PageHeader content="Settings" className="border-none pb-[10px]" />
            <Layout>
                <div className="w-full space-y-[30px] ">
                    <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
                        <Image src="/blueexclamatory.png" alt="icon" width={16} height={16} />
                        <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                            Here is a link to some fake information that contains crucial information, <span className="text-[#3672DF]">Link here →</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">Account</p>
                        <p className="text-[14px] text-[#525D72] leading-[21px] font-[500] ">Review and update your account details</p>
                    </div>

                    <form className="flex-type6 w-3/4 gap-y-[10px] " onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex-type1 gap-x-[20px] mb-[20px] ">
                            <label htmlFor="user_profile">
                                <input type="file" className="hidden" id="user_profile" {...register("avatarURL_users")} />
                                <Image src="/profile.png" alt="profile" height={100} width={100} />
                            </label>

                            <div className="flex-type6">
                                <p className="text-[24px] text-[#2B2B2B] leading-[32px] font-[600] ">Lincoln Bergson</p>
                                <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">lincolnbergson96@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex-type1 w-full space-x-[20px] ">
                            <div className="flex-type2 space-x-[10px] w-full">
                                <ReactHookFormInput
                                    label="First name"
                                    name="first_name_users"
                                    type="string"
                                    register={register("first_name_users")}
                                    error={errors.first_name_users}
                                />

                                <ReactHookFormInput label="Last name" name=" last_name_users" type="string" register={register("last_name_users")} error={errors.last_name_users} />
                            </div>

                            <ReactHookFormInput
                                label="Password"
                                name="password_users"
                                type={passwordType}
                                register={register("password_users")}
                                error={errors.password_users}
                                dropDownIcon={{ iconIsEnabled: true, iconSrc: passwordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png" }}
                                onClick={togglePasswordTypeHandler}
                                disabled={true}
                            />
                        </div>
                        <div className="flex-type1 w-full space-x-[20px]">
                            <ReactHookFormInput label="Email" name="email_users" type="string" register={register("email_users")} error={errors.email_users} />

                            <ReactHookFormInput
                                label="New Password"
                                name="newPassword_users"
                                type={newPasswordType}
                                register={register("newPassword_users")}
                                error={errors.newPassword_users}
                                dropDownIcon={{ iconIsEnabled: true, iconSrc: newPasswordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png" }}
                                onClick={toggleNewPasswordTypeHandler}
                            />
                        </div>
                        <div className="flex-type1 w-full space-x-[20px]">
                            <ReactHookFormInput label="Mobile number" name="phone_users" type="number" register={register("phone_users")} error={errors.phone_users} />

                            <Controller
                                name="language_users"
                                control={control}
                                render={({ field: { onChange, value, ref } }) => (
                                    <LanguageSelector
                                        label="Language"
                                        error={errors.language_users}
                                        dropDownIcon={{ iconIsEnabled: true, iconSrc: "/downwardArrow.png" }}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-type3 w-full space-x-[20px] mt-[10px] ">
                            <div className="font-[500]">
                                <p className="text-[14px] text-[#2B2B2B] leading-[19px] font-[600] ">Notifications</p>
                                <p className="text-[12px] text-[#525D72] leading-[18px] ">Dummy and update your account details</p>
                            </div>
                            <Controller
                                name="notification_users"
                                control={control}
                                defaultValue={false}
                                render={({ field: { onChange, value } }) => (
                                    <ReactSwitch
                                        onChange={onChange}
                                        checked={value}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        width={36}
                                        height={20}
                                        handleDiameter={12}
                                        offColor={"#D9D9D9"}
                                    />
                                )}
                            />
                        </div>

                        <button type="submit" className="w-1/2 h-[46px] border-[1px] bg-[#3672DF] rounded-[4px] text-[#FFFFFF] mt-[10px] ">
                            Update settings
                        </button>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default settings;
