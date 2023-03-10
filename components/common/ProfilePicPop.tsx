import React, { ChangeEvent, useRef } from "react";
import Image from "next/image";
import useUser from "@/lib/hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
import axios from "axios";
import fetchJson from "@/lib/fetchServer";

interface IProp {
  show: boolean;
  close: (e: any) => void;
}

const ProfilePicPop = (props: IProp) => {
  const { user, mutateUser } = useUser();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = () => {
    imageInputRef.current?.click();
  };

  const deleteImage = async () => {
    // set back to default image
    let updatedUser = user!

    updatedUser.avatar_url = "default_user.png";
    await fetchJson(`/api/users?id=${user?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar_url: "default_user.png" }),
    });
  };

  const updateUserImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // dev
      console.log(e.target.files[0]);

      // rename to unique name
      const fileName =
        nanoid() + "." + String(e.target.files[0].name).split(".").pop();
      // dev
      console.log(fileName);

      // send file to api to write
      axios
        .post(
          "/api/upload-user-image",
          {
            image: e.target.files[0],
            userId: user?.id,
            name: fileName,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then(async (response) => {
          if (response.status === 200) {
            // mutate user with new user data
            // setValue("avatar_url_users", fileName);
            let updatedUser = { ...user };
            updatedUser.avatar_url = fileName;
            await fetchJson(`/api/users?id=${user?.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ avatar_url: fileName }),
            });
          }
        });
    }
  };
  return (
    <>
      {props.show && (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] flex flex-row justify-center items-center z-20">
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
              <h1 className="font-[600] text-[16px]">Profile Photo</h1>
              <button
                className="w-7 h-7 flex items-center hover:bg-[#EDF5F9] p-2 rounded-full transition duration-300"
                onClick={props.close}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
            <div className="w-[300px] h-[300px] relative rounded-full overflow-hidden self-center">
              <Image
                src={"/user-images/" + user?.avatar_url}
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
                <p className="">Edit</p>
              </button>
              <button
                className="flex flex-col items-center text-[#525D72] hover:bg-[#EDF5F9] p-2 rounded text-[14px] space-y-[5px] transition duration-300"
                onClick={deleteImage}
              >
                <FontAwesomeIcon icon={faTrash} className="w-5" />
                <p className="">Remove</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePicPop;
