import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { IAddressProps } from "@/models/address.interface";
import CountrySelector from "@/components/common/CountrySelector";
import useUser from "@/lib/useUser";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
import fetchJson from "@/lib/fetchJson";
import { FieldError } from "react-hook-form";
import { IWarehouseProps } from "@/models/warehouse.interface";

interface IProp {
    show: boolean;
    close: () => void;
    update: () => Promise<IWarehouseProps[] | undefined>;
}

const schema = yup
    .object({
        address_1_addresses: yup.string().required(),
        address_2_addresses: yup.string().required(),
    })
    .required();

const AddNewWarehouseModal = (props: IProp) => {
    const [country, setCountry] = useState("LY");
    const { user, mutateUser, userIsLoading } = useUser();
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm<IAddressProps>({
        defaultValues: {
            // address_1_addresses: "V5RH+HVQ",
            // address_2_addresses: "Amr Bin al A'ss St",
            // city_addresses: "Tripoli",
            // country_addresses: "Libya",
            // default_addresses: "on",
            // phone_addresses: 214441792,
            // tag_addresses: "Al Mshket Hotel",
        },
        // resolver: yupResolver(schema),
    });

    const [addressIsDefault, setAddressIsDefault] = useState(user?.default_address_users === 1);

    const toggleDefaultAddressHandler = () => {
        setAddressIsDefault((prev) => !prev);
    };

    const onSubmit: SubmitHandler<IAddressProps> = async (data) => {
        // let address: any = { ...data };
        // delete address.default_addresses;
        // address.user_id = user?.id_users;

        console.log(data);

        // add address
        // const addressResult = await fetchJson(`/api/addresses`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(address),
        // });

        // console.log(addressResult)
        // if (data.default_addresses === "on") {
        //   const userResult = fetchJson(`/api/users?id=${user?.id_users}`, {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ default_address_users: addressResult }),
        //   });
        //   if (user?.is_logged_in_users) {
        //     // update user default
        //     let newUserData = { ...user, default_address_user: addressResult };
        //     mutateUser(newUserData, false);
        //   }
        // }

        // console.log(result);
        // props.close();
        // props.update();
    };

    return (
        <>
            {props.show && (
                <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
                    <form className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]" onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">Add New Warehouse</p>
                        <input
                            id="tag_addresses"
                            type="string"
                            {...register("tag_addresses")}
                            className="w-full h-[46px] text-[18px] text-[#3672DF] font-[700] leading-[25px] focus:outline-none"
                            placeholder="Give first title @Home"
                        />
                        <ReactHookFormInput label="Address line 01" name="address_1_addresses" type="string" register={register("address_1_addresses")} />
                        <ReactHookFormInput label="Address line 02" name="address_2_addresses" type="string" register={register("address_2_addresses")} />
                        <div className="flex-type2 space-x-[10px] w-full">
                            <Controller
                                name="country_addresses"
                                control={control}
                                defaultValue="Libya"
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
                            <CusotmDropdown
                                label="City/Town"
                                name="city_addresses"
                                type="string"
                                IconEnabled={true}
                                register={register("city_addresses")}
                                error={errors.city_addresses?.message}
                                options={[
                                    { value: "Tripoli", label: "Tripoli" },
                                    { value: "Benghazi", label: "Benghazi" },
                                    { value: "Misrata", label: "Misrata" },
                                ]}
                                value={getValues("city_addresses")}
                                setValue={setValue}
                                disabled={true}
                                className="text-[14px] text-[#2B2B2B] font-[600] leading-[19px] "
                            />
                        </div>
                        <ReactHookFormInput label="Mobile Number" name="phone_addresses" type="number" register={register("phone_addresses")} />
                        {/* <ReactHookFormInput
              label="Email ID"
              name="address_1_addresses"
              type="string"
              register={register("address_1_addresses")}
            /> */}
                        <div className=".flex-type1 space-x-[5px]">
                            <input
                                type="radio"
                                // defaultChecked={user?.default_address_users === }
                                checked={addressIsDefault}
                                onClick={toggleDefaultAddressHandler}
                                {...register("default_addresses")}
                                name="default_addresses"
                            />

                            <span>Set as Default</span>
                        </div>
                        <div className="flex-type1 space-x-[10px] mt-[5px] ">
                            <button className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]" type="submit">
                                Add to warehouse
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

export default AddNewWarehouseModal;
