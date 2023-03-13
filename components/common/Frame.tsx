import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/Topbar";
import { useRouter } from "next/router";
 interface  ISearchKeyContext {
  searchKey:string,
  setSearchKey:React.Dispatch<React.SetStateAction<string>>
}

interface IFrameProps {
  children: React.ReactNode;
}
export const SearchKeyContext = React.createContext<ISearchKeyContext | null>(null);

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
            <div className="flex bg-[#FFFFFF] relative min-h-screen">
                {!(router.pathname == "/") && <Sidebar />}
                {!(router.pathname == "/") ? (
                    <div className={`box-border flex-1 px-7 pb-5 flex flex-col ${locale == "en" ? " ml-[18%]" : " mr-[18%]"}  relative`}>
                        <Topbar />
                        {props.children}
                    </div>
                ) : (
                    props.children
                )}
            </div>
        </SearchKeyContext.Provider>
    );
};

export default Frame;
