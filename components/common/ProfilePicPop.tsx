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
import { AuthManager, IWhiteListedUser } from "@/controllers/auth-ctr";
import AuthCTX from "../context/auth.ctx";

interface IProp {
  show: boolean;
  close: (e: any) => void;
  // manager: AuthManager;
}

const ProfilePicPop = (props: IProp) => {
  const user: IWhiteListedUser = useContext(AuthCTX)["active_user"];
  const { set_active_user } = useContext(AuthCTX);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const jet: AuthManager = useContext(AuthCTX)["jet"];
  const { t } = useTranslation("common");
  const profilePicPopContent: string[] = t(
    "settingsPage.profileForm.ProfilePicPopContent",
    { returnObjects: true }
  );

  const deleteImage = async (e: any) => {
    // set back to default image
    try {
      const imageUpdateResult = await fetchServer(`/api/users/${user?.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_url: null }),
      });

      if (imageUpdateResult.ok === true) {
        createToast({
          type: "success",
          message: "Profile picture deleted",
          title: "success",
          timeOut: 1000,
        });
        await jet.mutateUser();
        set_active_user(jet.getUser(jet.active));
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
    // e.preventDefault();
    if (e.target.files) {
      let formData = new FormData();

      // rename to unique name
      const fileName =
        nanoid() + "." + String(e.target.files[0].name).split(".").pop();

      formData.append("name", fileName);
      formData.append("user", user?.id as string);
      formData.append("image", e.target.files[0], fileName);

      axios
        .post(
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/upload-user-image"
            : "https://mazapi.easydesk.work/api/upload-user-image",
          formData,
          {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(async (response) => {
          if (response.data.ok === true) {
            createToast({
              type: "success",
              message: "Image uploaded",
              title: "success",
              timeOut: 1000,
            });
            // props.manager.mutateUser();
            await jet.mutateUser();
            set_active_user(jet.getUser(jet.active));
            props.close(e);
          }
        })
        .catch((err) => {
          if (err) throw err;
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
                src={user?.avatar_url || "/user-images/default_user.png"}
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
                <FontAwesomeIcon icon={faTrash} className="w-5" />
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
