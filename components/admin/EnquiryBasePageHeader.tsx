import React, { useState } from "react";
import Head from "next/head";

const EnquiryBasePageHeader = (props: { content: string; title: string }) => {
    return (
        <>
            <div
                className={
                    "w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative "
                }
            >
                <Head>
                    <title>{props.title}</title>
                </Head>
                <div className="flex-type1">
                    <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] capitalize">
                        {props.content}
                    </p>
                </div>
            </div>
        </>
    );
};

export default EnquiryBasePageHeader;
