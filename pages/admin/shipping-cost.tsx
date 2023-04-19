import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FieldError } from "react-hook-form";
import { GetServerSidePropsContext } from "next";

import fetchJson from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";
import { constants } from "buffer";
import { createToast } from "@/lib/toasts";

interface IProp {
    id?: string;
    per_kg: number;
    factor: number;
    name: string;
    status: string;
}
    
const schema = yup
    .object({
        per_kg: yup
            .number()
            .min(0, "Number must be greater than zero")
            .required()
            .typeError("per_kg is required field"),
        factor: yup
            .number()
            .min(0, "Number must be greater than zero")
            .required()
            .typeError("factor  is required field"),
    })
    .required();

const ShippingCost = () => {
    const [config, setConfig] = useState({});
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        reset,
        formState: { errors },
    } = useForm<IProp>({
        resolver: yupResolver(schema),
        defaultValues: config,
    });

    useEffect(() => {
        const getShippingConfig = async () => {
            const response: APIResponse<unknown> = await fetchJson(
                `/api/shipping/configs`,
                {
                    method: "GET",
                }
            );

            reset(response.data[0]);
        };
        getShippingConfig();
    }, [reset]);

    const submitHandler = async (data: IProp) => {
        console.log(data);
        /**
         * set shipping options
         *
         * POST   ---   /api/shipping/set
         *
         * body:
         *      per_kg: number (required) not tested ex: 3
         *      name: string (required) not tested ex: `black friday offer shipping`
         *      factor: number (required) not tested ex: 5000
         *      status: string (default: inactive) not tested ex: "active", "inactive"
         *
         * sample call
         */
        try {
            const response: APIResponse<unknown> = await fetchJson(
                `/api/shipping/set`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        data: {
                            per_kg: data.per_kg,
                            factor: data.factor,
                            name: data.name,
                            status: "active",
                        },
                        id: data.id,
                    }),
                }
            );
            if (response.ok) {
                createToast({
                    type: "success",
                    message: "Shipping cost configuration edit successful",
                    title: "Success",
                    timeOut: 1000,
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <p className="box-border text-[18px] text-[#2B2B2B] font-[700] leading-[25px] border-b-[1px] border-[#e3e3e3] pb-[15px] ">
                Shipping cost
            </p>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-row justify-start items-end mt-[50px] ">
                    <p className="box-border text-[22px] text-[#2B2B2B] font-[700] leading-[25px]  ">
                        Shipping cost:
                    </p>

                    <input
                        type="number"
                        name="per_kg"
                        {...register("per_kg")}
                        placeholder="cost per KG"
                        className="focus:outline-none border-b-[1px]  border-[#e3e3e3] ml-[10px] text-center "
                    />
                    <span>$</span>
                </div>
                {errors.per_kg && (
                    <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px] mt-[10px] ">
                        {"cost per kG is required field"}
                    </p>
                )}
                <div className="flex flex-row justify-start items-end mt-[50px] ">
                    <p className="box-border text-[22px] text-[#2B2B2B] font-[700] leading-[25px]  ">
                        Factor:
                    </p>
                    <input
                        name="factor"
                        {...register("factor")}
                        type="number"
                        className="focus:outline-none border-b-[1px]  border-[#e3e3e3] ml-[10px] text-center "
                    />
                </div>
                {errors.factor && (
                    <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px] mt-[10px] ">
                        {errors.factor.message}
                    </p>
                )}
                <button
                    className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] px-[20px] mt-[50px] "
                    type="submit"
                >
                    {"Submit"}
                </button>
            </form>
        </div>
    );
};

export default ShippingCost;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ["common"])),
        },
    };
}
