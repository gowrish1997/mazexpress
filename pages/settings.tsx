import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import ReactSwitch from "react-switch";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import Layout from "@/components/layout";
<<<<<<< HEAD
import { IUserProfile, IUser } from "@/models/user.interface";
import { FieldError } from "react-hook-form";
import useUser from "@/lib/useUser";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import axios from "axios";
import { nanoid } from "nanoid";
import { createToast } from "@/lib/toasts";
import blueExclamatory from "@/public/blueExclamatory.png";
import ProfilePicPop from "@/components/common/ProfilePicPop";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

        // password_users: yup.string().required("Password is required field"),
        password_users: yup.string(),
        newPassword_users: yup.string().matches(/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/, {
            excludeEmptyString: true,
            message: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        }),
        avatar_url_users: yup.string(),
        is_notifications_enabled_users: yup.boolean().required(),
        //  default_language_users: yup.string().required(),
    })
    .required();

const Settings = () => {
    const { user, mutateUser, userIsLoading } = useUser();

    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;

    const inputFieldLabels: string[] = t("settingsPage.profileForm.InputFieldLabel", { returnObjects: true });
    const fieldErrors: string[] = t("settingsPage.profileForm.Errors", { returnObjects: true });






    
=======
import CustomDropDown from "@/components/common/CustomDropDown";
import useUser from "@/lib/hooks/useUser";
import { useRouter } from "next/router";
import { createToast } from "@/lib/toasts";
import blueExclamatory from "@/public/blueExclamatory.png";
import ProfilePicPop from "@/components/common/ProfilePicPop";
import { User } from "@/models/user.model";

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
        "Must be exactly 10 digits",
        (val) => val?.toString().length === 10
      )
      .required()
      .typeError("Mobile number is required field"),

    // password_users: yup.string().required("Password is required field"),
    password: yup.string(),
    newPassword: yup.string(),
    //   .min(8, "Password must be 8 characters long")
    //   .matches(/[0-9]/, "Password requires a number")
    //   .matches(/[a-z]/, "Password requires a lowercase letter"),
    //   .matches(/[A-Z]/, "Password requires an uppercase letter")
    //   .matches(/[^\w]/, "Password requires a symbol"),
    avatar_url: yup.string(),
    is_notifications_enabled: yup.boolean().required(),
    //  default_language_users: yup.string().required(),
  })
  .required();

const Settings = () => {
  const { user, mutateUser } = useUser();

  const [errorMsg, setErrorMsg] = useState("");
  const [showProfilePicPop, setShowProfilePicPop] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<User & { default_language: string; newPassword: string }>({
    resolver: yupResolver(schema),
    defaultValues: { ...user, password: "" },
  });

  useEffect(() => {
    console.log(user);
    reset({ ...user, password: "" });
  }, [user, reset]);
>>>>>>> sessions































    const languageOption: { value: string; label: string }[] = t("settingsPage.profileForm.LanguageOption", { returnObjects: true });

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

<<<<<<< HEAD
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
    } = useForm<IUserProfile>({
        resolver: yupResolver(schema),
        defaultValues: { ...user, password_users: "" },
=======
  const onSubmit: SubmitHandler<
    User & { default_language: string; newPassword: string }
  > = async (data) => {
    // console.log(data);
    createToast({
      title: "Success",
      type: "success",
      message: "Updated user info.",
      timeOut: 2000,
      onClick: () => alert("click"),
>>>>>>> sessions
    });

    useEffect(() => {
        // console.log(user);
        reset({ ...user, password_users: "" });
    }, [user, reset]);

<<<<<<< HEAD
    const [passwordType, setPasswordType] = useState("password");
    const [newPasswordType, setNewPasswordType] = useState("password");
=======
  // if (userIsLoading === "loading") return <div>loading</div>;
>>>>>>> sessions

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
    const toggleProfilePicPop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setShowProfilePicPop((prev) => !prev);
    };

<<<<<<< HEAD
    const onSubmit: SubmitHandler<IUserProfile> = async (data) => {
        console.log(data);
        // createToast({
        //     title: "Success",
        //     type: "success",
        //     message: "Updated user info.",
        //     timeOut: 2000,
        //     onClick: () => alert("click"),
        // });
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
            <PageHeader content={t("settingsPage.pageHeader.Title")} className="border-none pb-[10px]" title="My Settings | MazExpress" />
            <ProfilePicPop show={showProfilePicPop} close={toggleProfilePicPop} />
            <Layout>
                <div className="w-full space-y-[30px] ">
                    <div className="flex-type1 gap-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
                        <Image src={blueExclamatory} alt="icon" width={16} height={16} />
                        <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                            {t("settingsPage.LinkPPart1")} <span className="text-[#3672DF]">{t("settingsPage.LinkPPart2")} </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">{t("settingsPage.Title")}</p>
                        <p className="text-[14px] text-[#525D72] leading-[21px] font-[500] ">{t("settingsPage.Discription")} </p>
                    </div>

                    <form className="flex-type6 w-3/4 gap-y-[10px] " onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex items-center gap-x-[20px] mb-[20px] ">
                            <label htmlFor="user_profile">
                                <div className="w-[100px] h-[100px] relative rounded-full overflow-hidden" onClick={toggleProfilePicPop}>
                                    <Image src={"/user-images/" + user?.avatar_url_users!} alt="profile" fill style={{ objectFit: "cover" }} />
                                </div>
                            </label>

                            <div className="flex-type6">
                                <p className="text-[24px] text-[#2B2B2B] leading-[32px] font-[600] ">
                                    {user?.first_name_users} {user?.last_name_users}
                                </p>
                                <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">{user?.email_users}</p>
                            </div>
                        </div>
                        <div className="flex-type2 w-full gap-x-[20px] ">
                            <div className="flex-type2 gap-x-[10px] w-full">
                                <ReactHookFormInput
                                    label={inputFieldLabels[0]}
                                    name="first_name_users"
                                    type="string"
                                    register={register("first_name_users")}
                                    error={errors.first_name_users?.message && fieldErrors[0]}
                                />

                                <ReactHookFormInput
                                    label={inputFieldLabels[1]}
                                    name="last_name_users"
                                    type="string"
                                    register={register("last_name_users")}
                                    error={errors.last_name_users?.message && fieldErrors[1]}
                                />
                            </div>

                            <ReactHookFormInput
                                label={inputFieldLabels[2]}
                                name="password_users"
                                type={passwordType}
                                register={register("password_users")}
                                error={errors.password_users?.message}
                                icon={{
                                    isEnabled: true,
                                    src: passwordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                                    onClick: togglePasswordTypeHandler,
                                }}
                                // disabled={true}
                                // autoComplete="off"
                            />
                        </div>
                        <div className="flex-type2 w-full gap-x-[20px]">
                            <ReactHookFormInput
                                label={inputFieldLabels[3]}
                                name="email_users"
                                type="string"
                                register={register("email_users")}
                                error={errors.email_users?.message && fieldErrors[2]}
                            />

                            <ReactHookFormInput
                                label={inputFieldLabels[4]}
                                name="newPassword_users"
                                type={newPasswordType}
                                register={register("newPassword_users")}
                                error={errors.newPassword_users?.message && fieldErrors[3]}
                                icon={{
                                    isEnabled: true,
                                    src: newPasswordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                                    onClick: toggleNewPasswordTypeHandler,
                                }}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="flex-type2 w-full gap-x-[20px]">
                            <ReactHookFormInput
                                label={inputFieldLabels[5]}
                                name="phone_users"
                                type="number"
                                register={register("phone_users")}
                                error={errors.phone_users?.message && fieldErrors[4]}
                            />
                            {/* 
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
                            /> */}
                            <CusotmDropdown
                                label={inputFieldLabels[6]}
                                name="default_language_users"
                                type="string"
                                IconEnabled={true}
                                register={register("default_language_users")}
                                error={errors.default_language_users?.message}
                                options={languageOption}
                                value={getValues("default_language_users")}
                                setValue={setValue}
                                disabled={true}
                                className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
                            />
                        </div>
                        <div className="flex-type3 w-full space-x-[20px] mt-[10px] ">
                            <div className="font-[500]">
                                <p className="text-[14px] text-[#2B2B2B] leading-[19px] font-[600] ">{t("settingsPage.profileForm.notification.Title")}</p>
                                <p className="text-[12px] text-[#525D72] leading-[18px] ">{t("settingsPage.profileForm.notification.Discription")}</p>
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
                            {t("settingsPage.profileForm.SubmitButton")}
                        </button>
                    </form>
                </div>
            </Layout>
        </>
    );
=======
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
                      user?.avatar_url?.startsWith("http")
                        ? user?.avatar_url!
                        : "/user-images/" + user?.avatar_url!
                    }
                    alt="profile"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </label>

              <div className="flex-type6">
                <p className="text-[24px] text-[#2B2B2B] leading-[32px] font-[600] ">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex-type1 w-full space-x-[20px] ">
              <div className="flex-type2 space-x-[10px] w-full">
                <ReactHookFormInput
                  label="First name"
                  name="first_name"
                  type="string"
                  register={register("first_name")}
                  error={errors.first_name}
                />

                <ReactHookFormInput
                  label="Last name"
                  name=" last_name"
                  type="string"
                  register={register("last_name")}
                  error={errors.last_name}
                />
              </div>

              <ReactHookFormInput
                label="Password"
                name="password"
                type={passwordType}
                register={register("password")}
                error={errors.password}
                icon={{
                  isEnabled: true,
                  type: passwordType == "string" ? "insecure" : "secure",
                  onClick: togglePasswordTypeHandler,
                }}
                // disabled={true}
                // autoComplete="off"
              />
            </div>
            <div className="flex-type1 w-full space-x-[20px]">
              <ReactHookFormInput
                label="Email"
                name="email"
                type="string"
                register={register("email")}
                error={errors.email}
              />

              <ReactHookFormInput
                label="New Password"
                name="newPassword"
                type={newPasswordType}
                register={register("newPassword")}
                error={errors.newPassword}
                icon={{
                  isEnabled: true,
                  type: newPasswordType == "string" ? "insecure" : "secure",
                  onClick: toggleNewPasswordTypeHandler,
                }}
                autoComplete="new-password"
              />
            </div>
            <div className="flex-type1 w-full space-x-[20px]">
              <ReactHookFormInput
                label="Mobile number"
                name="phone"
                type="number"
                register={register("phone")}
                error={errors.phone}
              />

              <CustomDropDown
                label="Language"
                name="default_language"
                value={["Arabic", "English"]}
                register={register("default_language")}
                error={errors.default_language}
                dropDownIcon={{
                  iconIsEnabled: true,
                  iconSrc: "/downwardArrow.png",
                }}
              />
            </div>
            <div className="flex-type3 w-full space-x-[20px] mt-[10px] ">
              <div className="font-[500]">
                <p className="text-[14px] text-[#2B2B2B] leading-[19px] font-[600] ">
                  Notifications
                </p>
                <p className="text-[12px] text-[#525D72] leading-[18px] ">
                  Enable or disable notifications for your account
                </p>
              </div>
              <Controller
                name="is_notifications_enabled"
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

            <button
              type="submit"
              className="w-1/2 h-[46px] border-[1px] bg-[#3672DF] rounded-[4px] text-[#FFFFFF] mt-[10px] "
            >
              Update settings
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
>>>>>>> sessions
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
