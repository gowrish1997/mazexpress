import Image from "next/image";
import { useRef, useState } from "react";
import ClickOutside from "../common/ClickOutside";
const option = [
    { value: "asc", label: "ascending" },
    { value: "desc", label: "descending" },
];
// interface Iprop {

//     toggle?: (value?: string) => void;

// }

const SortOptionDropDown = () => {
    const trigger = useRef<any>(null);

    const [showSortOptionCard, setShowSortOptionCard] = useState(false);

    const toggleAdminOptionCard = () => {
        setShowSortOptionCard((prev) => !prev);
    };

    const smartToggleGateHandler = () => {
        setShowSortOptionCard(false);
    };

    return (
        <div className="relative z-10">
            <button
                className="box-border border-[1px] border-[#BBC2CF] h-[38px] w-[180px] px-[10px] rounded-[4px]  text-[14px] font-[700] text-[#525D72] leading-[19px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative"
                style={
                    showSortOptionCard
                        ? { backgroundColor: "#35C6F4", color: "#FFFFFF" }
                        : {}
                }
                ref={trigger}
                onClick={toggleAdminOptionCard}
            >
                <span>Sort by</span>
                <div className="relative h-[6px] w-[8px]  ">
                    <Image
                        src="/downwardArrow.png"
                        fill={true}
                        alt="arrow"
                        objectFit="cover"
                    />
                </div>
            </button>
            {showSortOptionCard && (
                <ClickOutside
                    trigger={trigger}
                    handler={smartToggleGateHandler}
                    className="w-full"
                >
                    <div className="w-full bg-[white] box-border absolute  border-[1px] border-[#ccc] rounded-[4px]  p-[5px]">
                        {option &&
                            option.map((data, index) => {
                                return (
                                    <button
                                        key={index}
                                        className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                                        // onClick={() => props.toggle?.(data)}
                                    >
                                        {data.label}
                                    </button>
                                );
                            })}
                    </div>
                </ClickOutside>
            )}
        </div>
    );
};
export default SortOptionDropDown;
