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
import { FieldError } from "react-hook-form";
import useUser from "@/lib/useUser";
import fetchJson from "@/lib/fetchJson";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
interface IProp {
    show: boolean;
    close: () => void;
    address: IAddressProps;
    update: () => Promise<IAddressProps[] | undefined>;
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
        setValue,
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

    const onSubmit: SubmitHandler<IAddressProps> = async (data) => {
        // console.log(data);
        let address: any = { ...data };
        delete address.default_addresses;
        address.user_id = user?.id_users;

        // console.log(address);
        // add address
        if (user?.is_logged_in_users) {
            // update user default
            let newUserData = { ...user, default_address_user: data.id_addresses };
            mutateUser(newUserData, false);
        }
        const addressResult = await fetchJson(`/api/addresses?id=${data.id_addresses}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address),
        });

        // console.log(addressResult)
        if (data.default_addresses === "on") {
            const userResult = fetchJson(`/api/users?id=${user?.id_users}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ default_address_users: data.id_addresses }),
            });
        }
        props.close();
        props.update();
    };

    return (
        <>
            <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
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
                        <CusotmDropdown
                            label="City/Town"
                            name="city_addresses"
                            type="string"
                            IconEnabled={true}
                            register={register("city_addresses")}
                            error={errors.city_addresses as FieldError}
                            options={[
                                { value: "Tripoli", label: "Tripoli" },
                                { value: "Benghazi", label: "Benghazi" },
                                { value: "Misrata", label: "Misrata" },
                            ]}
                            placeHolder="Warehouse address"
                            value={getValues("city_addresses")}
                            setValue={setValue}
                            disabled={true}
                            className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
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
                        <input
                            type="radio"
                            defaultChecked={props.address.id_addresses === user?.default_address_users}
                            onClick={toggleDefaultAddressHandler}
                            {...register("default_addresses")}
                            name="default_addresses"
                        />

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
