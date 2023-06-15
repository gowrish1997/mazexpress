import { user_enquiry } from "@/lib/emailContent/bodyContent";
import fetchJson from "@/lib/fetchServer";
import { sentMail } from "@/lib/sentMail";
import { createToast } from "@/lib/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Customer from "../../public/customer.png";

const content = [
  {
    value: "500+",
    title: "Global customers",
    desc: "We’ve helped over 4,000 amazing global companies.",
  },
  {
    value: "100+",
    title: "Success rate",
    desc: "Our customers have reported ~100% Satisfaction rate.",
  },
  {
    value: "2k+",
    title: "Orders delivered",
    desc: "Our app has been downloaded over 10k times.",
  },
];

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

const OurCustomer = React.forwardRef<HTMLDivElement>((props, ref) => {
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
      className=" mt-[40px] md:mt-[100px] flex flex-col justify-center items-center relative "
      ref={ref}
    >
      <div
        className={`w-[95%] sm:w-[90%] xmd:w-[80%]   min-[900px]:flex-type10 py-[25px] add_sm:py-[40px]  xmd:py-[60px] rounded-[30px] `}
        style={{
          backgroundImage: `url('/customer.png ')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-[100%] table_md:w-[80%] xmd:w-[70%] flex flex-col justify-start items-center gap-[20px] add_sm:gap-[35px] xmd:gap-y-[50px] px-[10px]  ">
          <h1 className="text-[22px] xmd:text-[40px] add_sm:text-[32px] text-[#FFFFFF] leading-[27.5px] font-[700]  ">
            Our customers choose us
          </h1>
          <div className="w-full flex flex-row justify-center items-center gap-x-[10px] sm:gap-x-[40px] ">
            {content.map((data) => {
              return (
                <div className="flex flex-col justify-start items-center gap-y-[6px] sm:gap-y-[10px] ">
                  <p className="text-[26px] add_sm:text-[45px] xmd:text-[60px] text-[#FFFFFF] leading-[37px] add_sm:leading-[56px] xmd:leading-[72px] font-[800]">
                    {data.value}
                  </p>
                  <p className="text-center add_sm:text-[16px] text-[12px] xmd:text-[18px] text-[#FFFFFF] leading-[17px] add_sm:leading-[23px]  xmd:leading-[28px] font-[600]">
                    {data.title}
                  </p>
                  <p className="text-center text-[10px] add_sm:text-[14px] xmd:text-[16px] text-[#2B2B2B] leading-[16px] add_sm:leading-[21px] xmd:leading-[24px] font-[600]">
                    {data.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[65%] min-[700px]:w-[55%] min-[1400px]:w-[45%] flex flex-row justify-between ">
        <div
          className="w-[80px] h-[40px] add_sm:w-[140px] add_sm:h-[70px] xmd:w-[200px] xmd:h-[100px] bg-[#18B9EF]"
          style={{ borderRadius: "0px 0px 100px 100px " }}
        />
        <div
          className="w-[80px] h-[40px] add_sm:w-[140px] add_sm:h-[70px] xmd:w-[200px] xmd:h-[100px] bg-[#18B9EF]"
          style={{ borderRadius: "0px 0px 100px 100px " }}
        />
      </div>
    </div>
  );
});
OurCustomer.displayName = "OurCustomer";
export default OurCustomer;
