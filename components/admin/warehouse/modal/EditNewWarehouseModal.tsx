import React, { useContext, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import { Warehouse, WarehouseStatus } from "@/models/warehouse.model";
import fetchJson from "@/lib/fetchServer";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthCTX from "@/components/context/auth.ctx";
import { IWhiteListedUser } from "@/controllers/auth-ctr";

interface IProp {
  close: () => void;
  update: () => Promise<any | undefined>;
  address: Warehouse;
}
const radioOptions = [
  { label: "Set as active", value: "active" },
  { label: "Set as inactive", value: "inactive" },
  { label: "Set as closed", value: "closed" },
];

const schema = yup
  .object({
    tag: yup.string().required("Tag is required field"),
    address_1: yup.string().required("address_1 is required field"),
    address_2: yup.string().required("address_2 is required field"),
    city: yup.string().required("City/Town is required field"),
    phone: yup
      .number()
      .test(
        "len",
        "Must be exactly 9 digits",
        (val) => val?.toString().length === 9
      )
      .required()
      .typeError("Mobile number is required field"),
    status: yup.string().required(),
  })
  .required();

const EditNewWarehouseModal = (props: IProp) => {
  const [country, setCountry] = useState("LY");
  const user: IWhiteListedUser = useContext(AuthCTX)["active_user"];
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<Warehouse & { active: "on" | "off" }>({
    defaultValues: props.address,
    resolver: yupResolver(schema),
  });

  const [warehouseIsActive, setWarehouseIsActive] = useState(true);

  const toggleActiveHandler = () => {
    setWarehouseIsActive((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Warehouse & { active?: "on" | "off" }> = async (
    data
  ) => {
    let warehouse = { ...data };

    try {
      const response = await fetchJson(`/api/warehouses/${props.address.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(warehouse),
      });
    } catch (error) {
      console.error(error);
    }

    props.close();
    props.update();
  };

  return (
    <>
      <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
        <form
          className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] h-[620px] gap-y-[15px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-[10px]">
            Add New Warehouse
          </p>
          <div>
            <input
              id="tag"
              type="string"
              {...register("tag")}
              className="w-full h-[46px] text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none"
              placeholder="Give first title @Home"
            />
            {errors.tag && (
              <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                {errors.tag.message}
              </p>
            )}
          </div>

          <ReactHookFormInput
            label="Address line 01"
            name="address_1"
            type="string"
            register={register("address_1")}
            error={errors.address_1?.message}
          />
          <ReactHookFormInput
            label="Address line 02"
            name="address_2"
            type="string"
            register={register("address_2")}
            error={errors.address_2?.message}
          />
          <div className="flex-type2 space-x-[10px] w-full">
            {/* <CustomDropdown
                            label="City/Town"
                            name="city"
                            value={"Istanbul"}
                            register={register("city")}
                            // error={errors.city}
                            IconEnabled={true}
                            type="text"
                        /> */}
            <ReactHookFormInput
              label="City/Town"
              name="city"
              value={"Istanbul"}
              register={register("city")}
              // IconEnabled={true}
              type="text"
              error={errors.city?.message}
            />
          </div>
          <ReactHookFormInput
            label="Mobile Number"
            name="phone"
            type="number"
            register={register("phone")}
            error={errors.phone?.message}
          />
          {/* <ReactHookFormInput
              label="Email ID"
              name="address_1"
              type="string"
              register={register("address_1")}
            /> */}
          <div className="flex-type1 gap-x-[10px]">
            {radioOptions.map((option, index) => (
              <div className="" key={index}>
                <label key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    {...register("status")}
                  />
                </label>
                <span> {option.label}</span>
              </div>
            ))}
          </div>
          <div className="flex-type1 space-x-[10px] mt-[5px] ">
            <button
              className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px]"
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

export default EditNewWarehouseModal;
