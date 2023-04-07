import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import ReactSwitch from "react-switch";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import Layout from "@/components/layout";
import CustomDropdown from "@/components/LandingPage/CustomDropdown";

import { useRouter } from "next/router";
import { createToast } from "@/lib/toasts";
import ProfilePicPop from "@/components/common/ProfilePicPop";
import blueExclamatory from "@/public/blueExclamatory.png";
import { User } from "@/models/user.model";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkPassword } from "@/lib/utils";
import { useTranslation } from "next-i18next";
import fetchJson from "@/lib/fetchServer";
import AuthCTX from "@/components/context/auth.ctx";
import { IWhiteListedUser } from "@/controllers/auth-ctr";
import { GetServerSidePropsContext } from "next";
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
  const user: IWhiteListedUser = useContext(AuthCTX)["active_user"];
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [showProfilePicPop, setShowProfilePicPop] = useState<boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;
  const inputFieldLabels: string[] = t(
    "settingsPage.profileForm.InputFieldLabel",
    { returnObjects: true }
  );
  const fieldErrors: string[] = t("settingsPage.profileForm.Errors", {
    returnObjects: true,
  });
  const languageOption: { value: string; label: string }[] = t(
    "settingsPage.profileForm.LanguageOption",
    { returnObjects: true }
  );
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
    resolver: yupResolver(schema),
    defaultValues: { ...user, password: "" },
  });

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
    console.log("settings submission", data);
    // let picked: Pick<
    //   User,
    //   | "first_name"
    //   | "last_name"
    //   | "email"
    //   | "phone"
    //   | "lang"
    //   | "password"
    //   | "avatar_url"
    //   | "is_notifications_enabled"
    // > & { newPassword: string } ;
    // // Object.assign(picked, data)

    try {
      // console.log(result);
      if (!passwordCheck && getValues("password").length > 0) {
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

      if (data.newPassword && data.newPassword.length > 0) {
        sendObj.password = data.newPassword;
        delete sendObj.newPassword;
      } else {
        delete sendObj.newPassword;
        delete sendObj.password;
      }

      const updateRes = await fetchJson(`/api/users/${user?.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendObj),
      });
      // console.log(updateRes)

      createToast({
        type: "success",
        title: "success",
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

  const updatePasswordChecker = async (e: string) => {
    // console.log(e.target.value);
    const reee = await checkPassword(e, user?.email!);
    // console.log(reee);
    if (reee) setPasswordCheck(true);
    else setPasswordCheck(false);
  };

  useEffect(() => {
    // console.log(user);
    reset({
      ...(user as unknown as Pick<
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
  }, [user, reset]);

  return (
    <>
      <PageHeader
        content="Settings"
        className="border-none pb-[10px]"
        title="My Settings | MazExpress"
      />
      <ProfilePicPop
        show={showProfilePicPop}
        close={toggleProfilePicPop}
        update={() => {}}
      />
      <Layout>
        <div className="w-full space-y-[30px] ">
          <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
            <Image src={blueExclamatory} alt="icon" width={16} height={16} />
            <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
              Here is a link to some fake information that contains crucial
              information, <span className="text-[#35C6F4]">Link here →</span>
            </p>
          </div>
          <div>
            <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">
              Account
            </p>
            <p className="text-[14px] text-[#525D72] leading-[21px] font-[500] ">
              Review and update your account details
            </p>
          </div>
          <form
            className="flex-type6 w-3/4 gap-y-[10px] "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-x-[20px] mb-[20px] ">
              <label htmlFor="user_profile">
                <div
                  className="w-[100px] h-[100px] relative rounded-full overflow-hidden cursor-pointer"
                  onClick={toggleProfilePicPop}
                >
                  <Image
                    src={user?.avatar_url || "/user-images/default_user.png"}
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
                  src:
                    passwordType === "password"
                      ? "/eyeIconClose.png"
                      : "/eyeIconOpen.png",
                }}
                onClick={togglePasswordTypeHandler}
                onChange={updatePasswordChecker}
                // disabled={true}
                // autoComplete="off"
              />
              {!passwordCheck ? (
                <div className="border border-red-600 block rounded-full absolute -right-7 top-[35px] flex items-center justify-center h-5 w-5">
                  <FontAwesomeIcon
                    icon={faX}
                    size="xs"
                    className="h-2 w-2 text-red-600"
                  />
                </div>
              ) : (
                <div className="border border-green-600 block rounded-full absolute -right-7 top-[35px] flex items-center justify-center h-5 w-5">
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="xs"
                    className="h-2 w-2 text-green-600"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row justify-start items-start w-full space-x-[20px]">
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
                  src:
                    newPasswordType === "password"
                      ? "/eyeIconClose.png"
                      : "/eyeIconOpen.png",
                }}
                onClick={toggleNewPasswordTypeHandler}
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

              <CustomDropdown
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
              className="w-1/2 h-[46px] border-[1px] bg-[#35C6F4] rounded-[4px] text-[#FFFFFF] mt-[10px] "
            >
              Update settings
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Settings;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  // console.log("redders", ctx.req.cookies);
  if (ctx.req.cookies.is_admin !== "true") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
  };
}
