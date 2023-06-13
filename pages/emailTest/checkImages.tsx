import fetchJson from "@/lib/fetchServer";
import React from "react";
import Image from "next/image";

const checkImages = () => {
  const getImages = async () => {
    const result = await fetchJson(`/api/assets/delivered.png`);
  };
  return (
    <div>
      <button onClick={getImages}>clock here to get iamges</button>
      <div className="absolute h-[50px] w-[100px] ">
        <Image
          src="http://localhost:5000/api/assets/delivered.png"
          alt="gowrish"
          fill
        />
      </div>
    </div>
  );
};

export default checkImages;
