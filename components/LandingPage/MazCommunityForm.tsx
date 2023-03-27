import React from "react";
import ReactHookFormInput from "../common/ReactHookFormInput";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError } from "react-hook-form";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";

const schema = yup
    .object({
        user_email: yup.string().required(),
        user_message: yup.string().required(),
        user_mobileNumber: yup
            .number()
            .required()
            .typeError("Mobile number is required field"),
    })
    .required();

const MazCommunityForm = () => {
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
        console.log(data);

        //   console.log(address);

        // add address
    };

    return (
        <div className="flex flex-col justify-start items-center mt-[40px] md:mt-[100px] ">
            <div className="w-[80%] md:w-[50%] xmd:w-[32%] flex flex-col justify-start items-center gap-y-[15px] ">
                <h1 className="text-[40px] text-center text-[#18181B] font-[700] leading-[45px] ">
                    {t("landingPage.communityForm.Title")}
                </h1>
                <p className="w-[85%] text-[16px] text-[#525D72] font-[500] leading-[25px] text-center ">
                    {t("landingPage.communityForm.Description")}
                </p>
                <form
                    className=" w-full bg-[#FFFFFF] rounded-[16px]  space-y-[20px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="user_email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <ReactHookFormInput
                                onChange={onChange}
                                label={inputFieldLabel[0]}
                                type="email"
                                value={value}
                                error={
                                    errors.user_email?.message && fieldErrors[0]
                                }
                                className="rounded-l-[4px] rounded-r-none"
                            />
                        )}
                    />
                    <Controller
                        name="user_mobileNumber"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <ReactHookFormInput
                                onChange={onChange}
                                label={inputFieldLabel[1]}
                                type="number"
                                value={value}
                                error={
                                    errors.user_mobileNumber && fieldErrors[1]
                                }
                                className="rounded-l-[4px] rounded-r-none"
                            />
                        )}
                    />

                    <div className={"w-full flex-type6"}>
                        <label
                            htmlFor="Message"
                            className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
                        >
                            {inputFieldLabel[2]}
                        </label>
                        <div
                            className={
                                "flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[100px] relative" +
                                " "
                            }
                            style={
                                {
                                    // borderColor: errors.user_message?.message ? "#f02849" : "",
                                }
                            }
                        >
                            <textarea
                                className="w-full h-full px-[5px] rounded-[5px] focus:outline-none text-[14px] text-[#2B2B2B] font-[600] leading-[19px] resize-none p-[5px]"
                                {...register("user_message")}
                                name="user_message"
                            ></textarea>
                        </div>
                        {errors.user_message?.message && (
                            <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                                {fieldErrors[2]}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full h-[46px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
                    >
                        {t("landingPage.communityForm.form.SubmitButton")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MazCommunityForm;
