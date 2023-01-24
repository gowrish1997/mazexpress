import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/common/ReactHookFormInput";

interface IProp {
    show: boolean;
    close: () => void;
}

interface IInputs {
    id: string;
    addressLine01: string;
    addressLine02: string;
    country: string;
    city: string;
    state: string;
    postalCode: string;
    mobileNumber: number;
    default: string | null;
}

const schema = yup
    .object({
        addressLine01: yup.string().required(),
        addressLine02: yup.string().required(),
    })
    .required();

const AddNewAddressModal = (props: IProp) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IInputs>({
        defaultValues: {
            id: nanoid(),
        },
        resolver: yupResolver(schema),
    });

    const [addressIsDefault, setAddressIsDefault] = useState(false);

    const toggleDefaultAddressHandler = () => {
        setAddressIsDefault((prev) => !prev);
    };

    const onSubmit: SubmitHandler<IInputs> = (data) => console.log(data);

    return (
        <>
            {props.show && (
                <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-10 flex flex-row justify-center items-center">
                    <form className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[680px] gap-y-[7px]" onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[15px]">Add New Address</p>
                        <p className="text-[18px] text-[#3672DF] font-[700] leading-[25px] mb-[15px]">My Office</p>
                        <ReactHookFormInput
                            label="Address line 01"
                            name="addressLine01"
                            type="string"
                            register={register("addressLine01")}
                            parentClassName="mb-[10px]"
                            inputClassName="h-[46px]"
                        />
                        <ReactHookFormInput
                            label="Address line 02"
                            name="addressLine02"
                            type="string"
                            register={register("addressLine02")}
                            parentClassName="mb-[10px]"
                            inputClassName="h-[46px]"
                        />
                        <div className="flex-type2 space-x-[10px] w-full">
                            <ReactHookFormInput label="Country" name="country" type="string" register={register("country")} parentClassName="mb-[10px]" inputClassName="h-[46px]" />

                            <ReactHookFormInput label="Last name" name="city" type="string" register={register("city")} parentClassName="mb-[10px]" inputClassName="h-[46px]" />
                        </div>
                        <div className="flex-type2 space-x-[10px] w-full">
                            <ReactHookFormInput label="City/Town" name="state" type="string" register={register("state")} parentClassName="mb-[10px]" inputClassName="h-[46px]" />

                            <ReactHookFormInput
                                label="State/Province/Region"
                                name="postalCode"
                                type="string"
                                register={register("postalCode")}
                                parentClassName="mb-[10px]"
                                inputClassName="h-[46px]"
                            />
                        </div>
                        <ReactHookFormInput
                            label="Mobile Numbers"
                            name="mobileNumber"
                            type="number"
                            register={register("mobileNumber")}
                            parentClassName="mb-[10px]"
                            inputClassName="h-[46px]"
                        />
                        <div className=".flex-type1 space-x-[5px]">
                            <input  type="radio" checked={addressIsDefault} onClick={toggleDefaultAddressHandler} {...register("default")} name="default" />

                            <span>Set as Default</span>
                        </div>
                        <div className="flex-type1 space-x-[10px] mt-[5px] ">
                            <button className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]" type="submit">
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
