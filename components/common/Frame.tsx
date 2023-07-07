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
          router.pathname == "/auth/gate" ||
          router.pathname == "/about" ||
          router.pathname == "/services" ||
          router.pathname == "/404" ||
          router.pathname == "/TermsAndCondition"
        ) && (
          <div className="hidden md:block w-[120px]  xmd:w-[250px] lg:w-[400px] xlg:w-[500px] fixed h-screen z-50">
            <Sidebar />
          </div>
        )}
        {!(
          router.pathname == "/" ||
          router.pathname == "/auth/gate" ||
          router.pathname == "/about" ||
          router.pathname == "/services" ||
          router.pathname == "/404" ||
          router.pathname == "/TermsAndCondition"
        ) ? (
          <div
            className={`box-border flex-1   ${
              locale == "en"
                ? "ml-0 md:ml-[100px] xmd:ml-[250px] lg:ml-[400px] xlg:ml-[500px]"
                : "mr-0 md:mr-[100px] xmd:mr-[250px] lg:mr-[400px] xlg:mr-[500px]"
            } p-5 pt-0 flex flex-col relative `}
          >
            <Topbar />
            {props.children}
          </div>
        ) : (
          <div className={`z-0 box-border  flex-1 pb-0 flex flex-col`}>
            {props.children}
          </div>
        )}
      </div>
    </SearchKeyContext.Provider>
  );
};

export default Frame;
