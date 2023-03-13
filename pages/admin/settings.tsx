import React, { ChangeEvent, useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import ReactSwitch from "react-switch";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import Layout from "@/components/layout";
import CustomDropDown from "@/components/common/CustomDropDown";
import useUser from "@/lib/hooks/useUser";
import { useRouter } from "next/router";
import { createToast } from "@/lib/toasts";
import ProfilePicPop from "@/components/common/ProfilePicPop";
import blueExclamatory from '@/public/blueExclamatory.png';
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

    // password: yup.string().required("Password is required field"),
    password: yup.string(),
    newPassword: yup.string(),
    //   .min(8, "Password must be 8 characters long")
    //   .matches(/[0-9]/, "Password requires a number")
    //   .matches(/[a-z]/, "Password requires a lowercase letter"),
    //   .matches(/[A-Z]/, "Password requires an uppercase letter")
    //   .matches(/[^\w]/, "Password requires a symbol"),
    avatar_url: yup.string(),
    is_notifications_enabled: yup.boolean().required(),
    //  default_language: yup.string().required(),
  })
  .required();

const Settings = () => {
  const { user, mutateUser } = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [showProfilePicPop, setShowProfilePicPop] = useState<boolean>(false)

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<User & {default_language: string, newPassword: string}>({
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
    e.preventDefault()
    e.stopPropagation()
    setShowProfilePicPop((prev) => !prev)
  };

  

  const onSubmit: SubmitHandler<User & {default_language: string, newPassword: string}> = async (data) => {
    console.log(data);
    createToast({
      title: "Success",
      type: "success",
      message: "Updated user info.",
      timeOut: 2000,
      onClick: () => alert("click"),
    });
    // let updateObj = { ...data };
    // delete updateObj.newPassword;
    // delete updateObj.password;
    // delete updateObj.default_language;
    // updateObj.id = user?.id;

    // if (user && user.id) {
    //   // update user
    //   try {
    //     mutateUser(
    //       await fetchJson(`/api/users?id=${user.id}`, {
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

  useEffect(() => {
    // console.log(user);
    reset({ ...user, password: "" });
  }, [user, reset]);
  // if (userIsLoading) return <div>loading</div>;

return (
  <>
      <PageHeader content="Settings" className="border-none pb-[10px]" title="My Settings | MazExpress" />
      <ProfilePicPop show={showProfilePicPop} close={toggleProfilePicPop} />
      <Layout>
          <div className="w-full space-y-[30px] ">
              <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
                  <Image src={blueExclamatory} alt="icon" width={16} height={16} />
                  <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                      Here is a link to some fake information that contains crucial information, <span className="text-[#3672DF]">Link here →</span>
                  </p>
              </div>
              <div>
                  <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">Account</p>
                  <p className="text-[14px] text-[#525D72] leading-[21px] font-[500] ">Review and update your account details</p>
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
                    src={"/user-images/" + user?.avatar_url}
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
                  src: ''
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
                  src: ''
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
};

export default Settings;
