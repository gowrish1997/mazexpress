import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FieldError } from "react-hook-form";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
<<<<<<< HEAD
import CountrySelector from "@/components/common/CountrySelector";
import RegionSelector from "@/components/common/RegionSelector";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import useUser from "@/lib/hooks/useUser";

import fetchJson from "@/lib/fetchServer";
import { Address } from "@/models/address.model";

interface IProp {
    show: boolean;
    close: () => void;
    update: () => Promise<Address[] | undefined>;
}

const schema = yup
    .object({
        tag: yup.string().required("Tag address is required field"),
        address_1: yup.string().required("Address line 01 is required field"),
        address_2: yup.string().required("Address line 02 is required field"),
        country: yup.string().required("Country is required field"),
        city: yup.string().required("City/Town is required field"),

        phone: yup
            .number()
            .test("len", "Must be exactly 10 digits", (val) => val?.toString().length === 10)
            .required()
            .typeError("Mobile number is required field"),
    })
    .required();

const AddNewAddressModal = (props: IProp) => {
    const { user, mutateUser } = useUser();

    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
    const inputFieldLabels: string[] = t("addNewOrderPage.addressForm.Labels", { returnObjects: true });
    const fieldErrors: string[] = t("addNewOrderPage.addressForm.Errors", { returnObjects: true });
    const cityList: { value: string; label: "string" }[] = t("addNewOrderPage.addressForm.CityOptions", { returnObjects: true });

    const [country, setCountry] = useState("LY");

    const {
        register,
        handleSubmit,
        getValues,
        control,
        setValue,
        formState: { errors },
    } = useForm<Address & { default: "on" | "off" }>({
        defaultValues: {
            address_1: "Gold fields",
            address_2: "Sheik street St",
            city: "Tripoli",
            country: "Libya",
            default: "on",
            phone: 214441792,
            tag: "Al Mshket Hotel",
        },
        resolver: yupResolver(schema),
    });

    // const [addressIsDefault, setAddressIsDefault] = useState(user?.default_address_users === 1);

    // const toggleDefaultAddressHandler = () => {
    //     setAddressIsDefault((prev) => !prev);
    // };

    const onSubmit: SubmitHandler<Address & { default?: "on" | "off" }> = async (data) => {
        if (user) {
            let address = { ...data };
            delete address.default;

            // console.log(address);
            // console.log(data);

            address.user = user;

            // add address
            const addressResult = await fetchJson<Address>(`/api/addresses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(address),
            });
            // console.log(addressResult);

            // set default if checked
            if (data.default) {
                const userResult = await fetchJson(`/api/users?id=${user?.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ default_address: addressResult.id }),
                });
            }

            props.close();
            props.update();
        }
    };

    return (
        <>
            {props.show && (
                <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
                    <form className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]" onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">{t("addNewOrderPage.addressForm.Title")}</p>
                        <div>
                            <input
                                id="tag_addresses"
                                type="string"
                                {...register("tag")}
                                className="w-full h-[46px] text-[18px] text-[#3672DF] font-[700] leading-[25px] focus:outline-none"
                                placeholder={inputFieldLabels[0]}
                            />
                            {errors.tag && <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">{fieldErrors[0]}</p>}
                        </div>

                        <ReactHookFormInput
                            label={inputFieldLabels[1]}
                            name="address_1_addresses"
                            type="string"
                            register={register("address_1")}
                            error={errors.address_1 ? fieldErrors[1] : ""}
                        />
                        <ReactHookFormInput
                            label={inputFieldLabels[2]}
                            name="address_2_addresses"
                            type="string"
                            register={register("address_2")}
                            error={errors.address_2 ? fieldErrors[2] : ""}
                        />
                        <div className="flex-type2 gap-x-[10px] w-full">
                            <Controller
                                name="country"
                                control={control}
                                defaultValue="Libya"
                                render={({ field: { onChange, value, ref } }) => (
                                    <CountrySelector
                                        label={inputFieldLabels[3]}
                                        value={value}
                                        onChange={onChange}
                                        setCountry={setCountry}
                                        error={errors.country}
                                        dropDownIcon={{
                                            iconIsEnabled: true,
                                            iconSrc: "/lock.png",
                                        }}
                                    />
                                )}
                            />
                            {/* <Controller
                name="city_addresses"
                control={control}
                defaultValue="Badakhshan"
                render={({ field: { onChange, value, ref } }) => (
                  <RegionSelector
                    label="City/Town"
                    dropDownIcon={{
                      iconIsEnabled: true,
                      iconSrc: "/downwardArrow.png",
                    }}
                    value={value}
                    country={country}
                    onChange={onChange}
=======
import useUser from "@/lib/hooks/useUser";
import CustomDropDown from "@/components/common/CustomDropDown";
import fetchJson from "@/lib/fetchServer";
import { Address } from "@/models/address.model";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";

interface IProp {
  show: boolean;
  close: () => void;
  update: () => void;
}

const schema = yup
  .object({
    address_1: yup.string().required(),
    address_2: yup.string().required(),
  })
  .required();

const AddNewAddressModal = (props: IProp) => {
  const [country, setCountry] = useState("LY");
  const [addressIsDefault, setAddressIsDefault] = useState(false)
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;
  const inputFieldLabels: string[] = t("addNewOrderPage.addressForm.Labels", {
    returnObjects: true,
  });
  const fieldErrors: string[] = t("addNewOrderPage.addressForm.Errors", {
    returnObjects: true,
  });
  const cityList: { value: string; label: "string" }[] = t(
    "addNewOrderPage.addressForm.CityOptions",
    { returnObjects: true }
  );

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<Address & { default: "on" | "off" }>({
    defaultValues: {
      address_1: "Gold fields",
      address_2: "Sheik street St",
      city: "Tripoli",
      country: "Libya",
      default: "on",
      phone: 214441792,
      tag: "Al Mshket Hotel",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Address & { default?: "on" | "off" }> = async (
    data
  ) => {
    if (user) {
      let address = { ...data };
      delete address.default;

      // console.log(address);
      // console.log(data);

      address.user = user;

      // add address
      const addressResult = await fetchJson<Address>(`/api/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });
      // console.log(addressResult);

      // set default if checked
      if (data.default) {
        const userResult = await fetchJson(`/api/users?id=${user?.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ default_address: addressResult.id }),
        });
      }

      props.close();
      props.update();
    }
  };

  const toggleDefaultAddressHandler = () => {
    setAddressIsDefault((prev) => !prev)
  }

  return (
    <>
      {props.show && (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
          <form
            className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
              {t("addNewOrderPage.addressForm.Title")}
            </p>
            <div>
              <input
                id="tag"
                type="string"
                {...register("tag")}
                className="w-full h-[46px] text-[18px] text-[#3672DF] font-[700] leading-[25px] focus:outline-none"
                placeholder={inputFieldLabels[0]}
              />
              {errors.tag && (
                <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                  {fieldErrors[0]}
                </p>
              )}
            </div>

            <ReactHookFormInput
              label={inputFieldLabels[1]}
              name="address_1"
              type="string"
              register={register("address_1")}
              // error={errors.address_1 ? fieldErrors[1] : ""}
            />
            <ReactHookFormInput
              label={inputFieldLabels[2]}
              name="address_2"
              type="string"
              register={register("address_2")}
              // error={errors.address_2 ? fieldErrors[2] : ""}
            />
            <div className="flex-type2 gap-x-[10px] w-full">
              {/* <Controller
                name="country"
                control={control}
                defaultValue="Libya"
                render={({ field: { onChange, value, ref } }) => (
                  <CountrySelector
                    label={inputFieldLabels[3]}
                    value={value}
                    onChange={onChange}
                    setCountry={setCountry}
                    error={errors.country}
                    dropDownIcon={{
                      iconIsEnabled: true,
                      iconSrc: "/lock.png",
                    }}
>>>>>>> sessions
                  />
                )}
              /> */}

<<<<<<< HEAD
                            <CusotmDropdown
                                label={inputFieldLabels[4]}
                                name="city_addresses"
                                type="string"
                                IconEnabled={true}
                                register={register("city")}
                                error={errors.city ? fieldErrors[4] : ""}
                                options={cityList}
                                value={getValues("city")}
                                setValue={setValue}
                                disabled={true}
                                className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
                            />
                        </div>
                        <div className="flex-type2 space-x-[10px] w-full">
                            {/* <ReactHookFormInput label="State/Province/Region" name="state_addresses" type="string" register={register("state_addresses")} /> */}
                            {/* <ReactHookFormInput
                label="Zip/Postal Code"
                name="pincode_addresses"
                type="string"
                register={register("pincode_addresses")}
              /> */}
                        </div>
                        <ReactHookFormInput
                            label={inputFieldLabels[5]}
                            name="phone_addresses"
                            type="number"
                            register={register("phone")}
                            error={errors.phone ? fieldErrors[5] : ""}
                        />
                        <div className="flex-type1 gap-x-[5px]">
                            <input
                                type="radio"
                                // defaultChecked={user?.default_address_users === }
                                defaultChecked={true}
                                {...register("default")}
                                name="default"
                            />
=======
              <CusotmDropdown
                label={inputFieldLabels[4]}
                name="city"
                type="string"
                IconEnabled={true}
                register={register("city")}
                error={errors.city}
                options={cityList}
                value={getValues("city")}
                setValue={null}
                disabled={true}
                className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
              />
            </div>
            <div className="flex-type2 space-x-[10px] w-full"></div>
            <ReactHookFormInput
              label={inputFieldLabels[5]}
              name="phone"
              type="number"
              register={register("phone")}
              // error={errors.phone ? fieldErrors[5] : ""}
            />
            <div className="flex-type1 gap-x-[5px]">
              <input
                type="radio"
                checked={addressIsDefault}
                onClick={toggleDefaultAddressHandler}
                {...register("default")}
                name="default"
              />
>>>>>>> sessions

              <span>{inputFieldLabels[6]}</span>
            </div>
            <div className="flex-type1 gap-x-[10px] mt-[5px] ">
              <button
                className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]"
                type="submit"
              >
                {t("addNewOrderPage.addressForm.SubmitButton")}
              </button>

              <button
                className="box-border w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center "
                onClick={() => props.close()}
              >
                {t("addNewOrderPage.addressForm.CancelButton")}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewAddressModal;
