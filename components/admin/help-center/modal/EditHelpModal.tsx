import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import fetchJson from "@/lib/fetchServer";
import { IHelpCenter } from "@/lib/hooks/useHelpCenter";
import { createToast } from "@/lib/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosResponse } from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import * as yup from "yup";

interface IProp {
  show?: boolean;
  close: (id?: string) => void;
  data: IHelpCenter;
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
  se;
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

const EditHelpModal = (props: IProp) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      address_1: props.data.address_1,
      address_2: props.data.address_2,
      city: props.data.city,
      country: props.data.country,
      email: props.data.email,

      mobile: props.data.mobile,
      name: props.data.name,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    try {
      const helpUpdateResult = await fetchJson(
        `/api/help-center/id/${props.data.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      createToast({
        type: "success",
        title: "Success",
        message: "Successfully updated help center info",
        timeOut: 3000,
      });
      props.close();
      props.mutateHelpCenter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
        <form
          className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] gap-y-[15px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
            Edit Contact Details
          </p>
          {/* <input
                            id="name_warehouse"
                            type="string"
                            {...register("address")}
                            className="w-full h-[46px] text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none"
                            placeholder="Give first title @Home"
                        /> */}
          <div className="w-full flex flex-row justify-start items-start gap-x-[10px]">
            <Controller
              name="address_1"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ReactHookFormInput
                  label="Address 1"
                  name="address_1"
                  type="string"
                  onChange={onChange}
                  value={value}
                  error={errors.address_1?.message}
                />
              )}
            />
            <Controller
              name="address_2"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ReactHookFormInput
                  label="Address 2"
                  name="address_2"
                  type="string"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className="w-full flex flex-row justify-start items-start gap-x-[10px]">
            <Controller
              name="city"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ReactHookFormInput
                  label="City"
                  name="city"
                  type="string"
                  value={value}
                  onChange={onChange}
                  error={errors.city?.message}
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ReactHookFormInput
                  label="Country"
                  name="country"
                  type="string"
                  onChange={onChange}
                  value={value}
                  error={errors.country?.message}
                />
              )}
            />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactHookFormInput
                label="Email"
                name="email"
                type="string"
                onChange={onChange}
                value={value}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactHookFormInput
                label="Contact name"
                name="name"
                type="string"
                onChange={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="mobile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactHookFormInput
                label="Contact number"
                name="mobile"
                type="string"
                onChange={onChange}
                value={value}
                error={errors.mobile?.message}
              />
            )}
          />

          <div className="flex-type1 space-x-[10px] mt-[5px] ">
            <button
              className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px]"
              type="submit"
            >
              Save edit
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

export default EditHelpModal;
