import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactSwitch from "react-switch";
import * as yup from "yup";
import PageHeader from "@/components/common/PageHeader";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import Layout from "@/components/layout";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
import ProfilePicPop from "@/components/common/ProfilePicPop";
import fetchJson from "@/lib/fetchServer";
import { createToast } from "@/lib/toasts";
import { checkPassword } from "@/lib/utils";
import { User } from "@/models/user.model";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";

const schema = yup
    .object({
        first_name: yup.string().required("First name is required"),
        last_name: yup.string().required("Last name is required"),
        email: yup
            .string()
            .required("Email is required")
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

        password: yup.string(),

        newPassword: yup

            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                {
                    excludeEmptyString: true,
                    message:
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
                }
            ),

        // avatar_url: yup.string(),
        is_notifications_enabled: yup.boolean().required(),
        lang: yup.string().required(),
    })
    .required();

const Settings = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
    const { data: session, update }: { data: any; update: any } = useSession();

    const [passwordCheck, setPasswordCheck] = useState(false);
    const inputFieldLabels: string[] = t(
        "settingsPage.profileForm.InputFieldLabel",
        { returnObjects: true }
    );
    const fieldErrors: string[] = t("settingsPage.profileForm.Errors", {
        returnObjects: true,
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [showProfilePicPop, setShowProfilePicPop] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm<
        Pick<
            User,
            | "first_name"
            | "last_name"
            | "email"
            | "phone"
            | "lang"
            | "password"
            | "avatar_url"
            | "is_notifications_enabled"
        > & { newPassword: string }
    >({
        /**
         * removed resolver temporarily for update user function in backend
         *
         * add back error before deploy copy from admin/settings
         *
         */
        resolver: yupResolver(schema),
        defaultValues: { ...session?.user, password: "" },
    });

    useEffect(() => {
        // console.log(user);
        reset({
            ...(session?.user as unknown as Pick<
                User,
                | "first_name"
                | "last_name"
                | "email"
                | "phone"
                | "lang"
                | "password"
                | "avatar_url"
                | "is_notifications_enabled"
            > & { newPassword: string }),
        });
        setPasswordCheck(false);
    }, [session?.user, reset]);

    const languageOption: { value: string; label: string }[] = t(
        "settingsPage.profileForm.LanguageOption",
        { returnObjects: true }
    );

    useEffect(() => {
        // console.log(user)
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    const [passwordType, setPasswordType] = useState("password");
    const [newPasswordType, setNewPasswordType] = useState("password");

    const togglePasswordTypeHandler = () => {
        // console.log("passowerd");
        if (passwordType == "string") {
            setPasswordType("password");
        } else {
            setPasswordType("string");
        }
    };
    const toggleNewPasswordTypeHandler = () => {
        // console.log("new password");
        if (newPasswordType == "string") {
            setNewPasswordType("password");
        } else {
            setNewPasswordType("string");
        }
    };
    const toggleProfilePicPop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setShowProfilePicPop((prev) => !prev);
    };

    const onSubmit: SubmitHandler<
        Pick<
            User,
            | "first_name"
            | "last_name"
            | "email"
            | "phone"
            | "lang"
            | "password"
            | "avatar_url"
            | "is_notifications_enabled"
        > & { newPassword: string }
    > = async (data) => {
        try {
            // console.log(result);
            if (!passwordCheck && data.password?.length > 0) {
                createToast({
                    type: "error",
                    title: locale == "en" ? "An error occurred" : "حدث خطأ",
                    message:
                        locale == "en"
                            ? "Old password is wrong"
                            : "كلمة المرور القديمة خاطئة",
                    timeOut: 3000,
                });
                return;
            }
            if (!passwordCheck && data.newPassword?.length > 0) {
                createToast({
                    type: "error",
                    title: locale == "en" ? "An error occurred" : "حدث خطأ",
                    message:
                        locale == "en"
                            ? "Please confirm old password"
                            : "الرجاء تأكيد كلمة المرور القديمة",
                    timeOut: 3000,
                });
                return;
            }

            // update user here
            let sendObj: Pick<
                User,
                | "first_name"
                | "last_name"
                | "email"
                | "phone"
                | "lang"
                | "password"
                | "avatar_url"
                | "is_notifications_enabled"
            > & { newPassword?: string } = {
                ...data,
            };

            if (data.newPassword && data.newPassword?.length > 0) {
                sendObj.password = data.newPassword;
                delete sendObj.newPassword;
            } else {
                delete sendObj.newPassword;
                delete sendObj.password;
            }

            const updateRes = await fetchJson(
                `/api/users/${session?.user?.email}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(sendObj),
                }
            );

            // have to delete old password and new password before storing into the session
            if (sendObj.password) {
                delete sendObj.password;
            }
            if (sendObj.newPassword) {
                delete sendObj.newPassword;
            }

            // updating the session
            await update({
                ...session.user,
                ...sendObj,
            });

            createToast({
                type: "success",
                title: locale == "en" ? "success" : "نجاح",
                message:
                    locale == "en"
                        ? "User information updated"
                        : "تم تحديث معلومات المستخدم",
            });
            if (session.user.lang != sendObj.lang) {
                router.reload();
            }
        } catch (err) {
            console.log(err);
            createToast({
                type: "error",
                title: "An error occurred",
                message: "Check console for more info.",
                timeOut: 3000,
            });
        }
    };

    const updatePasswordChecker = async (e: string) => {
        setValue("password", e as string);
        const reee = await checkPassword(e, session?.user?.email!);
        // console.log(reee);
        if (reee) setPasswordCheck(true);
        else setPasswordCheck(false);
    };

    return (
        <>
            <PageHeader
                content={t("settingsPage.pageHeader.Title")}
                className="border-none pb-[10px]"
                title="My Settings | MazExpress"
            />
            <ProfilePicPop
                show={showProfilePicPop}
                close={toggleProfilePicPop}
            />
            <Layout>
                <div className="w-full space-y-[30px] ">
                    <div>
                        <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">
                            {t("settingsPage.Title")}
                        </p>
                        <p className="text-[14px] text-[#525D72] leading-[21px] font-[500] ">
                            {t("settingsPage.Description")}{" "}
                        </p>
                    </div>

                    <form
                        className="flex-type6 w-3/4 gap-y-[10px] "
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex items-center gap-x-[20px] mb-[20px] ">
                            <label htmlFor="user_profile">
                                <div
                                    className="w-[100px] h-[100px] relative rounded-full overflow-hidden"
                                    onClick={toggleProfilePicPop}
                                >
                                    <Image
                                        src={
                                            session?.user.avatar_url ||
                                            "/user-images/default_user.png"
                                        }
                                        alt="profile"
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            </label>

                            <div className="flex-type6">
                                <p className="text-[24px] text-[#2B2B2B] leading-[32px] font-[600] ">
                                    {session?.user.first_name}{" "}
                                    {session?.user.last_name}
                                </p>
                                <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">
                                    {session?.user.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full gap-x-[20px] items-center relative">
                            <div className="flex-type2 gap-x-[10px] w-full items-center">
                                <Controller
                                    name="first_name"
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <ReactHookFormInput
                                            label={inputFieldLabels[0]}
                                            name="first_name"
                                            type="string"
                                            value={value}
                                            onChange={onChange}
                                            error={
                                                errors.first_name?.message &&
                                                fieldErrors[0]
                                            }
                                        />
                                    )}
                                />
                                <Controller
                                    name="last_name"
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <ReactHookFormInput
                                            label={inputFieldLabels[1]}
                                            name="last_name"
                                            value={value}
                                            onChange={onChange}
                                            type="string"
                                            error={
                                                errors.last_name?.message &&
                                                fieldErrors[1]
                                            }
                                        />
                                    )}
                                />
                            </div>

                            <Controller
                                name="password"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <ReactHookFormInput
                                        label={inputFieldLabels[2]}
                                        name="password"
                                        type={passwordType}
                                        value={value}
                                        error={
                                            errors.password?.message &&
                                            fieldErrors[2]
                                        }
                                        icon={{
                                            isEnabled: true,
                                            src:
                                                passwordType === "string"
                                                    ? "/eyeIconOpen.png"
                                                    : "/eyeIconClose.png",
                                        }}
                                        onClick={togglePasswordTypeHandler}
                                        onChange={updatePasswordChecker}
                                        // disabled={true}
                                        // autoComplete="off"
                                    />
                                )}
                            />

                            {!passwordCheck ? (
                                <div
                                    className={`border border-red-600 rounded-full absolute ${
                                        locale == "en" ? "-right-7" : "-left-7"
                                    } top-[35px] flex items-center justify-center h-5 w-5`}
                                >
                                    <FontAwesomeIcon
                                        icon={faX}
                                        size="xs"
                                        className="h-2 w-2 text-red-600"
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`border border-green-600 rounded-full absolute ${
                                        locale == "en" ? "-right-7" : "-left-7"
                                    }  bottom-[14px] flex items-center justify-center h-5 w-5`}
                                >
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        size="xs"
                                        className="h-2 w-2 text-green-600"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex-type2 w-full gap-x-[20px]">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <ReactHookFormInput
                                        label={inputFieldLabels[3]}
                                        name="email"
                                        value={value}
                                        onChange={onChange}
                                        type="string"
                                        error={
                                            errors.email?.message &&
                                            fieldErrors[3]
                                        }
                                    />
                                )}
                            />
                            <Controller
                                name="newPassword"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <ReactHookFormInput
                                        label={inputFieldLabels[4]}
                                        name="newPassword"
                                        type={newPasswordType}
                                        value={value}
                                        onChange={onChange}
                                        error={
                                            errors.newPassword?.message &&
                                            fieldErrors[4]
                                        }
                                        icon={{
                                            isEnabled: true,
                                            src:
                                                newPasswordType === "string"
                                                    ? "/eyeIconOpen.png"
                                                    : "/eyeIconClose.png",
                                        }}
                                        onClick={toggleNewPasswordTypeHandler}
                                        autoComplete="new-password"
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-type2 w-full gap-x-[20px]">
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <ReactHookFormInput
                                        label={inputFieldLabels[5]}
                                        name="phone"
                                        value={value}
                                        onChange={onChange}
                                        type="number"
                                        error={
                                            errors.phone?.message &&
                                            fieldErrors[5]
                                        }
                                    />
                                )}
                            />

                            <CusotmDropdown
                                label={inputFieldLabels[6]}
                                name="lang"
                                type="string"
                                IconEnabled={true}
                                register={register("lang")}
                                error={errors.lang}
                                options={languageOption}
                                value={getValues("lang")}
                                setValue={setValue}
                                disabled={true}
                                className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
                            />
                        </div>
                        <div className="flex-type3 w-1/2 mt-[10px] ">
                            <div className="font-[500]">
                                <p className="text-[14px] text-[#2B2B2B] leading-[19px] font-[600] ">
                                    {t(
                                        "settingsPage.profileForm.notification.Title"
                                    )}
                                </p>
                                <p className="text-[12px] text-[#525D72] leading-[18px] ">
                                    {t(
                                        "settingsPage.profileForm.notification.Description"
                                    )}
                                </p>
                            </div>

                            <Controller
                                name="is_notifications_enabled"
                                control={control}
                                defaultValue={
                                    session?.user?.is_notifications_enabled!
                                }
                                render={({ field: { onChange, value } }) => (
                                    <ReactSwitch
                                        onChange={onChange}
                                        checked={value ? value : false}
                                        // defaultChecked={value as boolean}
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

                        <button
                            type="submit"
                            className="w-1/2 h-[46px] border-[1px] bg-[#35C6F4] rounded-[4px] text-[#FFFFFF] mt-[10px] "
                        >
                            {t("settingsPage.profileForm.SubmitButton")}
                        </button>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default Settings;
export async function getStaticProps({ locale }: { locale: any }) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
