import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError } from "react-hook-form";
import * as yup from "yup";
import landpageImage from "../../public/landpageImage.png";
import CusotmDropdown from "./CustomDropdown";
import ReactHookFormInput from "../common/ReactHookFormInput";
import Multiply from "../../public/multiply.png";
import fetchJson from "@/lib/fetchServer";

const schema = yup
    .object({
        // warehouseAddress_address: yup.string().required(),
        // city_name: yup.string().required(),
        length: yup
            .mixed()
            .test(
                "is-valid-age",
                "Age must be a number between 18 and 99",
                (value) => {
                    return true;
                }
            ),
        width: yup
            .mixed()
            .test(
                "is-valid-age",
                "Age must be a number between 18 and 99",
                (value) => {
                    return true;
                }
            ),
        height: yup
            .mixed()
            .test(
                "is-valid-age",
                "Age must be a number between 18 and 99",
                (value) => {
                    return true;
                }
            ),
        // length: yup.number().typeError(),
        // // when("width", {
        // //     is: (width) => width,
        // //     then: yup
        // //         .number()
        // //         .required(
        // //             "Length is required when length and widtht are entered"
        // //         ),
        // // }),

        // width: yup.number().when("length", {
        //     is: (length) => length,
        //     then: yup
        //         .number()
        //         .required(
        //             "Width is required when length and height are entered"
        //         )
        //         .typeError(
        //             "Width is required when length and height are entered"
        //         ),
        // }),

        // height: yup.number().when(["length", "width"], {
        //     is: (width, length) => length || width,
        //     then: yup
        //         .number()
        //         .required(
        //             "Height is required when length and width are entered"
        //         )
        //         .typeError(
        //             "height is required when length and height are entered"
        //         ),
        // }),
        weight: yup
            .mixed()
            .test(
                "is-valid-age",
                "Age must be a number between 18 and 99",
                (value) => {
                    return true;
                }
            ),
    })
    .required();

const ShipmentCostCalculator = React.forwardRef<HTMLDivElement>(
    (props, ref) => {
        const router = useRouter();
        const { t } = useTranslation("");
        const { locale } = router;
        const [cost, setCost] = useState(0);
        const [message, setMessage] = useState("");
        var inputField: { placeholder: string; label: string }[] = t(
            "landingPage.shipmentCostCalculator.form.InputField",
            { returnObjects: true }
        );
        var fieldErrors: string[] = t(
            "landingPage.shipmentCostCalculator.form.Errors",
            { returnObjects: true }
        );
        var dimensions: string[] = t(
            "landingPage.shipmentCostCalculator.form.Dimensions",
            { returnObjects: true }
        );

        const {
            register,
            handleSubmit,
            setError,
            getValues,
            control,
            setValue,
            reset,

            formState: { errors },
        } = useForm<any>({
            defaultValues: {
                weight: 0.5,
                // address_1_addresses: "V5RH+HVQ",
                // address_2_addresses: "Amr Bin al A'ss St",
                // city_addresses: "Tripoli",
                // country_addresses: "Libya",
                // default_addresses: "on",
                // phone_addresses: 214441792,
                // tag_addresses: "Al Mshket Hotel",
            },
            resolver: yupResolver(schema),
        });

        const onSubmit: SubmitHandler<any> = async (data) => {
            console.log(data);
            if (data.length && (!data.width || !data.height)) {
                if (!data.width) {
                    setError("width", {
                        type: "custom",
                        message: "width is required field",
                    });
                    return;
                }

                setError("height", {
                    type: "custom",
                    message: "height is required field",
                });
                return;
            }
            if (data.width && (!data.length || !data.height)) {
                if (!data.length) {
                    setError("length", {
                        type: "custom",
                        message: "length is required field",
                    });
                    return;
                }
                setError("height", {
                    type: "custom",
                    message: "height is required field",
                });

                return;
            }
            if (data.height && (!data.length || !data.width)) {
                if (!data.width) {
                    setError("width", {
                        type: "custom",
                        message: "width is required field",
                    });
                    return;
                }

                setError("length", {
                    type: "custom",
                    message: "length is required field",
                });
                return;
            }

            if (!data.length && data.weight) {
                console.log("contain weight");
                console.log(parseFloat(data.weight)?.toFixed(2));
                try {
                    const result = await fetchJson(
                        `/api/shipping/weightcalc?weight=${parseFloat(
                            data.weight
                        )?.toFixed(3)}`,
                        {
                            method: "GET",
                            headers: { "Content-Type": "application/json" },
                        }
                    );

                    if (result.data) {
                        setMessage("");
                        console.log(result.data[0].cost);
                        setCost(result.data[0].cost);
                    } else {
                        setCost(0);
                        console.log(result.msg);
                        setMessage(result.msg);
                    }
                } catch (error) {
                    console.log(error);
                }
                return;
            }
            try {
                console.log(" not contain weight");
                const result = await fetchJson(`/api/shipping`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...data,
                        weight: data.weight
                            ? parseFloat(data.weight)?.toFixed(2)
                            : 0,
                    }),
                });

                if (result.data) {
                    setMessage("");
                    setCost(result.data[0].cost);
                } else {
                    setCost(0);
                    console.log(result.msg);
                    setMessage(result.msg);
                }
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <div
                className="w-full   flex flex-col  justify-start items-center   "
                ref={ref}
            >
                <div className="w-[95%] flex-type6 xmd:flex-type3 p-[10px] md:p-[70px] flex-wrap space-y-[40px] bg-[#F5F5F5] rounded-[8px] mt-[40px] md:mt-[70px] ">
                    <div className="flex-1 space-y-[15px] ">
                        <h1 className="text-[20px] sm:text-[24px] text-[#121212] font-[700] leading-[50px] ">
                            {" "}
                            {t("landingPage.shipmentCostCalculator.Title")}
                        </h1>
                        <div className="relative h-[290px] w-[280px] sm:w-[334px] ">
                            <Image src={landpageImage} fill alt="logo" />
                        </div>
                        <p
                            className={` w-[90%] text-[16px] text-[#525D72] font-[500] leading-[25.5px]   `}
                        >
                            {t(
                                "landingPage.shipmentCostCalculator.Description"
                            )}
                        </p>
                    </div>
                    <div className="flex-1 h-full bg-[#FFFFFF] rounded-[16px] py-[50px] px-[30px] ">
                        <form
                            className="flex-1 h-full space-y-[20px] "
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* <CusotmDropdown
                                label={inputField[0].label}
                                name="warehouseAddress_address"
                                type="string"
                                IconEnabled={false}
                                register={register("warehouseAddress_address")}
                                error={
                                    errors.warehouseAddress_address &&
                                    (fieldErrors[0] as string)
                                }
                                // options={[
                                //     { value: "gowrish", label: "gowrish" },
                                //     { value: "gowrish", label: "gowrish" },
                                // ]}
                                placeHolder={inputField[0].placeholder}
                                disabled={true}
                                value={getValues("warehouseAddress_address")}
                                setValue={setValue}
                            />
                            <CusotmDropdown
                                label={inputField[1].label}
                                name="city_name"
                                type="string"
                                IconEnabled={false}
                                register={register("city_name")}
                                error={
                                    errors.city_name &&
                                    (fieldErrors[1] as string)
                                }
                                // options={[
                                //     { value: "gowrish", label: "gowrish" },
                                //     { value: "gowrish", label: "gowrish" },
                                // ]}
                                placeHolder={inputField[1].placeholder}
                                disabled={true}
                                value={getValues("city_name")}
                                setValue={setValue}
                            /> */}
                            <div className={"w-full flex-type6"}>
                                <label
                                    htmlFor="Dimensions ( Optional )"
                                    className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
                                >
                                    {inputField[2].label}
                                </label>
                                <div className="flex-type2">
                                    {dimensions.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="flex-type1">
                                                    <div
                                                        className={
                                                            "w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative"
                                                        }
                                                    >
                                                        <input
                                                            type="number"
                                                            placeholder={data}
                                                            {...register(data)}
                                                            className="w-full h-full px-[5px] rounded-[5px] focus:outline-none"
                                                            name={data}
                                                        />
                                                    </div>
                                                    {!(
                                                        index ==
                                                        dimensions.length - 1
                                                    ) && (
                                                        <div className="relative h-[5px] w-[6px] mx-[5px] ">
                                                            <Image
                                                                src={Multiply}
                                                                fill
                                                                alt="logo"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                {errors[data] && (
                                                    <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                                                        {
                                                            errors[data]
                                                                ?.message as string
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex-type1">
                                <Controller
                                    name="weight"
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <ReactHookFormInput
                                            label={inputField[3].label}
                                            name="weight"
                                            type="number"
                                            value={value}
                                            onChange={onChange}
                                            error={
                                                errors.weight &&
                                                (fieldErrors[2] as string)
                                            }
                                            className="rounded-l-[4px] rounded-r-none"
                                        />
                                    )}
                                />

                                <div
                                    className={`flex justify-center items-center h-[46px] bg-[#525D72]  px-[10px] text-[16px] text-[#FFFFFF] font-[700] leading-[22px] mt-[23px] ${
                                        locale == "en"
                                            ? "rounded-r-[4px]"
                                            : "rounded-l-[4px]"
                                    } `}
                                >
                                    Kg
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-[46px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
                            >
                                {t(
                                    "landingPage.shipmentCostCalculator.form.SubmitButton"
                                )}
                            </button>
                            <div
                                className="w-full text-center text-[14px] text-[#35C6F4] font-[500] leading-[19px] cursor-pointer "
                                onClick={() => {
                                    reset();
                                    setMessage("");
                                    setCost(0);
                                }}
                            >
                                {t(
                                    "landingPage.shipmentCostCalculator.form.ResetButton"
                                )}
                            </div>
                        </form>
                        <div>
                            <p className="text-[14px] sm:text-[20px] text-[#121212] font-[700] leading-[50px] mb-[5px] mt-[20px] ">
                                Shipment cost:
                                {cost ? (
                                    <span className="text-[#35C6F4] ml-[5px] ">
                                        {cost.toFixed(2)} $
                                    </span>
                                ) : (
                                    <span className="capitalize ml-[5px] text-[14px] text-[#f02849] mb-[-10px] leading-[16px]">
                                        {message}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);
ShipmentCostCalculator.displayName = "ShipmentCostCalculator";
export default ShipmentCostCalculator;
