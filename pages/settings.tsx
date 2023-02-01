import React, { useEffect, useState } from "react";
import PageHeader from "@/components/orders/PageHeader";
import ReactSwitch from "react-switch";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import Layout from "@/components/layout";
import { IUserProfile, IUser } from "@/models/user.interface";
import CustomDropDown from "@/common/CustomDropDown";
import useUser from "@/lib/useUser";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { useRouter } from "next/router";

const schema = yup
    .object({
        first_name_users: yup.string().required("First name is required"),
        last_name_users: yup.string().required("Last name is required"),
        email_users: yup.string().required("Email is required").email("Please provide valid email"),
        phone_users: yup
            .number()
            .test("len", "Must be exactly 10 digits", (val) => val?.toString().length === 10)
            .required()
            .typeError("Mobile number is required field"),

        // password_users: yup.string().required(),
        password_users: yup.string().required("Password is required field"),
        newPassword_users: yup.string(),
        //   .min(8, "Password must be 8 characters long")
        //   .matches(/[0-9]/, "Password requires a number")
        //   .matches(/[a-z]/, "Password requires a lowercase letter"),
        //   .matches(/[A-Z]/, "Password requires an uppercase letter")
        //   .matches(/[^\w]/, "Password requires a symbol"),
        avatar_url_users: yup.string(),
        is_notifications_enabled_users: yup.boolean().required(),
        //  default_language_users: yup.string().required(),
    })
    .required();

const Settings = () => {
    const { user, mutateUser, userIsLoading } = useUser();
    const [errorMsg, setErrorMsg] = useState("");

    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IUserProfile>({
        resolver: yupResolver(schema),
        defaultValues: user,
    });

    useEffect(() => {
        console.log(user);
        reset(user);
    }, [user]);

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

    const onSubmit: SubmitHandler<IUserProfile> = async (data) => {
        console.log(data);
        // let updateObj = { ...data };
        // delete updateObj.newPassword_users;
        // delete updateObj.password_users;
        // delete updateObj.default_language_users;
        // updateObj.id_users = user?.id_users;

        // if (user && user.id_users) {
        //   // update user
        //   try {
        //     mutateUser(
        //       await fetchJson(`/api/users?id=${user.id_users}`, {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(updateObj),
        //       }),
        //       false
        //     );
        //     // router.push("/");
        //   } catch (error) {
        //     if (error instanceof FetchError) {
        //       setErrorMsg(error.data.message);
        //     } else {
        //       console.error("An unexpected error happened:", error);
        //     }
        //   }
        // }
    };

    if (userIsLoading) return <div>loading</div>;

    return (
        <>
            <PageHeader content="Settings" className="border-none pb-[10px]" title="My Settings | MazExpress" />
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
                        <div className="flex items-center gap-x-[20px] mb-[20px] ">
                            <label htmlFor="user_profile">
                                <div className="w-[100px] h-[100px] relative rounded-full overflow-hidden">
                                    <input type="file" className="hidden" id="user_profile" {...register("avatar_url_users")} />
                                    <Image src={user?.avatar_url_users!} alt="profile" fill style={{ objectFit: "cover" }} />
                                </div>
                            </label>

                            <div className="flex-type6">
                                <p className="text-[24px] text-[#2B2B2B] leading-[32px] font-[600] ">
                                    {user?.first_name_users} {user?.last_name_users}
                                </p>
                                <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">{user?.email_users}</p>
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
                                icon={{
                                    isEnabled: true,
                                    src: passwordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                                    onClick: togglePasswordTypeHandler,
                                }}
                                // disabled={true}
                                // autoComplete="off"
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
                                icon={{
                                    isEnabled: true,
                                    src: newPasswordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                                    onClick: toggleNewPasswordTypeHandler,
                                }}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="flex-type1 w-full space-x-[20px]">
                            <ReactHookFormInput label="Mobile number" name="phone_users" type="number" register={register("phone_users")} error={errors.phone_users} />

                            <CustomDropDown
                                label="Language"
                                name="default_language_users"
                                value={["Arabic", "English"]}
                                register={register("default_language_users")}
                                error={errors.default_language_users}
                                dropDownIcon={{
                                    iconIsEnabled: true,
                                    iconSrc: "/downwardArrow.png",
                                }}
                            />
                        </div>
                        <div className="flex-type3 w-full space-x-[20px] mt-[10px] ">
                            <div className="font-[500]">
                                <p className="text-[14px] text-[#2B2B2B] leading-[19px] font-[600] ">Notifications</p>
                                <p className="text-[12px] text-[#525D72] leading-[18px] ">Enable or disable notifications for your account</p>
                            </div>
                            <Controller
                                name="is_notifications_enabled_users"
                                control={control}
                                defaultValue={false}
                                render={({ field: { onChange, value } }) => (
                                    <ReactSwitch
                                        onChange={onChange}
                                        checked={value as boolean}
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

export default Settings;
