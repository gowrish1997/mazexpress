import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { IAddressProps } from "@/models/address.interface";
import { faL } from "@fortawesome/free-solid-svg-icons";
import CountrySelector from "@/components/common/CountrySelector";
import RegionSelector from "@/components/common/RegionSelector";
import CustomDropDown from "@/components/common/CustomDropDown";
import useUser from "@/lib/useUser";
interface IProp {
    show: boolean;
    close: () => void;
    address: IAddressProps;
}

const schema = yup
    .object({
        address_1_addresses: yup.string().required(),
        address_2_addresses: yup.string().required(),
    })
    .required();

const EditUserAddressModal = (props: IProp) => {
    const [country, setCountry] = useState(props.address.country_addresses);
    const { user, mutateUser, userIsLoading } = useUser();
    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors },
    } = useForm<IAddressProps>({
        defaultValues: props.address,
        resolver: yupResolver(schema),
    });

    const [addressIsDefault, setAddressIsDefault] = useState(user?.default_address_users === props.address.id_addresses);

    const toggleDefaultAddressHandler = () => {
        if (addressIsDefault) {
            //   console.log("making null");
            setAddressIsDefault(false);
        } else {
            //   console.log("making true");
            setAddressIsDefault(true);
        }
    };

    const onSubmit: SubmitHandler<IAddressProps> = (data) => {
        console.log(data);
        // props.close();
    };

    return (
        <>
            <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-10 flex flex-row justify-center items-center">
                <form className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">Edit Address</p>
                    <input
                        id="title"
                        type="string"
                        {...register("tag_addresses")}
                        className="w-full h-[46px] text-[18px] text-[#3672DF] font-[700] leading-[25px] focus:outline-none"
                        placeholder="Give first title @Home"
                    />
                    <ReactHookFormInput label="Address line 01" name="address_1_addresses" type="string" register={register("address_1_addresses")} />
                    <ReactHookFormInput label="Address line 02" name="address_2_addresses" type="string" register={register("address_2_addresses")} />
                    <div className="flex-type2 space-x-[10px] w-full">
                        {/* <ReactHookFormInput label="Country" name="country_addresses" type="string" register={register("country_addresses")} value={props.address.country_addresses} />

                        <ReactHookFormInput label="City/Town" name="city_addresses" type="string" register={register("city_addresses")} value={props.address.city_addresses} /> */}
                        <Controller
                            name="country_addresses"
                            control={control}
                            // defaultValue="AF"
                            render={({ field: { onChange, value, ref } }) => (
                                <CountrySelector
                                    label="Country"
                                    value={value}
                                    onChange={onChange}
                                    setCountry={setCountry}
                                    error={errors.country_addresses}
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
                            name="city_addresses"
                            value={["Al Buţnān", "Banghāzī", "Mişrātah"]}
                            register={register("city_addresses")}
                            error={errors.city_addresses}
                            dropDownIcon={{
                                iconIsEnabled: true,
                                iconSrc: "/downwardArrow.png",
                            }}
                        />
                    </div>
                    {/* <div className="flex-type2 space-x-[10px] w-full">
                        <ReactHookFormInput
                            label="State/Province/Region"
                            name="state_addresses"
                            type="string"
                            register={register("state_addresses")}
                            value={props.address.state_addresses}
                        />

                        <ReactHookFormInput
                            label="Zip/Postal Code"
                            name="postalCode"
                            type="string"
                            register={register("pincode_addresses")}
                            value={props.address.pincode_addresses}
                        /> */}
                    {/* </div> */}
                    <ReactHookFormInput label="Mobile Numbers" name="phone_addresses" type="number" register={register("phone_addresses")} />
                    <div className=".flex-type1 space-x-[5px]">
                        <input type="radio" checked={addressIsDefault} onClick={toggleDefaultAddressHandler} {...register("default_addresses")} name="default_addresses" />

                        <span>Set as Default</span>
                    </div>
                    <div className="flex-type1 space-x-[10px] mt-[5px] ">
                        <button className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]" type="submit">
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
