import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddButton = (props: { onClick: () => void }) => {
  return (
    <div
      className="fixed w-[58px] h-[58px] bottom-10 right-10 rounded-full flex justify-center items-center cursor-pointer bg-[#000000]"
      onClick={props.onClick}
    >
      <div className="w-4 h-4">
        <FontAwesomeIcon icon={faPlus} color="white" />
      </div>
    </div>
  );
};

export default AddButton;
