import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import ReactSwitch from "react-switch";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import Layout from "@/components/layout";

import useUser from "@/lib/hooks/useUser";
import { useRouter } from "next/router";
import { createToast } from "@/lib/toasts";
import blueExclamatory from "@/public/blueExclamatory.png";
import ProfilePicPop from "@/components/common/ProfilePicPop";
import { User } from "@/models/user.model";
import { getUserImageString } from "@/lib/utils";
import CustomDropdown from "@/components/LandingPage/CustomDropdown";
import { useTranslation } from "next-i18next";

import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const schema = yup
    .object({
        first_name: yup.string().required("First name is required"),
        last_name: yup.string().required("Last name is required"),
        email: yup.string().required("Email is required").email("Please provide valid email"),
        phone: yup
            .number()
            .test("len", "Must be exactly 10 digits", (val) => val?.toString().length === 10)
            .required()
            .typeError("Mobile number is required field"),

        // password_users: yup.string().required("Password is required field"),
        password: yup.string(),
        newPassword: yup.string().matches(/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/, {
            excludeEmptyString: true,
            message: "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        }),
        avatar_url: yup.string(),
        is_notifications_enabled: yup.boolean().required(),
         default_language: yup.string().required(),
    })
    .required();


const Settings = () => {
  const { user, mutateUser } = useUser();
  
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;

  const inputFieldLabels: string[] = t("settingsPage.profileForm.InputFieldLabel", { returnObjects: true });
  const fieldErrors: string[] = t("settingsPage.profileForm.Errors", { returnObjects: true });

  const languageOption: { value: string; label: string }[] = t("settingsPage.profileForm.LanguageOption", { returnObjects: true });

  useEffect(() => {
      let dir = router.locale == "ar" ? "rtl" : "ltr";
      let lang = router.locale == "ar" ? "ar" : "en";
      document.querySelector("html")?.setAttribute("dir", dir);
      document.querySelector("html")?.setAttribute("lang", lang);
  }, [router.locale]);

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
  } = useForm<User & { default_language: string; newPassword: string }>({
    resolver: yupResolver(schema),
    defaultValues: { ...user, password: "" },
  });

  useEffect(() => {
    // console.log(user);
    reset({ ...user, password: "" });
  }, [user, reset]);

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
  const toggleProfilePicPop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setShowProfilePicPop((prev) => !prev);
  };

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
    });
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

  // if (userIsLoading === "loading") return <div>loading</div>;

  return (
    <>
      <PageHeader
       content={t("settingsPage.pageHeader.Title")}
        className="border-none pb-[10px]"
        title="My Settings | MazExpress"
      />
      <ProfilePicPop show={showProfilePicPop} close={toggleProfilePicPop} />
      <Layout>
        <div className="w-full space-y-[30px] ">
          <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
            <Image src={blueExclamatory} alt="icon" width={16} height={16} />
            <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
            {t("settingsPage.LinkPPart1")} <span className="text-[#3672DF]">{t("settingsPage.LinkPPart2")} </span>
            </p>
          </div>
          <div>
            <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">
            {t("settingsPage.Title")}
            </p>
            <p className="text-[14px] text-[#525D72] leading-[21px] font-[500] ">
            {t("settingsPage.Discription")}
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
                    src={getUserImageString(user?.avatar_url)}
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
                    label={inputFieldLabels[0]}
                  name="first_name"
                  type="string"
                  register={register("first_name")}
                  error={errors.first_name?.message && fieldErrors[0]}
                />

                <ReactHookFormInput
                 label={inputFieldLabels[1]}
                  name=" last_name"
                  type="string"
                  register={register("last_name")}
                  error={errors.last_name?.message && fieldErrors[1]}
                />
              </div>

              <ReactHookFormInput
                 label={inputFieldLabels[2]}
                name="password"
                type={passwordType}
                register={register("password")}
                error={errors.password?.message}
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
              <ReactHookFormInput
               label={inputFieldLabels[3]}
                name="email"
                type="string"
                register={register("email")}
                error={errors.email?.message && fieldErrors[2]}
              />

              <ReactHookFormInput
                 label={inputFieldLabels[4]}
                name="newPassword"
                type={newPasswordType}
                register={register("newPassword")}
                error={errors.newPassword?.message && fieldErrors[3]}
                icon={{
                  isEnabled: true,
                  src: newPasswordType == "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                  onClick: toggleNewPasswordTypeHandler,
              }}
                autoComplete="new-password"
              />
            </div>
            <div className="flex-type1 w-full space-x-[20px]">
              <ReactHookFormInput
               label={inputFieldLabels[5]}
                name="phone"
                type="number"
                register={register("phone")}
                error={errors.phone?.message && fieldErrors[4]}
              />

              <CustomDropdown
                label={inputFieldLabels[6]}
                name="default_language_users"
                type="string"
                IconEnabled={true}
                register={register("default_language")}
                error={errors.default_language?.message}
                options={languageOption}
                value={getValues("default_language")}
                setValue={setValue}
                disabled={true}
                className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
              />
            </div>
            <div className="flex-type3 w-full space-x-[20px] mt-[10px] ">
              <div className="font-[500]">
                <p className="text-[14px] text-[#2B2B2B] leading-[19px] font-[600] ">
                {t("settingsPage.profileForm.notification.Title")}
                </p>
                <p className="text-[12px] text-[#525D72] leading-[18px] ">
                {t("settingsPage.profileForm.notification.Discription")}
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
              {t("settingsPage.profileForm.SubmitButton")}
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Settings;