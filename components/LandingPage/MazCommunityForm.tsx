import { user_enquiry } from "@/lib/emailContent/bodyContent";
import fetchJson from "@/lib/fetchServer";
import { sentMail } from "@/lib/sentMail";
import { createToast } from "@/lib/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import ReactHookFormInput from "../common/ReactHookFormInput";
import Map from "@/public/LibiyaMap.png";
import Image from "next/image";

const schema = yup
  .object({
    email: yup.string().required(),
    message: yup.string().required(),
    mobile: yup
      .number()
      .test(
        "len",
        "Must be exactly 9 digits",
        (val) => val?.toString().length === 9
      )
      .required()
      .typeError("Mobile number is required field"),
  })
  .required();

const MazCommunityForm = React.forwardRef<HTMLDivElement>((props, ref) => {
  const router = useRouter();
  const { t } = useTranslation("");
  const { locale } = router;

  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  var inputFieldLabel: string[] = t(
    "landingPage.communityForm.form.InputField",
    { returnObjects: true }
  );
  var fieldErrors: string[] = t("landingPage.communityForm.form.Errors", {
    returnObjects: true,
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    // console.log(data);
    const toList = [
      {
        type: "enquiry",
        toType: "admin",
        header: "New enquiry ✨",
        toName: "admin",
        bodyContent: user_enquiry(data.message),
        userName: "",
        userProfile: "",
        userContactNumber: data.mobile,
        userEmail: data?.email,
      },
    ];

    try {
      const result0 = await fetchJson(`/api/contact-form`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      createToast({
        type: "success",
        title: "success",
        message: `Enquiry submitted successfully`,
        timeOut: 2000,
      });
      try {
        sentMail(toList);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex flex-col justify-start items-center mt-[40px] md:mt-[100px] "
      ref={ref}
    >
      <div className="w-[95%] sm:w-[90%] xmd:w-[80%]  flex flex-col-reverse justify-start items-start min-[800px]:flex-type10 gap-x-[30px] gap-y-[15px] rounded-[8px] ">
        <div className="w-full min-[800px]:flex-1 h-full rounded-[16px]">
          <h1 className="w-full text-[20px] table_md:text-[23px] text-left text-[#18181B] font-[700]  leading-[30px] mb-[5px] ">
            {t("landingPage.communityForm.Title")}
          </h1>
          <p className="w-[100%] text-[16px] text-[#525D72] font-[500] leading-[18px] min-[900px]:leading-[25px] text-left mb-[5px]">
            {t("landingPage.communityForm.Description")}
          </p>
          <form
            className=" w-full rounded-[16px]  space-y-[20px] community_form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" flex flex-col justify-start items-start rounded-[5px]  ">
              <input
                id="email"
                type="string"
                {...register("email")}
                className="community_form w-full h-[55px] lg:h-[55px] xlg:h-[70px] text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none  bg-[#F5F5F5] px-[10px] "
                placeholder={inputFieldLabel[0]}
              />
              {errors.email && (
                <p className="text-[12px] text-[#f02849] leading-[16px] mt-[5px] ">
                  {fieldErrors[0]}
                </p>
              )}
            </div>

            <div className=" flex flex-col justify-start items-start rounded-[5px]  ">
              <input
                id="mobile"
                type="number"
                {...register("mobile")}
                className="community_form w-full h-[55px] lg:h-[55px] xlg:h-[70px] text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none  bg-[#F5F5F5] px-[10px] "
                placeholder={inputFieldLabel[1]}
              />
              {errors.mobile && (
                <p className="text-[12px] text-[#f02849] leading-[16px] mt-[5px] ">
                  {fieldErrors[1]}
                </p>
              )}
            </div>

            <div className={"w-full flex-type6"}>
              {/* <label
                htmlFor="Message"
                className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
              >
                {inputFieldLabel[2]}
              </label> */}
              <div
                className={
                  "flex flex-col justify-start items-start w-full border-[1px]  rounded-[4px] box-border h-[220px] relative bg-[#F5F5F5] py-[15px] px-[15px] " +
                  " "
                }
              >
                <p className="text-[15px] ">Message</p>
                <textarea
                  className="w-full h-full px-[5px] rounded-[5px] focus:outline-none text-[14px] text-[#2B2B2B] font-[600] leading-[19px] resize-none p-[10px] bg-transparent"
                  {...register("message")}
                  name="message"
                ></textarea>
                <button
                  type="submit"
                  className="px-[20px] h-[50px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
                >
                  {t("landingPage.communityForm.form.SubmitButton")}
                </button>
              </div>
              {errors.message?.message && (
                <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                  {fieldErrors[2]}
                </p>
              )}
            </div>
          </form>
        </div>
        <div className="relative w-[100%] max-[800px]:aspect-[1/0.5]  min-[800px]:flex-1 min-[800px]:h-[460px]  ">
          <Image src={Map} alt="logo" fill />
        </div>
      </div>
    </div>
  );
});
MazCommunityForm.displayName = "MazCommunityForm";
export default MazCommunityForm;
