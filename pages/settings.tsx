import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import blueExclamatory from "@/public/blueExclamatory.png";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHeader from "@/components/common/PageHeader";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import Layout from "@/components/layout";
import useUser from "@/lib/hooks/useUser";
import { User } from "@/models/user.model";
import { checkPassword, getUserImageString } from "@/lib/utils";
import { createToast } from "@/lib/toasts";
import ProfilePicPop from "@/components/common/ProfilePicPop";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

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

    password: yup.string().required("Password is required field"),
    newPassword: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    // newPassword: yup
    //   .string()
    //   .matches(/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/, {
    //     excludeEmptyString: true,
    //     message:
    //       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    //   }),
    avatar_url: yup.string(),
    is_notifications_enabled: yup.boolean().required(),
    lang: yup.string().required(),
  })
  .required();

const Settings = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;

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
  } = useForm<User & { newPassword: string }>({
    resolver: yupResolver(schema),
    defaultValues: { ...user, password: "" },
  });

  useEffect(() => {
    // console.log(user);
    reset({ ...user, password: "" });
  }, [user, reset]);

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

  const onSubmit: SubmitHandler<User & { newPassword: string }> = async (
    data
  ) => {
    console.log("settings submission", data);
    try {
      // console.log(result);
      if (!passwordCheck) {
        createToast({
          type: "error",
          title: "An error occurred",
          message: "Old password is wrong",
          timeOut: 3000,
        });
        return;
      }
      createToast({
        type: "success",
        title: "Success",
        message: "Updated user.",
      });
    } catch (err) {
      console.error(err);
      createToast({
        type: "error",
        title: "An error occurred",
        message: "Check console for more info.",
        timeOut: 3000,
      });
    }
  };

  const updatePasswordChecker = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(e.target.value);
    const reee = await checkPassword(e.target.value, user?.id!);
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
      <ProfilePicPop show={showProfilePicPop} close={toggleProfilePicPop} update={mutateUser} />
      <Layout>
        <div className="w-full space-y-[30px] ">
          <div className="flex-type1 gap-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
            <Image src={blueExclamatory} alt="icon" width={16} height={16} />
            <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
              {t("settingsPage.LinkPPart1")}{" "}
              <span className="text-[#35C6F4]">
                {t("settingsPage.LinkPPart2")}{" "}
              </span>
            </p>
          </div>
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
                    src={user?.avatar_url || '/user-images/default_user.png'}
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
            <div className="flex w-full gap-x-[20px] items-center relative">
              <div className="flex-type2 gap-x-[10px] w-full items-center">
                <ReactHookFormInput
                  label={inputFieldLabels[0]}
                  name="first_name"
                  type="string"
                  register={register("first_name")}
                  error={errors.first_name?.message && fieldErrors[0]}
                />

                <ReactHookFormInput
                  label={inputFieldLabels[1]}
                  name="last_name"
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
              {!passwordCheck ? (
                <div className="border border-red-600 block rounded-full absolute -right-7 bottom-[14px] flex items-center justify-center h-5 w-5">
                  <FontAwesomeIcon
                    icon={faX}
                    size="xs"
                    className="h-2 w-2 text-red-600"
                  />
                </div>
              ) : (
                <div className="border border-green-600 block rounded-full absolute -right-7 bottom-[14px] flex items-center justify-center h-5 w-5">
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="xs"
                    className="h-2 w-2 text-green-600"
                  />
                </div>
              )}
            </div>
            <div className="flex-type2 w-full gap-x-[20px]">
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
                  src:
                    newPasswordType === "string"
                      ? "/eyeIconOpen.png"
                      : "/eyeIconClose.png",
                }}
                onClick={toggleNewPasswordTypeHandler}
                autoComplete="new-password"
              />
            </div>
            <div className="flex-type2 w-full gap-x-[20px]">
              <ReactHookFormInput
                label={inputFieldLabels[5]}
                name="phone"
                type="number"
                register={register("phone")}
                error={errors.phone?.message && fieldErrors[4]}
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
            <div className="flex-type3 w-full space-x-[20px] mt-[10px] ">
              <div className="font-[500]">
                <p className="text-[14px] text-[#2B2B2B] leading-[19px] font-[600] ">
                  {t("settingsPage.profileForm.notification.Title")}
                </p>
                <p className="text-[12px] text-[#525D72] leading-[18px] ">
                  {t("settingsPage.profileForm.notification.Description")}
                </p>
              </div>

              <Controller
                name="is_notifications_enabled"
                control={control}
                defaultValue={user?.is_notifications_enabled!}
                render={({ field: { onChange, value } }) => (
                  <ReactSwitch
                    onChange={onChange}
                    checked={value}
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