import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactHookFormInput from "@/common/ReactHookFormInput";
import { IUserAddress } from "@/models/orders";
import { faL } from "@fortawesome/free-solid-svg-icons";
interface IProp {
    show: boolean;
    close: () => void;
    address: IUserAddress;
}

const schema = yup
    .object({
        address_1: yup.string().required(),
        address_2: yup.string().required(),
    })
    .required();

const EditUserAddressModal = (props: IProp) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserAddress>({
        defaultValues: props.address,
        resolver: yupResolver(schema),
    });

    const [addressIsDefault, setAddressIsDefault] = useState(false);

    useEffect(() => {
        console.log("useEffext");
        setAddressIsDefault(props.address.default ? true : false);
    }, []);

    const toggleDefaultAddressHandler = () => {
        if (addressIsDefault) {
            console.log("making null");
            setAddressIsDefault(false);
        } else {
            console.log("making true");
            setAddressIsDefault(true);
        }
    };

    const onSubmit: SubmitHandler<IUserAddress> = (data) => {
        console.log(data);
        props.close();
    };

    return (
        <>
            <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-10 flex flex-row justify-center items-center">
                <form className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[680px] gap-y-[15px]" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">Add New Address</p>
                    <input
                        id="title"
                        type="string"
                        {...register("tag")}
                        className="w-full h-[46px] text-[18px] text-[#3672DF] font-[700] leading-[25px] focus:outline-none"
                        placeholder="Give first title @Home"
                        value={props.address.tag}
                    />
                    <ReactHookFormInput label="Address line 01" name="addressLine01" type="string" register={register("address_1")} value={props.address.address_1} />
                    <ReactHookFormInput label="Address line 02" name="addressLine02" type="string" register={register("address_2")} value={props.address.address_2} />
                    <div className="flex-type2 space-x-[10px] w-full">
                        <ReactHookFormInput label="Country" name="country" type="string" register={register("country")} value={props.address.country} />

                        <ReactHookFormInput label="Last name" name="city" type="string" register={register("city")} value={props.address.city} />
                    </div>
                    <div className="flex-type2 space-x-[10px] w-full">
                        <ReactHookFormInput label="City/Town" name="state" type="string" register={register("state")} value={props.address.state} />

                        <ReactHookFormInput label="State/Province/Region" name="postalCode" type="string" register={register("pincode")} value={props.address.phone} />
                    </div>
                    <ReactHookFormInput label="Mobile Numbers" name="mobileNumber" type="number" register={register("phone")} value={props.address.phone} />
                    <div className=".flex-type1 space-x-[5px]">
                        <input type="radio" checked={addressIsDefault} onClick={toggleDefaultAddressHandler} {...register("default")} name="default" />

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
