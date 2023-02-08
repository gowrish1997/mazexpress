import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import useUser from "@/lib/useUser";
import CustomDropDown from "@/components/common/CustomDropDown";
import { INotificationForm } from "@/models/notification.interface";
import attachLogo from "@/public/pin_icon.png";
console.log(attachLogo);
import Image from "next/image";
import UserSelect from "../UserSelect";

interface IProp {
  show: boolean;
  close: () => void;
  update: () => Promise<any>;
}

const schema = yup
  .object({
    address_1_addresses: yup.string().required(),
    address_2_addresses: yup.string().required(),
  })
  .required();

const CreateNotificationModal = (props: IProp) => {
  const { user, mutateUser, userIsLoading } = useUser();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<INotificationForm>({
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

  const [reusable, setReusable] = useState<boolean>(false);

  const toggleReusable = () => {
    setReusable((prev) => !prev);
  };

  const onSubmit: SubmitHandler<INotificationForm> = async (data) => {};

  const uploadFilesHandler: any = () => {
    console.log("upload files");
  };
  return (
    <>
      {props.show && (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-10 flex flex-row justify-center items-center">
          <form
            className=" box-border flex-type6 bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] space-y-[10px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-2">
              Create Notification
            </p>

            <div className="w-full">
              <UserSelect />
              {/* <CustomDropDown
                label="Customers"
                name="users_notifications"
                value={["All users", "Marked", "Not marked"]}
                register={register("users_notifications")}
                // error={errors.customers}
                dropDownIcon={{
                  iconIsEnabled: true,
                  iconSrc: "/downwardArrow.png",
                }}
              /> */}
            </div>
            <input
              id="title_notifications"
              type="string"
              {...register("title_notifications")}
              className="w-full h-[46px] text-[18px] text-[#3672DF] font-[700] leading-[25px] focus:outline-none"
              placeholder="Give notification title @hi"
            />
            {/* <ReactHookFormInput
              label="Describe Message"
              name="content_notifications"
              type="textarea"
              register={register("content_notifications")}
            /> */}
            <div className={"w-full"}>
              <label
                htmlFor={"content_notifications"}
                className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
              >
                Describe Message
              </label>
              <div
                className={
                  "flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] relative h-[300px] overflow-y-scroll"
                }
                // style={{ borderColor: props.error ? "#f02849" : "" }}
              >
                <textarea
                  id="content_notifications"
                  {...register("content_notifications")}
                  rows={30}
                  //   value={props.value}
                  className="rounded-[5px] focus:outline-none top-0 absolute p-2"
                  name={"content_notifications"}
                />
              </div>
              {errors.content_notifications && (
                <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                  {errors.content_notifications.message}
                </p>
              )}
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={uploadFilesHandler}
            >
              <div className="relative h-3 w-3 ml-1">
                <Image
                  src={attachLogo}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="attach file icon"
                />
              </div>
              <p className="text-[#3672DF] font-[500] text-[14px] ml-1">
                Attach Files
              </p>
            </div>
            <div className="flex-type1 space-x-[5px]">
              <input
                type="radio"
                // defaultChecked={user?.default_address_users === }
                checked={reusable}
                onClick={toggleReusable}
                {...register("reusable_notifications")}
                name="reusable_notifications"
              />
              <span>Make notification reusable</span>
            </div>
            <div className="flex-type1 space-x-[10px] mt-[5px] ">
              <button
                className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]"
                type="submit"
              >
                Send Notification
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

export default CreateNotificationModal;
