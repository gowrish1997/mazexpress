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
      <div className="flex bg-[#FFFFFF] relative min-h-screen">
        {!(router.pathname == "/") && (
          <div className="md:w-[30%] lg:w-[300px] fixed h-screen">
            <Sidebar />
          </div>
        )}
        {!(router.pathname == "/") ? (
          <div className={`box-border flex-1 lg:ml-[300px] p-5 pt-0 flex flex-col relative`}>
            <Topbar />
            {props.children}
          </div>
        ) : (
          <div className={`box-border flex-1 pb-5 flex flex-col relative`}>
            {props.children}
          </div>
        )}
      </div>
    </SearchKeyContext.Provider>
  );
};

export default Frame;
