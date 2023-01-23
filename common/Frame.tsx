import React from "react";
import Sidebar from "@/components/layout/sidebar";
interface IFrameProps {
    children: React.ReactNode;
}
const Frame = (props: IFrameProps) => {
    return (
        <div className="flex bg-[#FCFCFC] relative min-h-screen">
            <Sidebar />
            <div className="flex-1 px-7 pb-5 flex flex-col ml-[250px] relative">{props.children}</div>
        </div>
    );
};

export default Frame;
