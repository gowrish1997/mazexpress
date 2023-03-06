import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInWithMail from "./LogInWithMail";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { useRouter } from "next/router";
import useUser from "@/lib/useUser";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { IUser } from "@/models/user.interface";
import { useTranslation } from "next-i18next";
import user from "@/pages/api/auth/user";

type Inputs = {
    password: string;
    email: string;
};

const schema = yup
    .object({
        email: yup.string().required("Email is required").email("please include @ in the email"),
        password: yup.string().required("Password is required field"),
    })
    .required();

const LogInComponent = (props: any) => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;
    const [errorMsg, setErrorMsg] = useState("");

    const inputFieldLabel: string[] = t("loginView.form.InputField", { returnObjects: true });
    const inputFieldErrors: string[] = t("loginView.form.Errors", { returnObjects: true });
    const submitButtons: string[] = t("loginView.form.SubmitButton", { returnObjects: true });
    const discription: string[] = t("loginView.form.Discription", { returnObjects: true });

    const { user, mutateUser } = useUser({ redirectIfFound: true });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // console.log(data);
        try {
            const result: IUser = await fetchJson("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            // console.log(result);
            await mutateUser(result, false);

            // if (user?.is_admin_users === 1) {
            //   // console.log('push to admin')
            //   router.push("/admin");
            // } else {
            //   // console.log('push to home')
            //   router.push("/");
            // }
        } catch (error) {
            if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
            } else {
                console.error("An unexpected error happened:", error);
            }
        }
    };

    const [passwordType, setPasswordType] = useState("password");

    const togglePasswordTypeHandler = () => {
        if (passwordType === "string") {
            setPasswordType("password");
        } else {
            setPasswordType("string");
        }
    };

    // useEffect(() => {
    //   console.log()
    // })

    return (
        <div className={`w-[400px] space-y-[20px] ${locale == "en" ? "-ml-[100px]" : "-mr-[100px]"} `}>
            <h1 className="text-[26px] text-[#000000] font-[600] leading-[36px] text-left ">{t("loginView.Title")}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-type6 gap-y-[12px] ">
                <ReactHookFormInput label={inputFieldLabel[0]} name="email" type="string" register={register("email")} error={errors.email?.message && inputFieldErrors[0]} />

                <ReactHookFormInput
                    label={inputFieldLabel[1]}
                    name="password"
                    type={passwordType}
                    icon={{
                        isEnabled: true,
                        src: passwordType === "string" ? "/eyeIconOpen.png" : "/eyeIconClose.png",
                    }}
                    register={register("password")}
                    onClick={togglePasswordTypeHandler}
                    error={errors.password?.message && inputFieldErrors[1]}
                />
                <button className="text-[14px] text-[#3672DF] font-[500] leading-[13px] cursor-pointer" onClick={() => props.switch(2)}>
                  {inputFieldLabel[2]}
                </button>
                <button type="submit" className="w-full h-[46px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] ">
                    {submitButtons[0]}
                </button>
            </form>
            <div className="text-center text-[14px] text-[#8794AD] font-[500] leading-[13px] space-y-[16px] ">
                <p>
                    {discription[0]} <span className="text-[#0057FF]">{discription[1]}</span>
                </p>
                <p className="">
                    {discription[2]}
                    <span className="text-[#0057FF] cursor-pointer" onClick={() => props.switch(0)}>
                      {discription[3]}
                    </span>
                </p>
            </div>
            <LogInWithMail />
        </div>
    );
};

export default LogInComponent;
