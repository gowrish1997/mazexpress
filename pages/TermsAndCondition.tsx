import React from "react";
import HomePageWrapper from "@/components/common/HomePageWrapper";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "@/components/LandingPage/Footer";
const content = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ev",
    " since the 1500s, when an unknown printer took a galley of type and scrambled i",
    "make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
    "It is a long established fact that a reader will be distracted by the readable content",
    "of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like",
];
const TermsAndCondition = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between ">
            <HomePageWrapper
                type="service"
                render={() => {
                    return (
                        <div className="w-[100%] flex justify-center items-center mt-[40px]  ">
                            <ul className="w-[70%]">
                                {content.map((data, index) => {
                                    return (
                                        <li key={index} className="list-disc ">
                                            {data}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                }}
            ></HomePageWrapper>
            <Footer />
        </div>
    );
};

export default TermsAndCondition;
export async function getStaticProps({ locale }: { locale: any }) {
    // console.log(process.env);
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
