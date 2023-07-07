import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
import CountrySelector from "@/components/common/CountrySelector";
import fetchJson from "@/lib/fetchServer";
import useAddresses from "@/lib/hooks/useAddresses";
import { createToast } from "@/lib/toasts";
import { Address } from "@/models/address.model";
import { APIResponse } from "@/models/api.model";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface IProp {
  show: boolean;
  close: () => void;
  address: Address;
  update: () => void;
  allAddresses?: Address[];
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
      // .test(
      //     "len",
      //     "Must be exactly 10 digits",
      //     (val) => val?.toString().length === 10
      // )
      .required()
      .typeError("Mobile number is required field"),
  })
  .required();

const EditUserAddressModal = (props: IProp) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [country, setCountry] = useState(props.address.country);
  const { data: session, update }: { data: any; update: any } = useSession();
  const { addresses, mutateAddresses, addressesIsLoading } = useAddresses({
    username: session?.user?.email,
    status: ["active"],
  });

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
    setValue,
    control,
    formState: { errors },
  } = useForm<Address & { default: boolean }>({
    defaultValues: props.address,
    resolver: yupResolver(schema),
  });

  const [addressIsDefault, setAddressIsDefault] = useState(
    session?.user?.default_address === props.address.id
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

  const onSubmit: SubmitHandler<Address & { default?: boolean }> = async (
    data
  ) => {
    if (isButtonDisabled) {
      return; // Exit early if the button is already disabled
    }

    setIsButtonDisabled(true);

    let address = { ...data };
    delete address.default;

    // update address
    try {
      const addressResult = await fetchJson<APIResponse<Address>>(
        `/api/addresses/${props.address.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(address),
        }
      );

      if (addressResult.ok) {
        // set default if checked

        if (data.default || addresses?.length == 0) {
          const userResult = await fetchJson(
            `/api/users/${session?.user?.email}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                default_address: props.address.id,
              }),
            }
          );
          await update({
            ...session.user,
            default_address: props.address.id,
          });
        }

        if (
          props.address.id == session?.user.default_address &&
          props.allAddresses?.length! > 1
        ) {
          const userResult = await fetchJson(
            `/api/users/${session?.user?.email}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                default_address:
                  props.address.id == (props.allAddresses?.[0] as Address).id
                    ? (props.allAddresses?.[1] as Address).id
                    : (props.allAddresses?.[0] as Address).id,
              }),
            }
          );
          await update({
            ...session.user,
            default_address:
              props.address.id == (props.allAddresses?.[0] as Address).id
                ? (props.allAddresses?.[1] as Address).id
                : (props.allAddresses?.[0] as Address).id,
          });
        }
        createToast({
          type: "success",
          message: "Your address edit was submitted.",
          title: "Success",
          timeOut: 1000,
        });

        props.update();
        props.close();
      }
    } catch (error) {
      createToast({
        type: "error",
        message: "Your address edit failed. contact admin for help.",
        title: "Error",
        timeOut: 1000,
      });
    }
    setIsButtonDisabled(false);
  };

  return (
    <>
      <div className="box-border fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
        <form
          className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
            {t("addNewOrderPage.editAddressForm.Title")}
          </p>
          <div className="w-full h-[46px] lg:h-[55px] xlg:h-[70px] border-[1px] border-[#BBC2CF] rounded-[4px] box-border">
            <input
              id="title"
              type="string"
              {...register("tag")}
              className="w-full h-full text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none px-[5px]"
              placeholder={inputFieldLabels[0]}
            />
            {errors.tag && (
              <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                {fieldErrors[0]}
              </p>
            )}
          </div>

          <Controller
            name="address_1"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactHookFormInput
                label={inputFieldLabels[1]}
                name="address_1"
                type="string"
                value={value}
                onChange={onChange}
                error={errors.address_1 ? fieldErrors[1] : ""}
              />
            )}
          />
          <Controller
            name="address_2"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactHookFormInput
                label={inputFieldLabels[2]}
                name="address_2"
                type="string"
                value={value}
                onChange={onChange}
                error={errors.address_2 ? fieldErrors[2] : ""}
              />
            )}
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
              setValue={setValue}
              disabled={true}
              className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
            />
          </div>

          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactHookFormInput
                label={inputFieldLabels[5]}
                name="phone"
                type="number"
                value={value}
                onChange={onChange}
                error={errors.phone ? fieldErrors[5] : ""}
              />
            )}
          />
          <div className=".flex-type1 space-x-[5px]">
            <input
              type="checkbox"
              defaultChecked={
                props.address.id === session?.user?.default_address
              }
              {...register("default")}
              name="default"
            />

            <span>{inputFieldLabels[6]}</span>
          </div>
          <div className="flex-type1 space-x-[10px] mt-[5px] ">
            <button
              className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] disabled:bg-[#35C6F4]/50 relative"
              type="submit"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center ">
                  <div className="w-[20px] h-[20px] border-[1px] border-white animate-spin rounded-full " />
                </div>
              )}
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
