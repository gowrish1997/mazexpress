import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import useUser from "@/lib/hooks/useUser";
import fetchJson from "@/lib/fetchServer";
import { createToast } from "@/lib/toasts";
import { IHelpCenter } from "@/lib/hooks/useHelpCenter";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyedMutator } from "swr";
import { AxiosResponse } from "axios";

interface IProp {
    close: () => void;
    mutateHelpCenter?: KeyedMutator<AxiosResponse<IHelpCenter[], any>>;
}
interface IForm {
    address_1: string;
    address_2: string;
    city: string;
    country: string;
    email: string;
    mobile: string;
    name: string;
}

const schema = yup
    .object({
        address_1: yup.string().required(),
        address_2: yup.string(),
        city: yup.string().required(),
        country: yup.string().required(),
        email: yup.string().required(),
        mobile: yup.string().required(),
        name: yup.string().required(),
    })
    .required();

const AddNewHelpCenterModal = (props: IProp) => {
    // const [data, setData] = useState(props.data);

    const {
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        console.log(data);

        try {
            const helpUpdateResult = await fetchJson(`/api/help-center`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            createToast({
                type: "success",
                title: "Success",
                message: "Successfully updated help center info",
                timeOut: 3000,
            });
            props.close();
            props.mutateHelpCenter();
        } catch (error) {
            console.log(error);
        }

        // props.update()

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
            <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
                <form
                    className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] gap-y-[15px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
                       Add Contact Details
                    </p>
                    {/* <input
                            id="name_warehouse"
                            type="string"
                            {...register("address")}
                            className="w-full h-[46px] text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none"
                            placeholder="Give first title @Home"
                        /> */}
                    <div className="w-full flex flex-row justify-start items-start gap-x-[10px]">
                        <ReactHookFormInput
                            label="Address 1"
                            name="address_1"
                            type="string"
                            register={register("address_1")}
                            error={errors.address_1?.message}
                        />
                        <ReactHookFormInput
                            label="Address 2"
                            name="address_2"
                            type="string"
                            register={register("address_2")}
                        />
                    </div>
                    <div className="w-full flex flex-row justify-start items-start gap-x-[10px]">
                        <ReactHookFormInput
                            label="City"
                            name="city"
                            type="string"
                            register={register("city")}
                            error={errors.city?.message}
                        />
                        <ReactHookFormInput
                            label="Country"
                            name="country"
                            type="string"
                            register={register("country")}
                            error={errors.country?.message}
                        />
                    </div>

                    <ReactHookFormInput
                        label="Email"
                        name="email"
                        type="string"
                        register={register("email")}
                        error={errors.email?.message}
                    />
                    <ReactHookFormInput
                        label="Contact name"
                        name="name"
                        type="string"
                        register={register("name")}
                        error={errors.name?.message}
                    />

                    <ReactHookFormInput
                        label="Contact number"
                        name="mobile"
                        type="string"
                        register={register("mobile")}
                        error={errors.mobile?.message}
                    />

                    <div className="flex-type1 space-x-[10px] mt-[5px] ">
                        <button
                            className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px]"
                            type="submit"
                        >
                            Submit
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

export default AddNewHelpCenterModal;
