import React, { useState, useRef } from "react";
import Image from "next/image";
import ClickOutside from "@/components/common/ClickOutside";
import downwardArrow from "../../../public/downwardArrow.png";
interface IProp {
    type: string;
    headings: Array<string>;

    onSelect: (e: string, type: string) => void;
}

const TableHeader = (props: IProp) => {
    // const searchInputRef = useRef<HTMLInputElement>(null);
    // const trigger = useRef<any>(null);

    // const [showSearchInput, setShowSearchInput] = useState(false);
    // const [searchKey, serSearchkey] = useState<string>("");

    // const toggleSearchInputHandler = () => {
    //     setShowSearchInput((prev) => !prev);
    // };
    // const smartToggleGateHandler = () => {
    //     setShowSearchInput(false);
    // };

    // const searchInputChangeHandler = (e: any) => {
    //     setTimeout(() => {
    //         searchInputRef.current?.focus();
    //     }, 500);
    //     serSearchkey(e.target.value);
    //     props?.filterById?.(e.target.value);
    // };

    const selectAllCheckboxClickHandler = (e: any) => {
        console.log(e.target.value);
        props.onSelect(e.target.checked, "selectAllOrder");
    };

    return (
        <thead className="w-full z-40">
            <tr className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px] border-b-[1px] border-[#e3e3e3] ">
                {(props.type == "pending" || props.type == "shipments" || props.type == "in-transit") && (
                    <th className="th0">
                        <input type="checkbox" className="h-[10px] w-[10px] cursor-pointer" onClick={selectAllCheckboxClickHandler} />
                    </th>
                )}
                {props.headings.map((data, index) => {
                    // if (data == "MAZ Tracking ID") {
                    //     return (
                    //         <>
                    //             <th key={index} className={`th${index + 1} cursor-pointer relative`}>
                    //                 <div className="flex-type1" onClick={toggleSearchInputHandler}>
                    //                     <span>{data}</span>
                    //                     <Image src={downwardArrow} height={9} width={9} alt="arrow" className="ml-[5px]" />
                    //                 </div>
                    //                 {showSearchInput && (
                    //                     <ClickOutside trigger={trigger} handler={smartToggleGateHandler}>
                    //                         <input
                    //                             className=" box-border fixed top-[210px] border-[1px] border-[#BBC2CF] rounded-[4px] h-[35px] z-50 shadow pl-[10px]"
                    //                             // style={showSearchInput ? { borderColor: "black" } : {}}
                    //                             value={searchKey}
                    //                             ref={searchInputRef}
                    //                             placeholder="search ID here"
                    //                             onChange={searchInputChangeHandler}
                    //                         />
                    //                     </ClickOutside>
                    //                 )}
                    //             </th>
                    //         </>
                    //     );
                    // } else {
                        return (
                            <th key={index} className={`th${index + 1}`}>
                                {data}
                            </th>
                        );
                    // }
                })}
                <th className={`th${props.headings?.length + 1}`}></th>
            </tr>
        </thead>
    );
};

export default TableHeader;
