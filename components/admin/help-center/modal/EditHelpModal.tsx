import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import useUser from "@/lib/hooks/useUser";
import fetchJson from "@/lib/fetchServer";
import { createToast } from "@/lib/toasts";

interface IProp {
  show: boolean;
  close: () => void;
  update: () => Promise<any | undefined>;
  data: any
}

const schema = yup
  .object({
    address_1_addresses: yup.string().required(),
    address_2_addresses: yup.string().required(),
  })
  .required();

interface IHelpForm {
  num1_warehouse: number;
  num2_warehouse: number;
  num3_warehouse: number;
  email_warehouse: string;
  name_warehouse: string;
}

const EditHelpModal = (props: IProp) => {
  const { user, mutateUser } = useUser();
  // const [data, setData] = useState(props.data);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<IHelpForm>({
    defaultValues: {
      name_warehouse: props.data.name,
      email_warehouse: props.data.email,
      num1_warehouse: parseInt(props.data.num1),
      num2_warehouse: parseInt(props.data.num2),
      num3_warehouse: parseInt(props.data.num3),
    },
    // resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IHelpForm> = async (data) => {
    console.log(data);

    // update help center info
    const helpUpdateResult = await fetchJson(`/api/help-center`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    props.close()
    createToast({
      type: 'success',
      title: 'Success',
      message: 'Successfully updated help center info',
      timeOut: 3000
    })
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
      {props.show && (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-10 flex flex-row justify-center items-center">
          <form
            className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
              Edit Contact Details
            </p>
            <input
              id="name_warehouse"
              type="string"
              {...register("name_warehouse")}
              className="w-full h-[46px] text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none"
              placeholder="Give first title @Home"
            />
            <ReactHookFormInput
              label="Mobile Number 1"
              name="num1_warehouse"
              type="number"
              register={register("num1_warehouse")}
            />
            <ReactHookFormInput
              label="Mobile Number 2"
              name="num2_warehouse"
              type="number"
              register={register("num2_warehouse")}
            />
            <ReactHookFormInput
              label="Mobile Number 3"
              name="num3_warehouse"
              type="number"
              register={register("num3_warehouse")}
            />

            <ReactHookFormInput
              label="Email ID"
              name="email_warehouse"
              type="string"
              register={register("email_warehouse")}
            />

            <div className="flex-type1 space-x-[10px] mt-[5px] ">
              <button
                className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px]"
                type="submit"
              >
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

export default EditHelpModal;
