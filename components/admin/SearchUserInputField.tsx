import React, { useState } from "react";

interface IProp {
    filterByUser: (value: string) => void;
}

const SearchUserInputField = (props: IProp) => {
    const [searchKey, serSearchkey] = useState<string>("");

    const searchInputChangeHandler = (e: any) => {
        serSearchkey(e.target.value);
        props?.filterByUser?.(e.target.value);
    };
    return (
        <input
            className="box-border border-[1px] border-[#BBC2CF] rounded-[4px] h-[38px] w-[250px] z-50 pl-[10px]"
            // style={showSearchInput ? { borderColor: "black" } : {}}
            value={searchKey}
            placeholder="Search user here"
            onChange={searchInputChangeHandler}
        />
    );
};

export default SearchUserInputField;
