import React from "react";

const Card = (props:{content:string ,value:string | number }) => {
    return (
        <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[25px]">
            {props.content}:
            <span className="text-[12px] text-[#525d72] font-[400] leading-[25px] mb-[10px]">
                {props.value}
            </span>
        </p>
    );
};

export default Card;
