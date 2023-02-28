import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { IAddressProps } from "@/models/address.interface";
import CountrySelector from "@/components/common/CountrySelector";
import RegionSelector from "@/components/common/RegionSelector";
import useUser from "@/lib/hooks/useUser";
import CustomDropDown from "@/components/common/CustomDropDown";
import fetchJson from "@/lib/fetchJson";

interface IProp {
  show: boolean;
  close: () => void;
  update: () => Promise<IAddressProps[] | undefined>;
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
  } = useForm<IAddressProps>({
    defaultValues: {
      address_1: "V5RH+HVQ",
      address_2: "Amr Bin al A's St",
      city: "Tripoli",
      country: "Libya",
      default: "on",
      phone: 214441792,
      tag: "Al Mshket Hotel",
    },
    resolver: yupResolver(schema),
  });

  const [addressIsDefault, setAddressIsDefault] = useState(true);

  const toggleDefaultAddressHandler = () => {
    setAddressIsDefault((prev) => !prev);
  };

  const onSubmit: SubmitHandler<IAddressProps> = async (data) => {
    let address: any = { ...data };
    delete address.default;
    address.user = user;

    // console.log(address);

    // add address
    const addressResult = await fetchJson(`/api/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });
    console.log(addressResult);

    if (data.default === "on") {
      const userResult = fetchJson(`/api/users?id=${user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ default_address: addressResult.data }),
      });
    }

    // console.log(result);
    props.close();
    props.update();
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
              {/* <Controller
                name="city"
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
                  />
                )}
              /> */}
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
            <div className="flex-type2 space-x-[10px] w-full">
              {/* <ReactHookFormInput label="State/Province/Region" name="state" type="string" register={register("state")} /> */}
              {/* <ReactHookFormInput
                label="Zip/Postal Code"
                name="pincode"
                type="string"
                register={register("pincode")}
              /> */}
            </div>
            <ReactHookFormInput
              label="Mobile Numbers"
              name="phone"
              type="number"
              register={register("phone")}
            />
            <div className=".flex-type1 space-x-[5px]">
              <input
                type="radio"
                // defaultChecked={user?.default_address_users === }
                checked={addressIsDefault}
                onClick={toggleDefaultAddressHandler}
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
