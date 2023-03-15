import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import useUser from "@/lib/hooks/useUser";
// import CustomDropDown from "@/components/common/CustomDropDown";
import { Warehouse, WarehouseStatus } from "@/models/warehouse.model";
import fetchJson from "@/lib/fetchServer";
import CusotmDropdown from "@/components/LandingPage/CustomDropdown";
import CustomDropdown from "@/components/LandingPage/CustomDropdown";

interface IProp {
  show: boolean;
  close: () => void;
  update: () => Promise<any | undefined>;
}

const schema = yup
  .object({
    address_1: yup.string().required(),
    address_2: yup.string().required(),
  })
  .required();

const AddNewWarehouseModal = (props: IProp) => {
  const [country, setCountry] = useState("LY");
  const { user, mutateUser } = useUser();
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<Warehouse & { active: "on" | "off" }>({
    defaultValues: {
      address_1: "plaza st.",
      address_2: "jacobscreek",
      city: "istanbul",
      country: "turkey",
      active: "on",
      phone: 214441792,
      tag: "Main",
    },
    // resolver: yupResolver(schema),
  });

  const [warehouseIsActive, setWarehouseIsActive] = useState(true);

  const toggleActiveHandler = () => {
    setWarehouseIsActive((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Warehouse & { active?: "on" | "off" }> = async (
    data
  ) => {
    // let address: any = { ...data };
    // delete address.default;
    // address.user_id = user?.id_users;

    // console.log(data);

    let warehouse = { ...data };
    warehouse.status =
      data.active === "on" ? WarehouseStatus.A : WarehouseStatus.I;
    delete warehouse.active;
    // await warehouse.save()
    // console.log(warehouse)

    const response = await fetchJson("/api/warehouses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(warehouse),
    });

    console.log(response);
    props.close();
    props.update();
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
              Add New Warehouse
            </p>
            <input
              id="tag"
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
              <CustomDropdown
                label="City/Town"
                name="city"
                value={"Istanbul"}
                register={register("city")}
                // error={errors.city}
                IconEnabled={true}
                type='text'
              />
            </div>
            <ReactHookFormInput
              label="Mobile Number"
              name="phone"
              type="number"
              register={register("phone")}
            />
            {/* <ReactHookFormInput
              label="Email ID"
              name="address_1"
              type="string"
              register={register("address_1")}
            /> */}
            <div className=".flex-type1 space-x-[5px]">
              <input
                type="radio"
                // defaultChecked={warehouseIsActive}
                checked={warehouseIsActive}
                onClick={toggleActiveHandler}
                {...register("active")}
                name="active"
              />

              <span>Set as Active</span>
            </div>
            <div className="flex-type1 space-x-[10px] mt-[5px] ">
              <button
                className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]"
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

export default AddNewWarehouseModal;
