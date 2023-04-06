import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/Topbar";
import { useRouter } from "next/router";
// import { ISearchKeyContext } from "@/models/SearchContextInterface";

interface IFrameProps {
    children: React.ReactNode;
}
interface ISearchKeyContext {}
export const SearchKeyContext = React.createContext<ISearchKeyContext | null>(
    null
);

const Frame = (props: IFrameProps) => {
    const router = useRouter();
    // const { t } = useTranslation("");
    const { locale } = router;
    const [searchKey, setSearchKey] = useState<string>("");

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";

        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    return (
        <SearchKeyContext.Provider value={{ searchKey, setSearchKey }}>
            <div className="flex bg-[#FFFFFF] relative min-h-screen w-full">
                {!(
                    router.pathname == "/" ||
                    router.pathname == "/about" ||
                    router.pathname == "/services"
                ) && (
                    <div className="w-[80px] sm:w-[180px] md:w-[250px] lg:w-[400px] xlg:w-[500px] fixed h-screen z-40">
                        <Sidebar />
                    </div>
                )}
                {!(
                    router.pathname == "/" ||
                    router.pathname == "/about" ||
                    router.pathname == "/services"
                ) ? (
                    <div
                        className={`box-border flex-1   ${
                            locale == "en"
                                ? "ml-[80px] sm:ml-[180px] md:ml-[250px] lg:ml-[400px] xlg:ml-[500px]"
                                : "mr-[80px] sm:mr-[180px] md:mr-[250px] lg:mr-[400px] xlg:mr-[500px]"
                        } p-5 pt-0 flex flex-col relative `}
                    >
                        <Topbar />
                        {props.children}
                    </div>
                ) : (
                    <div className={`box-border flex-1 pb-5 flex flex-col`}>
                        {props.children}
                    </div>
                )}
            </div>
        </SearchKeyContext.Provider>
    );
};

export default Frame;
