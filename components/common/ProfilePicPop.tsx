//==========================
//     written by: raunak
//==========================

import React, { ChangeEvent, useContext, useRef } from "react";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
import fetchServer from "@/lib/fetchServer";
import { createToast } from "@/lib/toasts";
import axios from "axios";
import { useSession } from "next-auth/react";

interface IProp {
    show: boolean;
    close: (e: any) => void;
    // manager: AuthManager;
}

const ProfilePicPop = (props: IProp) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const { data: session, update }: { data: any; update: any } = useSession();

    const { t } = useTranslation("common");
    const profilePicPopContent: string[] = t(
        "settingsPage.profileForm.ProfilePicPopContent",
        { returnObjects: true }
    );

    const deleteImage = async (e: any) => {
        // set back to default image
        try {
            const imageUpdateResult = await fetchServer(
                `/api/users/${session?.user?.email}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ avatar_url: null }),
                }
            );
            if (imageUpdateResult.ok === true) {
                createToast({
                    type: "success",
                    message: "Profile picture deleted",
                    title: "success",
                    timeOut: 1000,
                });
                await update({
                    ...session.user,
                    avatar_url: null,
                });
                props.close(e);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const uploadImage = () => {
        imageInputRef.current?.click();
    };

    const updateUserImage = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files[0]);
        // e.preventDefault();
        if (e.target.files) {
            let formData = new FormData();

            formData.append("profileImage", e.target.files[0]);
            formData.append("email", session.user?.email);
            console.log(formData);

            axios
                .post(
                    "https://mazbackend.easydesk.work/api/upload-user-image",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                )
                .then(async (response) => {
                    console.log(response.data.data[0].profile_image);
                    if (response.data.ok === true) {
                        createToast({
                            type: "success",
                            message: "Image uploaded",
                            title: "success",
                            timeOut: 1000,
                        });
                        await update({
                            ...session.user,
                            avatar_url: response.data.data[0].profile_image,
                        });
                        props.close(e);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <>
            {props.show && (
                <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] flex flex-row justify-center items-center z-50">
                    <input
                        type="file"
                        // className="hidden"
                        style={{ display: "none" }}
                        id="user_profile"
                        ref={imageInputRef}
                        onChange={updateUserImage}
                    />
                    <div className="flex flex-col bg-[#ffffff] rounded-[8px] py-[20px] px-[25px] w-[600px] gap-y-[15px]">
                        <div className="flex items-center justify-between text-[#525D72]">
                            <h1 className="font-[600] text-[16px]">
                                {profilePicPopContent[0]}
                            </h1>
                            <button
                                className="w-7 h-7 flex items-center hover:bg-[#EDF5F9] p-2 rounded-full transition duration-300"
                                onClick={props.close}
                            >
                                <FontAwesomeIcon icon={faX} />
                            </button>
                        </div>
                        <div className="w-[300px] h-[300px] relative rounded-full overflow-hidden self-center">
                            <Image
                                src={
                                    session?.user?.avatar_url
                                        ?"https://mazbackend.easydesk.work/user/" +
                                          session?.user?.avatar_url
                                        :"/user-images/default_user.png"
                                }
                                alt="profile"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="flex flex-row justify-between items-center w-full space-x-[10px] ">
                            <button
                                className="flex flex-col items-center text-[#525D72] hover:bg-[#EDF5F9] p-2 rounded text-[14px] space-y-[5px] transition duration-300"
                                onClick={uploadImage}
                            >
                                <FontAwesomeIcon icon={faPen} className="w-5" />
                                <p className="">{profilePicPopContent[1]}</p>
                            </button>
                            <button
                                className="flex flex-col items-center text-[#525D72] hover:bg-[#EDF5F9] p-2 rounded text-[14px] space-y-[5px] transition duration-300"
                                onClick={(e) => deleteImage(e)}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="w-5"
                                />
                                <p className="">{profilePicPopContent[2]}</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfilePicPop;
