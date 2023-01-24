import React from "react";

const LogInWithMail = () => {
    return (
        <div className="space-y-[10px] text-[14px] text-[#8794AD] font-[600] leading-[19px] font-manRope ">
            <button type="submit" className="w-full h-[46px] bg-[#3672DF] rounded-[4px] text-[#FFFFFF] ">
                Sign up using Email
            </button>
            <button type="submit" className="w-full h-[46px] border-[1px] border-[#BBC2CF] rounded-[4px] text-[#525D72]">
                Sign up using Google
            </button>
        </div>
    );
};

export default LogInWithMail;
