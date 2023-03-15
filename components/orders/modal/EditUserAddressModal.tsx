import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import CustomDropDown from "@/components/common/CustomDropDown";
import useUser from "@/lib/hooks/useUser";
import { Address, City } from "@/models/address.model";
import fetchServer from "@/lib/fetchServer";
import { faL } from "@fortawesome/free-solid-svg-icons";
import CountrySelector from "@/components/common/CountrySelector";
import RegionSelector from "@/components/common/RegionSelector";
import { FieldError } from "react-hook-form";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface IProp {
  show: boolean;
  close: () => void;
  address: Address;
  update: () => void;
}

const schema = yup
  .object({
    tag: yup.string().required("Tag address is required field"),
    address_1: yup
      .string()
      .required("Address line 01 is required field"),
    address_2: yup
      .string()
      .required("Address line 02 is required field"),
    country: yup.string().required("Country is required field"),
    city: yup.string().required("City/Town is required field"),

    phone: yup
      .number()
      .test(
        "len",
        "Must be exactly 10 digits",
        (val) => val?.toString().length === 10
      )
      .required()
      .typeError("Mobile number is required field"),
  })
  .required();



const EditUserAddressModal = (props: IProp) => {
  const [country, setCountry] = useState(props.address.country);
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
    defaultValues: props.address,
    resolver: yupResolver(schema),
  });

  const [addressIsDefault, setAddressIsDefault] = useState(
    user?.default_address === props.address.id
  );

  const toggleDefaultAddressHandler = () => {
    if (addressIsDefault) {
      //   console.log("making null");
      setAddressIsDefault(false);
    } else {
      //   console.log("making true");
      setAddressIsDefault(true);
    }
  };

  const onSubmit: SubmitHandler<Address & { default?: "on" | "off" }> = async (
    data
  ) => {
    console.log(data);
    let address = { ...data };
    delete address.default;

    console.log(address);
    if (data.default === "on") {
      // set default for user
      const userUpdate = await fetchServer(`/api/users?id=${user?.id}`, {
        method: "PUT",
        body: JSON.stringify({ default_address: address.id }),
      });
      if (userUpdate) {
        console.log("updated user default address");
      } else {
        console.log("updated user default address: failed");
      }
    }

    const addressResult = await fetchServer(`/api/addresses?id=${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });

    console.log(addressResult);

    props.close();
    props.update();
  };

  return (
    <>
      <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
        <form
          className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
            {t("addNewOrderPage.editAddressForm.Title")}
          </p>
          <div>
            <input
              id="title"
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
            error={errors.address_1}
          />
          <ReactHookFormInput
            label={inputFieldLabels[2]}
            name="address_2"
            type="string"
            register={register("address_2")}
            error={errors.address_2}
          />
          <div className="flex-type2 space-x-[10px] w-full">
            {/* <ReactHookFormInput label="Country" name="country" type="string" register={register("country")} value={props.address.country} />

                        <ReactHookFormInput label="City/Town" name="city" type="string" register={register("city")} value={props.address.city} /> */}
            <Controller
              name="country"
              control={control}
              // defaultValue="AF"
              render={({ field: { onChange, value, ref } }) => (
                <CountrySelector
                  label="Country"
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
              name="city"
              control={control}
              // defaultValue="Badakhshan"
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
                />
              )}
            /> */}
            <CusotmDropdown
              label={inputFieldLabels[4]}
              name="city"
              type="string"
              IconEnabled={true}
              register={register("city")}
              error={errors.city}
              options={[
                { value: "Tripoli", label: "Tripoli" },
                { value: "Benghazi", label: "Benghazi" },
                { value: "Misrata", label: "Misrata" },
              ]}
              placeHolder="Warehouse address"
              value={getValues("city")}
              // setValue={setValue}
              disabled={true}
              className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
            />
          </div>
          {/* <div className="flex-type2 space-x-[10px] w-full">
                        <ReactHookFormInput
                            label="State/Province/Region"
                            name="state"
                            type="string"
                            register={register("state")}
                            value={props.address.state}
                        />

                        <ReactHookFormInput
                            label="Zip/Postal Code"
                            name="postalCode"
                            type="string"
                            register={register("pincode")}
                            value={props.address.pincode}
                        /> */}
          {/* </div> */}
          <ReactHookFormInput
            label={inputFieldLabels[5]}
            name="phone"
            type="number"
            register={register("phone")}
            error={errors.phone}
          />
          <div className=".flex-type1 space-x-[5px]">
            <input
              type="radio"
              defaultChecked={
                props.address.id === user?.default_address
              }
              onClick={toggleDefaultAddressHandler}
              {...register("default")}
              name="default"
            />

            <span>{inputFieldLabels[6]}</span>
          </div>
          <div className="flex-type1 space-x-[10px] mt-[5px] ">
            <button
              className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]"
              type="submit"
            >
              {t("addNewOrderPage.editAddressForm.SubmitButton")}
            </button>

            <button
              className="box-border w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center "
              onClick={() => props.close()}
            >
              {t("addNewOrderPage.editAddressForm.CancelButton")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUserAddressModal;