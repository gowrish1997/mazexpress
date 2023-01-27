import React, { useState } from "react";
import PageHeader from "@/components/orders/PageHeader";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import Layout from "@/components/layout";
import ReactSwitch from "react-switch";
import useUser from "@/lib/useUser";
export interface IInputs {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: Number;
  password: string;
  newPassword: string;
  notificaton: boolean;
  language: string;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    email: yup.string().required(),
  })
  .required();

const Settings = () => {
  const { user, mutateUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({
    resolver: yupResolver(schema),
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

  const onSubmit: SubmitHandler<IInputs> = (data) => {

  };

  return (
    <>
      <PageHeader content="Settings" className="border-none pb-[10px]" />
      <Layout>
        <div className="w-full space-y-[30px] ">
          <div className="flex-type1 space-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
            <Image
              src="/blueexclamatory.png"
              alt="icon"
              width={16}
              height={16}
            />
            <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
              Here is a link to some fake information that contains crucial
              information, <span className="text-[#3672DF]">Link here →</span>
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

          <div className="flex-type1 gap-x-[20px] ">
            <Image src="/profile.png" alt="profile" height={100} width={100} />
            <div className="flex-type6">
              <p className="text-[24px] text-[#2B2B2B] leading-[32px] font-[600] ">
                {user?.first_name_users} {user?.last_name_users}
              </p>
              <p className="text-[16px] text-[#2B2B2B] leading-[24px] font-[500] ">
                {user?.email_users}
              </p>
            </div>
          </div>
          <form
            className="flex-type6 w-3/4 gap-y-[10px] "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex-type1 w-full space-x-[20px] ">
              <div className="flex-type2 space-x-[10px] w-full">
                <ReactHookFormInput
                  label="First name"
                  name="firstName"
                  type="string"
                  register={register("firstName")}
                />

                <ReactHookFormInput
                  label="Last name"
                  name="lastName"
                  type="string"
                  register={register("lastName")}
                />
              </div>

              <ReactHookFormInput
                label="Password"
                name="password"
                type={passwordType}
                register={register("password")}
                dropDownIcon={{
                  iconIsEnabled: true,
                  iconSrc:
                    passwordType == "string"
                      ? "/eyeIconOpen.png"
                      : "/eyeIconClose.png",
                }}
                onClick={togglePasswordTypeHandler}
              />
            </div>
            <div className="flex-type1 w-full space-x-[20px]">
              <ReactHookFormInput
                label="Email"
                name="email"
                type="email"
                register={register("email")}
              />

              <ReactHookFormInput
                label="New Password"
                name="newPassword"
                type={newPasswordType}
                register={register("newPassword")}
                dropDownIcon={{
                  iconIsEnabled: true,
                  iconSrc:
                    newPasswordType == "string"
                      ? "/eyeIconOpen.png"
                      : "/eyeIconClose.png",
                }}
                onClick={toggleNewPasswordTypeHandler}
              />
            </div>
            <div className="flex-type1 w-full space-x-[20px]">
              <ReactHookFormInput
                label="Mobile number"
                name="mobileNumber"
                type="number"
                register={register("mobileNumber")}
              />

              <ReactHookFormInput
                label="Language"
                name="language"
                type="string"
                register={register("language")}
              />
            </div>
            <div className="flex-type3 w-full space-x-[20px] mt-[10px] ">
              <div className="font-[500]">
                <p className="text-[14px] text-[#2B2B2B] leading-[19px] font-[600] ">
                  Notifications
                </p>
                <p className="text-[12px] text-[#525D72] leading-[18px] ">
                  Dummy and update your account details
                </p>
              </div>
              <ReactSwitch
                onChange={() => {}}
                checked={true}
                checkedIcon={false}
                uncheckedIcon={false}
                width={36}
                height={20}
                handleDiameter={12}
                offColor={"#D9D9D9"}
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
