import Head from "next/head";
import React from "react";

interface IProp {
  content: string;
  className?: string;
  showCalender?: boolean;
  title?: string 
}
const PageHeader = (props: IProp) => {
  return (
    <div
      className={
        "w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px]" +
        " " +
        props.className
      }
    >
        <Head>
            <title>{props.title}</title>
        </Head>
      <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px]">
        {props.content}
      </p>
      <div>
        {props.showCalender && (
          <button className="border-[1px] border-[#BBC2CF] text-[14px] text-[#BBC2CF] font-[19px] leading-[19px] p-[10px] rounded-[4px] ">
            Order Calendar
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
