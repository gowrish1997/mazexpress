import React from "react";
import SignUpContent from "@/components/auth/SignUpContent";

const AddNewAdminModal = (props: { close: () => void }) => {
  return (
    <>
      <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-start p-[30px] overflow-auto ">
        <div className=" box-border flex-type6  bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] gap-y-[15px]">
          <h1
            className={`hidden md:block text-[26px] text-[#000000] font-[600] leading-[36px]  `}
          >
            Add admin
          </h1>
          <SignUpContent type="admin" close={props.close} />
        </div>
      </div>
    </>
  );
};

export default AddNewAdminModal;
