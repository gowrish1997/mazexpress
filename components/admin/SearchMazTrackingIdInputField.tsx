import React, { useState } from "react";

interface IProp {
  filterById: (value: string) => void;
}

const SearchMazTrackingIdInputField = (props: IProp) => {
  const [searchKey, setSearchkey] = useState<string>("");

  const searchInputChangeHandler = (e: any) => {
    setSearchkey(e.target.value);
    props?.filterById?.(e.target.value);
  };
  return (
    <input
      className="box-border border-[1px] border-[#BBC2CF] rounded-[4px] h-[38px]  z-50 pl-[10px]"
      // style={showSearchInput ? { borderColor: "black" } : {}}
      value={searchKey}
      placeholder="search ID here"
      onChange={searchInputChangeHandler}
    />
  );
};

export default SearchMazTrackingIdInputField;
