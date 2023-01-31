import Head from "next/head";
import React, { useState } from "react";
import Calendar from "react-calendar";
interface IProp {
    content: string;
    className?: string;
    showCalender?: boolean;
    title?: string
}
const PageHeader = (props: IProp) => {
    const [showArrivalCalender, setShowArrivalCalender] = useState<boolean>(false);

    const toggleArrivalCalender = () => {
        console.log("arrival calendar ");
        setShowArrivalCalender((prev) => !prev);
    };
    return (
        <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative " + " " + props.className}>
            <Head>
                <title>{props.title ? props.title : "MazExpress | dev"}</title>
            </Head>
            <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px]">{props.content}</p>
            <div>
                {props.showCalender && (
                    <button className="border-[1px] border-[#BBC2CF] text-[14px] text-[#BBC2CF] font-[19px] leading-[19px] p-[10px] rounded-[4px]" onClick={toggleArrivalCalender}>
                        Order Calendar
                    </button>
                )}
                {showArrivalCalender ? (
                    <div className="absolute top-[50px] right-0 bg-white rounded shadow z-40 p-5">
                        <Calendar  />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default PageHeader;
