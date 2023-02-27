import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldError } from "react-hook-form";
import * as yup from "yup";
import landpageImage from "../../public/landpageImage.png";
import ShipmentCalculatorDropdown from "./ShipmentCalculatorDropdown";
import ReactHookFormInput from "../common/ReactHookFormInput";
import Multiply from "../../public/multiply.png";

const dimensions = ["Length", "Width", "Height"];

const schema = yup
  .object({
    warehouseAddress_address: yup.string().required(),
    city_name: yup.string().required(),
    package_weight: yup.number().required(),
  })
  .required();

const ShipmentCalculator = React.forwardRef<HTMLDivElement>((props, ref) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      package_weight: 0.5,
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

    //   console.log(address);

    // add address
  };

  return (
    <div
      className="flex-type3 bg-[#F5F5F5] rounded-[8px] mt-[120px] p-[70px]"
      ref={ref}
    >
      <div className="flex-1 space-y-[15px] ">
        <h1 className="text-[24px] text-[#121212] font-[700] leading-[50px] ">
          Shipment Cost Calculator
        </h1>
        <div className="relative h-[290px] w-[334px] ">
          <Image src={landpageImage} fill alt="logo" />
        </div>
        <p className=" w-[85%] text-[16px] text-[#525D72] font-[500] leading-[25.5px] ">
          Drop off and pick up packages from a location that’s open when you
          need it. Drop off and pick up packages from a location that’s open
          when you need it. Drop off and pick up packages from a location that’s
          open when you need it. Drop off and pick up packages from a location
          that’s open when you need it
        </p>
      </div>
      <form
        className="flex-1 h-full bg-[#FFFFFF] rounded-[16px] py-[50px] px-[30px] space-y-[20px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <ShipmentCalculatorDropdown
          label="Pick - Up Warehouse address"
          name="warehouseAddress_address"
          type="string"
          IconEnabled={true}
          register={register("warehouseAddress_address")}
          error={errors.warehouseAddress_address as FieldError}
          options={[
            { value: "gowrish", label: "gowrish" },
            { value: "gowrish", label: "gowrish" },
          ]}
          placeHolder="Warehouse address"
          value={getValues("warehouseAddress_address")}
          setValue={setValue}
        />
        <ShipmentCalculatorDropdown
          label="Delivery City"
          name="city_name"
          type="string"
          IconEnabled={true}
          register={register("city_name")}
          error={errors.city_name as FieldError}
          options={[
            { value: "gowrish", label: "gowrish" },
            { value: "gowrish", label: "gowrish" },
          ]}
          placeHolder="city"
          value={getValues("city_name")}
          setValue={setValue}
        />
        <div className={"w-full flex-type6"}>
          <label
            htmlFor="Dimensions ( Optional )"
            className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
          >
            Dimensions ( Optional )
          </label>
          <div className="flex-type1 space-x-[5px]">
            {dimensions.map((data, index) => {
              return (
                <>
                  <div
                    key={index}
                    className={
                      "flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative"
                    }
                  >
                    <input
                      type="number"
                      placeholder={data}
                      {...register(data)}
                      className="w-full h-full pl-[5px] rounded-[5px] focus:outline-none"
                      name={data}
                    />
                  </div>
                  {!(index == dimensions.length - 1) && (
                    <div className="relative h-[5px] w-[14px] ">
                      <Image src={Multiply} fill alt="logo" />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="flex-type1">
          <ReactHookFormInput
            label="Weight*"
            name="package_weight"
            type="number"
            register={register("package_weight")}
            error={errors.package_weight as FieldError}
            className="rounded-l-[4px] rounded-r-none"
          />
          <div className="flex justify-center items-center h-[46px] bg-[#525D72] rounded-r-[4px] px-[10px] text-[16px] text-[#FFFFFF] font-[700] leading-[22px] mt-[23px] ">
            Kg
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-[46px] bg-[#3672DF] rounded-[4px] text-[14px] text-[#FFFFFF] font-[400] leading-[19px] mt-[10px]"
        >
          Calculate Cost
        </button>
        <div
          className="w-full text-center text-[14px] text-[#3672DF] font-[500] leading-[19px] cursor-pointer "
          onClick={() => {
            reset();
          }}
        >
          Reset
        </div>
      </form>
    </div>
  );
});

export default ShipmentCalculator;
