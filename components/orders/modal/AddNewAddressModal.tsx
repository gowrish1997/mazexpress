import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import CountrySelector from "@/components/common/CountrySelector";
import RegionSelector from "@/components/common/RegionSelector";
import useUser from "@/lib/hooks/useUser";
import CustomDropDown from "@/components/common/CustomDropDown";
import fetchJson from "@/lib/fetchJson";
import { AddressEntity } from "@/lib/adapter/entities/AddressEntity";

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
  const { user, status: userIsLoading } = useUser();
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<AddressEntity & { default: "on" | "off" }>({
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

  const onSubmit: SubmitHandler<
    AddressEntity & { default?: "on" | "off" }
  > = async (data) => {
    if (user) {
      let address = { ...data };
      delete address.default;

      // console.log(address);
      address.user = user;

      // add address
      const addressResult = await fetchJson(`/api/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });
      // console.log(addressResult);

      // set default if checked
      if (data.default === "on") {
        const userResult = fetchJson(`/api/users?id=${user?.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ default_address: addressResult.data }),
        });
      }

      props.close();
      props.update();
    }
  };

  return (
    <>
      {props.show && (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-10 flex flex-row justify-center items-center">
          <form
            className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
              Add New Address
            </p>
            <input
              id="tag"
              type="string"
              {...register("tag")}
              className="w-full h-[46px] text-[18px] text-[#3672DF] font-[700] leading-[25px] focus:outline-none"
              placeholder="Give first title @Home"
            />
            <ReactHookFormInput
              label="Address line 01"
              name="address_1"
              type="string"
              register={register("address_1")}
            />
            <ReactHookFormInput
              label="Address line 02"
              name="address_2"
              type="string"
              register={register("address_2")}
            />
            <div className="flex-type2 space-x-[10px] w-full">
              <Controller
                name="country"
                control={control}
                defaultValue="Libya"
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
              <CustomDropDown
                label="City/Town"
                name="city"
                value={["Tripoli", "Benghazi", "Misrata"]}
                register={register("city")}
                error={errors.city}
                dropDownIcon={{
                  iconIsEnabled: true,
                  iconSrc: "/downwardArrow.png",
                }}
              />
            </div>
            <ReactHookFormInput
              label="Mobile Number"
              name="phone"
              type="number"
              register={register("phone")}
            />
            <div className=".flex-type1 space-x-[5px]">
              <input
                type="checkbox"
                defaultChecked={true}
                {...register("default")}
                name="default"
              />

              <span>Set as Default</span>
            </div>
            <div className="flex-type1 space-x-[10px] mt-[5px] ">
              <button
                className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]"
                type="submit"
              >
                Add to address book
              </button>

              <button
                className="box-border w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center "
                onClick={() => props.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewAddressModal;
