import ClickOutside from "@/components/common/ClickOutside";
import Image from "next/image";
import { useRef, useState } from "react";
import downwardImage from "../../../public/downwardArrow.png";

interface IProp {
    options: { value: string | number; label: string | number }[];
    onChange?: (value: string | number) => void;
    header?: string;
    itemPerPage?: number;
    className?: string;
    selection?: (string | number)[];
}

const MazStatsDropddown = (props: IProp) => {
    // const [showDropdown, setShowDropdown] = useState(false);

    // const toggleDropdownHandler = () => {
    //     setShowDropdown((prev) => !prev);
    // };
    const trigger = useRef<any>();
    const dropDownOnChangeHandler = (value: string | number) => {
        props.onChange?.(value);
    };
    const [gate, setGate] = useState(false);

    function smartToggleGateHandler() {
        setGate(false);
    }
    function toggleGateHandler() {
        setGate((prev) => !prev);
    }

    return (
        <div className="relative min-w-[120px]  ">
            <div
                className={
                    "border-[1px] border-[#BBC2CF] rounded-[4px] text-[12px] text-[#2B2B2B] font-[600] leading-[18px] box-border px-[10px] py-[5px] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative cursor-pointer" +
                    " " +
                    props.className
                }
                style={
                    gate ? { backgroundColor: "#35C6F4", color: "#FFFFFF" } : {}
                }
                onClick={toggleGateHandler}
                ref={trigger}
            >
                <span className="capitalize">{props.header}</span>

                <div className="relative h-[6px] w-[8px]  ">
                    <Image
                        src={downwardImage}
                        fill={true}
                        alt="arrow"
                        objectFit="cover"
                    />
                </div>
            </div>
            {gate && (
                <ClickOutside
                    handler={smartToggleGateHandler}
                    trigger={trigger}
                    className="w-full"
                >
                    <div className="w-full bg-[white] box-border absolute  border-[1px] border-[#ccc] rounded-[4px] p-[5px] space-y-[4px] z-20  ">
                        {props.options.map((data, index) => {
                            return (
                                <div
                                    className="flex flex-row justify-start items-center"
                                    key={index}
                                >
                                    <button
                                        className=" w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left "
                                        onClick={() =>
                                            dropDownOnChangeHandler(
                                                data.value as string
                                            )
                                        }
                                    >
                                        {data.label}
                                    </button>
                                    {props.selection?.includes(data.value) ? (
                                        <div className="h-[6px] w-[6px] absolute right-[10px]  rounded-full bg-[#35C6F4] " />
                                    ) : (
                                        <></>
                                    )}
                                    {props.itemPerPage == data.value ? (
                                        <div className="h-[6px] w-[6px] absolute right-[10px]  rounded-full bg-[#35C6F4] " />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </ClickOutside>
            )}
        </div>
    );
};

export default MazStatsDropddown;
