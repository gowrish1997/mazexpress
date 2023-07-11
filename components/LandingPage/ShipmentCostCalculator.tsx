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
import VerticalPlane from "@/public/VerticalPlane.png";
const shipDimensions = ["length", "width", "height"];

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
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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
      if (isButtonDisabled) {
        return; // Exit early if the button is already disabled
      }
      console.log(data);
      setIsButtonDisabled(true);
      if (data.length && (!data.width || !data.height)) {
        console.log("lenght is ther");
        if (!data.width) {
          setError("width", {
            type: "custom",
            message: "width is required field",
          });
          setIsButtonDisabled(false);
          return;
        }

        setError("height", {
          type: "custom",
          message: "height is required field",
        });
        setIsButtonDisabled(false);
        return;
      }
      if (data.width && (!data.length || !data.height)) {
        if (!data.length) {
          setError("length", {
            type: "custom",
            message: "length is required field",
          });
          setIsButtonDisabled(false);
          return;
        }
        setError("height", {
          type: "custom",
          message: "height is required field",
        });
        setIsButtonDisabled(false);
        return;
      }
      if (data.height && (!data.length || !data.width)) {
        if (!data.width) {
          setError("width", {
            type: "custom",
            message: "width is required field",
          });
          setIsButtonDisabled(false);
          return;
        }

        setError("length", {
          type: "custom",
          message: "length is required field",
        });
        setIsButtonDisabled(false);
        return;
      }

      if (!data.length && data.weight) {
        try {
          const result = await fetchJson(
            `/api/shipping/weightcalc?weight=${parseFloat(data.weight)?.toFixed(
              3
            )}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (result.data) {
            setMessage("");

            setCost(result.data[0].cost);
          } else {
            setCost(0);

            setMessage(result.msg);
          }
        } catch (error) {
          console.log(error);
        }
        setIsButtonDisabled(false);
        return;
      }
      try {
        const result = await fetchJson(`/api/shipping`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            weight: data.weight ? parseFloat(data.weight)?.toFixed(2) : 0,
          }),
        });

        if (result.data) {
          setMessage("");
          setCost(result.data[0].cost);
        } else {
          setCost(0);

          setMessage(result.msg);
        }
      } catch (error) {
        console.log(error);
      }
      setIsButtonDisabled(false);
    };

    return (
      <div
        className="w-full   flex flex-col  justify-start items-center   "
        ref={ref}
      >
        <div className="w-[95%] sm:w-[90%] xmd:w-[80%] min-[1650px]:w-[60%]  flex-type6 min-[900px]:flex-type3 flex-wrap bg-[#ECF3FB] rounded-[8px] mt-[40px] md:mt-[70px] max-[600px]:p-[15px] max-[900px]:p-[40px] ">
          <h1
            className={`min-[900px]:hidden w-full text-[23px] sm:text-[26px] ${
              router.locale == "en" ? "text-left" : "text-right"
            } text-[#18181B] font-[700] leading-[30px] table_md:leading-[35px] mb-[10px] `}
          >
            {t("landingPage.shipmentCostCalculator.Title")}
          </h1>
          <div className="relative w-[100%] max-[900px]:aspect-[1/0.5]  min-[900px]:flex-1 min-[900px]:h-[670px]  ">
            <Image src={VerticalPlane} fill alt="logo" />
          </div>

          <div className="w-full flex-1 h-full bg-[#FFFFFF]  min-[900px]:rounded-[16px] min-[900px]:py-[70px] py-[20px] px-[30px] min-[900px]:mx-[60px] space-y-[10px] min-[900px]:space-y-[25px] font-inter ">
            <h1
              className={`hidden min-[900px]:block w-full text-[23px] ${
                router.locale == "en" ? "text-left" : "text-right"
              } text-[#18181B] font-[700] leading-[30px] table_md:leading-[35px] mb-[10px] font-manrope `}
            >
              {t("landingPage.shipmentCostCalculator.Title")}
            </h1>
            <p className="mb-[10px]">
              {t("landingPage.shipmentCostCalculator.Description")}
            </p>
            <form
              className="flex-1 h-full space-y-[20px] "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={"w-full flex-type6"}>
                <label
                  htmlFor="Dimensions ( Optional )"
                  className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
                >
                  {inputField[2].label}
                </label>
                <div className="flex-type2">
                  {shipDimensions.map((data, index) => {
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
                              placeholder={dimensions[index]}
                              {...register(data)}
                              className="w-full h-full px-[5px] rounded-[5px] focus:outline-none"
                              name={data}
                            />
                          </div>
                          {!(index == dimensions.length - 1) && (
                            <div className="relative h-[5px] w-[6px] mx-[5px] ">
                              <Image src={Multiply} fill alt="logo" />
                            </div>
                          )}
                        </div>
                        {errors[data] && (
                          <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                            {errors[data]?.message as string}
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
                  render={({ field: { onChange, value } }) => (
                    <ReactHookFormInput
                      label={inputField[3].label}
                      name="weight"
                      type="number"
                      value={value}
                      onChange={onChange}
                      error={errors.weight && (fieldErrors[2] as string)}
                      className="rounded-l-[4px] rounded-r-none"
                    />
                  )}
                />

                <div
                  className={`flex justify-center items-center h-[46px] bg-[#525D72]  px-[10px] text-[16px] text-[#FFFFFF] font-[700] leading-[22px] mt-[23px] ${
                    locale == "en" ? "rounded-r-[4px]" : "rounded-l-[4px]"
                  } `}
                >
                  Kg
                </div>
              </div>

              {/* <button
                type="submit"
                className="w-full h-[46px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
              >
                {t("landingPage.shipmentCostCalculator.form.SubmitButton")}
              </button> */}

              <div className="w-full text-[14px] sm:text-[20px] text-[#121212] font-[700] leading-[50px]  mt-[20px] flex flex-row justify-between items-center ">
                <button
                  type="submit"
                  className=" h-[46px] bg-[#35C6F4] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px] px-[20px] disabled:bg-[#35C6F4]/50 relative "
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
                      <div className="w-[20px] h-[20px] border-[1px] border-white animate-spin rounded-full " />
                    </div>
                  )}
                  {t("landingPage.shipmentCostCalculator.form.SubmitButton")}
                </button>
                {cost ? (
                  <p className="capitalize text-[20px] text-[#000000] mb-[-10px] leading-[16px]">
                    $ {cost.toFixed(2)}
                  </p>
                ) : (
                  <p className="capitalize text-[20px] text-[#000000] mb-[-10px] leading-[16px]">
                    $ 00
                  </p>
                )}
              </div>
              {message && (
                <p className="text-[12px] text-[#f02849] leading-[16px]">
                  {message}
                </p>
              )}

              {/* <div
                className="w-full text-center text-[14px] text-[#35C6F4] font-[500] leading-[19px] cursor-pointer "
                onClick={() => {
                  reset();
                  setMessage("");
                  setCost(0);
                }}
              >
                {t("landingPage.shipmentCostCalculator.form.ResetButton")}
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
);
ShipmentCostCalculator.displayName = "ShipmentCostCalculator";
export default ShipmentCostCalculator;
