import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import useUser from "@/lib/useUser";
import { INotificationForm } from "@/models/notification.interface";
import attachLogo from "@/public/pin_icon.png";
import uploadIcon from "@/public/upload_icon.png";
import Image from "next/image";
import UserSelect from "../UserSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ClickOutside from "@/components/common/ClickOutside";
import { createToast } from "@/lib/toasts";

interface IProp {
  show: boolean;
  close: () => void;
  update: () => Promise<any>;
}

// const schema = yup
//   .object({
//     address_1_addresses: yup.string().required(),
//     address_2_addresses: yup.string().required(),
//   })
//   .required();

const CreateNotificationModal = (props: IProp) => {
  const { user, mutateUser, userIsLoading } = useUser();
  const [showFileInputModal, setShowFileInputModal] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileUploadTriggerRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<INotificationForm>({
    defaultValues: {},
    // resolver: yupResolver(schema),
  });

  const [reusable, setReusable] = useState<boolean>(false);

  const toggleReusable = () => {
    setReusable((prev) => !prev);
  };

  const onSubmit: SubmitHandler<INotificationForm> = async (data) => {
    console.log(data);
    console.log(files);
    // console.log(fileInputRef.current?.files)
    props.close();
    createToast({
      type: "success",
      title: "Success!",
      message: "Notification sent successfully",
      timeOut: 3000,
    });
  };

  const uploadFilesHandler: any = () => {
    fileInputRef.current?.click();
  };

  const fileInputChangeHandler = (e: any) => {
    // console.log(e.target.files[0]);
    setFiles(Array.from(e.target.files));
  };

  const toggleFileInputHandler = (e: any) => {
    e.preventDefault()
    // console.log("open");
    setShowFileInputModal((prev) => !prev);
  };

  const deleteFileHandler = (idx: number) => {
    // delete file
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

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
            </div>
            <input
              id="title_notifications"
              type="string"
              {...register("title_notifications")}
              className="w-full h-[46px] text-[18px] text-[#3672DF] font-[700] leading-[25px] focus:outline-none"
              placeholder="Give notification title @hi"
            />
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
                  className="rounded-[5px] focus:outline-none top-0 absolute p-4 w-full"
                  name={"content_notifications"}
                />
              </div>
              {errors.content_notifications && (
                <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                  {errors.content_notifications.message}
                </p>
              )}
            </div>
            <div className="flex items-center cursor-pointer relative">
              <div className="relative h-3 w-3 ml-1">
                <Image
                  src={attachLogo}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="attach file icon"
                />
              </div>
              <button
                className="text-[#3672DF] font-[500] text-[14px] ml-1"
                onClick={toggleFileInputHandler}
                ref={fileUploadTriggerRef}
              >
                Attach Files
              </button>
              {showFileInputModal && (
                <ClickOutside
                  handler={toggleFileInputHandler}
                  trigger={fileUploadTriggerRef}
                  className="absolute bottom-[120%] -right-[160px] z-10"
                >
                  <div className=" shadow-lg bg-white rounded flex flex-col items-center w-[360px] h-[299px] p-5 space-y-[20px]">
                    <div className="border p-5 w-full rounded flex flex-col items-center flex-1 justify-center">
                      <div className="relative h-7 w-7">
                        <Image
                          src={uploadIcon}
                          fill
                          style={{ objectFit: "contain" }}
                          alt="image upload icon"
                        />
                      </div>
                      <p className="text-[#525D72] text-[14px] font-[600]">
                        Upload files in jpg or png format.
                      </p>
                    </div>
                    <input
                      type={"file"}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={fileInputChangeHandler}
                      //   {...register('files_notifications')}
                      //   name="files_notifications"
                    />
                    <button
                      className="bg-[#3672DF] text-[14px] font-[600] text-white px-5 py-2 rounded"
                      onClick={uploadFilesHandler}
                    >
                      Upload
                    </button>
                  </div>
                </ClickOutside>
              )}
            </div>
            {files?.length > 0 && (
              <div>
                {files?.map((file: any, index: number) => {
                  return (
                    <div className="flex items-center" key={file.name}>
                      <p className="text-[#3672DF] font-[500] text-[14px] ml-5">
                        {file.name}
                      </p>
                      <div
                        className="w-2 h-2 ml-3 text-[#525D72] cursor-pointer"
                        onClick={() => deleteFileHandler(index)}
                      >
                        <FontAwesomeIcon icon={faX} size="xs" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex-type1 space-x-[5px]">
              <input
                type="checkbox"
                // defaultChecked={reusable}

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
