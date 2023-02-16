import React from "react";

const LoadingPage = () => {
    return (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
            <div className="h-[100px] w-[100px] bg-transparent border-[5px] rounded-full border-r-transparent animate-spin">
           
            </div>
        </div>
    );
};

export default LoadingPage;
