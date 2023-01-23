import React from "react";
import Link from "next/link";
import Header from "./Header";
const index = () => {
    return (
        <div className="text-md bg-[#FCFCFC] border-r border-[#F0F0F0] fixed w-[250px]">
            <Header />
            <div className="flex flex-col px-6 pb-6 h-[89vh] overflow-y-auto  box-border overflow-x-hidden slimScrollBar">
            <ul className="flex flex-col font-semibold pb-2 leading-[140%] flex-1">
                <li>gowrish</li>
                <li>gowrish</li>
                <li>gowrish</li>
            </ul>
                <div
                    className="rounded self-center bg-purple-300 flex flex-col items-center justify-between min-h-[214px] w-[188px] p-5"
                    style={{
                        background: "linear-gradient(94.71deg, #D085F3 12.66%, #A962E3 92.89%)",
                    }}
                >
                    <h3 className="font-semibold text-white">Help Center</h3>
                    <p className="text-[11px] text-center text-white font-[400]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    {/* <Link href={"/"}>
                        <a className="bg-white rounded py-2 px-5">Help Center</a>
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default index;
