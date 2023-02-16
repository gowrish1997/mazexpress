import React,{useState} from "react";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/Topbar";
import { ISearchKeyContext } from "@/models/SearchContextInterface";
interface IFrameProps {
  children: React.ReactNode;
  
}
export const SearchKeyContext = React.createContext<ISearchKeyContext | null>(null);
const Frame = (props: IFrameProps) => {

  const [searchKey,setSearchKey] = useState<string>("");
  return (
    <SearchKeyContext.Provider value={{ searchKey,setSearchKey }}>
    <div className="flex bg-[#FFFFFF] relative min-h-screen">
      <Sidebar />

      <div className="flex-1 px-7 pb-5 flex flex-col ml-[250px] relative">
        <Topbar />
        {props.children}
      </div>
    </div>
    </SearchKeyContext.Provider>
  );
};

export default Frame;
