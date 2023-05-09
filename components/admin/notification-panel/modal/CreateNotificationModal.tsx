import ClickOutside from "@/components/common/ClickOutside";
import { createToast } from "@/lib/toasts";
import { Order } from "@/models/order.model";
import attachLogo from "@/public/pin_icon.png";
import uploadIcon from "@/public/upload_icon.png";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import UserSelect from "../UserSelect";
import { user_bill_update } from "@/lib/emailContent/bodyContent";
import { sentMail } from "@/lib/sentMail";
import { APIResponse } from "@/models/api.model";
import fetchServer from "@/lib/fetchServer";

interface IProp {
    type: string;
    show?: boolean;
    close: () => void;
    order?: Order;
    // update: () => Promise<any>;
}

const schema = yup
    .object({
        title: yup.string().required(),
        content: yup.string().required(),
        // order_bill: yup.mixed().required("Bill is required"),
    })
    .required();

const CreateNotificationModal = (props: IProp) => {
    const [showFileInputModal, setShowFileInputModal] =
        useState<boolean>(false);
    const [err_msg, setErr_msg] = useState("");
    const [files, setFiles] = useState<any>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileUploadTriggerRef = useRef<HTMLButtonElement>(null);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {},
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        if (props.type == "bill update") {
            setSelectedUsers([props.order.user.email]);
            setValue(
                "title",
                `Bill for your order with maz ID ${props.order.maz_id}`
            );
            setValue(
                "content",
                `Hi ${props.order.user.first_name} bill has generated for your order with maz ID ${props.order.maz_id}`
            );
        }
    }, []);

    const onSubmit: SubmitHandler<any> = async (data) => {
        if (props.type == "bill update") {
            if (files.length == 0) {
                setErr_msg("Bill is required field");
                return;
            }
            console.log("send", data);
            let formData = new FormData();

            formData.append("maz_id", props.order.maz_id);
            formData.append("bill_file", data.order_bill);
            console.log(formData);

            axios
                .post(
                    "https://mazbackend.easydesk.work/api/upload-bill-image",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                )
                .then(async (response) => {
                    console.log(response.data.data[0].order_bill);
                    if (response.data.ok === true) {
                        createToast({
                            type: "success",
                            message: "Bill updated",
                            title: "success",
                            timeOut: 1000,
                        });
                        const toList = [
                            {
                                type: "bill_update",
                                toType: "user",
                                header: "Bill has generated",
                                toName:
                                    props.order.user.first_name +
                                    " " +
                                    props.order.user.last_name,
                                toMail: props.order.user.email,
                                bodyContent: user_bill_update(
                                    props.order.maz_id
                                ),
                                buttonContent: "",
                                redirectLink: response.data.data[0].order_bill,
                            },
                        ];

                        /**sending mail */

                        sentMail(toList);

                        /** sending notifications */
                        const deliveredMessage = {
                            title: "Bill generated",
                            content: `Bill has generated for order with maz ID ${props.order.maz_id} please check your mail for generated bill `,
                        };
                        let result0_3: APIResponse<Notification> =
                            await fetchServer(`/api/notifications`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    data: deliveredMessage,
                                    // files: [],
                                    users: [(props.order as Order).user.email],
                                    // notification_config: 1,
                                }),
                            });

                        props.close();
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            try {
                const result0_3: APIResponse<Notification> = await fetchServer(
                    "/api/notifications",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            data: data,
                            // files: [],
                            users: selectedUsers,
                            // notification_config: 1,
                        }),
                    }
                );
                createToast({
                    type: "success",
                    message: "Notifications sent to selected users",
                    title: "success",
                    timeOut: 1000,
                });
                props.close();
            } catch (error) {
                console.log(error.message);
            }
        }

        // console.log("to", selectedUsers);

        // multiparty here
        // let notificationData = {
        //   title: data.title,
        //   content: data.content,
        // };

        // if (data.reusable === true) {
        //   try {
        //     // store config for reuse
        //     const createResult: APIResponse<NotificationConfig> = await fetchServer(
        //       `/api/notification-settings`,
        //       {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({
        //           title: data.config_title,
        //           desc: data.config_desc,
        //           is_enabled: true,
        //           is_custom: true,
        //           is_reusable: true,
        //         }),
        //       }
        //     );
        //     if (createResult.ok) {
        //       props.close();
        //       createToast({
        //         type: "success",
        //         title: "Success!",
        //         message: "Notification sent successfully",
        //         timeOut: 1000,
        //       });
        //     } else {
        //       createToast({
        //         type: "error",
        //         title: "Failed!",
        //         message: "Notification was not sent contact dev",
        //         timeOut: 1000,
        //       });
        //     }
        //   } catch(err) {
        //     console.error(err)
        //     createToast({
        //       type: "error",
        //       title: "check console!",
        //       message: "Notification was not sent contact dev",
        //       timeOut: 1000,
        //     });
        //   }
        // }
        // // send notification normally
        // try {
        //   const createResult: APIResponse<Notification> = await fetchServer(
        //     `/api/notifications`,
        //     {
        //       method: "POST",
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify({
        //         data: notificationData,
        //         users: selectedUsers,
        //       }),
        //     }
        //   );

        //   // console.log(createResult);
        //   if (createResult.ok) {
        //     props.close();
        //     createToast({
        //       type: "success",
        //       title: "Success!",
        //       message: "Notification sent successfully",
        //       timeOut: 1000,
        //     });
        //   }
        // } catch (error) {
        //   console.error(error);
        //   createToast({
        //     type: "error",
        //     title: "check console!",
        //     message: "Notification was not sent contact dev",
        //     timeOut: 1000,
        //   });
        // }
    };

    const uploadFilesHandler: any = (e: any) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };

    const fileInputChangeHandler = (e: any) => {
        // console.log(e.target.files[0]);
        console.log(e.target.files[0]);
        setErr_msg("");
        setFiles(Array.from(e.target.files));
        setValue("order_bill", e.target.files[0]);
    };

    const toggleFileInputHandler = (e: any) => {
        e.preventDefault();
        // console.log("open");
        setShowFileInputModal((prev) => !prev);
    };

    const deleteFileHandler = (idx: number) => {
        // delete file
        setValue("order_bill", "");
        setFiles([]);
    };

    return (
        <>
            <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-40 flex flex-row justify-center items-center">
                <form
                    className="relative box-border flex-type6 bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] space-y-[10px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-2">
                        Create Notification
                    </p>

                    <div className="w-full">
                        <UserSelect
                            setSelectedUsers={setSelectedUsers}
                            selectedUsers={selectedUsers}
                        />
                    </div>
                    <input
                        id="title"
                        type="string"
                        {...register("title")}
                        className="w-full h-[46px] text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none"
                        placeholder="Give notification title @hi"
                    />
                    {errors.title && (
                        <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                            {errors.title.message as string}
                        </p>
                    )}
                    <div className={"w-full"}>
                        <label
                            htmlFor={"content"}
                            className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] "
                        >
                            Message
                        </label>
                        <div
                            className={
                                "h-[200px] w-full border-[1px] border-[#BBC2CF] rounded-[4px]"
                            }
                            // style={{ borderColor: props.error ? "#f02849" : "" }}
                        >
                            <textarea
                                id="content"
                                {...register("content")}
                                // rows={30}
                                //   value={props.value}
                                className="rounded-[5px] focus:outline-none top-0 p-4 w-full h-full overflow-y-auto slimScrollBar"
                                name={"content"}
                                style={{ resize: "none" }}
                            />
                        </div>
                        {errors.content && (
                            <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                                {errors.content.message as string}
                            </p>
                        )}
                    </div>
                    {props.type == "bill update" && (
                        <div className="flex items-center cursor-pointer">
                            <div className="relative h-3 w-3 ml-1">
                                <Image
                                    src={attachLogo}
                                    fill
                                    style={{ objectFit: "contain" }}
                                    alt="attach file icon"
                                />
                            </div>
                            <button
                                className="text-[#35C6F4] font-[500] text-[14px] ml-1"
                                onClick={toggleFileInputHandler}
                                ref={fileUploadTriggerRef}
                            >
                                Attach Files
                            </button>
                            {showFileInputModal && (
                                <ClickOutside
                                    handler={toggleFileInputHandler}
                                    trigger={fileUploadTriggerRef}
                                    className="absolute top-[20%] left-[20%] z-10"
                                >
                                    <div className="shadow-lg bg-white rounded flex flex-col items-center w-[360px] h-[299px] p-5 space-y-[20px]">
                                        <div className="border p-5 w-full rounded flex flex-col items-center flex-1 justify-center">
                                            <div className="relative h-7 w-7">
                                                <Image
                                                    src={uploadIcon}
                                                    fill
                                                    style={{
                                                        objectFit: "contain",
                                                    }}
                                                    alt="image upload icon"
                                                />
                                            </div>
                                            <p className="text-[#525D72] text-[14px] font-[600]">
                                                Upload files in jpg or png
                                                format.
                                            </p>
                                        </div>
                                        <input
                                            {...register("order_bill")}
                                            name="order_bill"
                                            type={"file"}
                                            style={{ display: "none" }}
                                            ref={fileInputRef}
                                            onChange={fileInputChangeHandler}
                                        />
                                        <button
                                            className="bg-[#35C6F4] text-[14px] font-[600] text-white px-5 py-2 rounded"
                                            onClick={uploadFilesHandler}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </ClickOutside>
                            )}
                        </div>
                    )}

                    {files?.length > 0 && (
                        <div>
                            {files?.map((file: any, index: number) => {
                                return (
                                    <div
                                        className="flex items-center"
                                        key={file.name}
                                    >
                                        <p className="text-[#35C6F4] font-[500] text-[14px] ml-5">
                                            {file.name}
                                        </p>
                                        <div
                                            className="w-2 h-2 ml-3 text-[#525D72] cursor-pointer"
                                            onClick={() =>
                                                deleteFileHandler(index)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faX}
                                                size="xs"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {err_msg && (
                        <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">
                            {err_msg as string}
                        </p>
                    )}
                    {/* <div className="flex-type1 space-x-[5px]">
                            <input
                                type="checkbox"
                                // defaultChecked={reusable}

                                checked={reusable}
                                onClick={toggleReusable}
                                {...register("reusable")}
                                name="reusable"
                            />
                            <span>Make notification reusable</span>
                        </div> */}
                    {/* {reusable && (
                            <div className="flex flex-col space-y-[10px] w-full">
                                <ReactHookFormInput
                                    label={"Config title"}
                                    name="config_title"
                                    type="string"
                                    register={register("config_title")}
                                    // error={errors.address_1 ? fieldErrors[1] : ""}
                                />
                                <ReactHookFormInput
                                    label={"Config Description"}
                                    name="config_desc"
                                    type="string"
                                    register={register("config_desc")}
                                    // error={errors.address_1 ? fieldErrors[1] : ""}
                                />
                            </div>
                        )} */}
                    <div className="flex-type1 space-x-[10px] mt-[5px] ">
                        <button
                            className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px]"
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
        </>
    );
};

export default CreateNotificationModal;
