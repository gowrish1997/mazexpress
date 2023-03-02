import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import CustomDropDown from "@/components/common/CustomDropDown";
import useUser from "@/lib/hooks/useUser";
import { AddressEntity } from "@/lib/adapter/entities/AddressEntity";
interface IProp {
  show: boolean;
  close: () => void;
  address: AddressEntity;
  update: () => Promise<AddressEntity[] | undefined>;
}

const schema = yup
  .object({
    address_1: yup.string().required(),
    address_2: yup.string().required(),
  })
  .required();

const EditUserAddressModal = (props: IProp) => {
  const { user, status: userIsLoading } = useUser();
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<AddressEntity & { default: boolean }>({
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

  const onSubmit: SubmitHandler<AddressEntity> = async (data) => {
    console.log(data);
    // let address: any = { ...data };
    // delete address.default;
    // address.user_id = user?.id;

    // console.log(address);
    // add address
    // if (user) {
    //   // update user default
    //   let newUserData = { ...user, default_address_user: data.id };
    // }
    // const addressResult = await fetchJson(`/api/addresses?id=${data.id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(address),
    // });

    // console.log(addressResult)
    // if (data.default === "on") {
    //   const userResult = fetchJson(`/api/users?id=${user?.id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ default_address: data.id }),
    //   });
    // }
    props.close();
    props.update();
  };

  return (
    <>
      <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-10 flex flex-row justify-center items-center">
        <form
          className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
            Edit Address
          </p>
          <input
            id="title"
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
            {/* <ReactHookFormInput label="Country" name="country" type="string" register={register("country")} value={props.address.country} />

                        <ReactHookFormInput label="City/Town" name="city" type="string" register={register("city")} value={props.address.city} /> */}
            {/* <Controller
              name="country"
              control={control}
              // defaultValue="AF"
              render={({ field: { onChange, value, ref } }) => (
                <CountrySelector
                  label="Country"
                  value={value}
                  onChange={onChange}
                  // setCountry={setCountry}
                  error={errors.country}
                  dropDownIcon={{
                    iconIsEnabled: true,
                    iconSrc: "/lock.png",
                  }}
                />
              )}
            /> */}
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
            <CustomDropDown
              label="City/Town"
              name="city"
              value={["Al Buţnān", "Banghāzī", "Mişrātah"]}
              register={register("city")}
              error={errors.city}
              dropDownIcon={{
                iconIsEnabled: true,
                iconSrc: "/downwardArrow.png",
              }}
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
            label="Mobile Numbers"
            name="phone"
            type="number"
            register={register("phone")}
          />
          <div className=".flex-type1 space-x-[5px]">
            <input
              type="radio"
              defaultChecked={props.address.id === user?.default_address}
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
              Save Edit
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
    </>
  );
};

export default EditUserAddressModal;
