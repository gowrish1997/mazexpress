import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ClickOutside from "../common/ClickOutside";
import { Order } from "@/models/order.model";
interface Iprop {
    options: string[];
    onChange?: (value: string[]) => void;
    type: string;
    statusFilterKey?: string[];
    allLiveOrders?: Order[];
}

const FilterOptionDropDown = (props: Iprop) => {
    //   console.log("filter optindropdown");
    const trigger = useRef<any>(null);
    const [showAdminOptionCard, setShowAdminOptionCard] = useState(false);
    const [currentValue, setCurrentValue] = useState<Array<string>>([]);
    const [statusLiseInLiveOrder, setStatusListInLiveOrder] = useState<
        string[]
    >([]);

    useEffect(() => {
        setCurrentValue(props.statusFilterKey!);
        if (props.type == "warehouse") {
            setCurrentValue(props.options);
        }

        setStatusListInLiveOrder([
            "all status",
            ...new Set(
                props.allLiveOrders?.map((data) => {
                    return data.status;
                })
            ),
        ]);
    }, []);

    const dropDownOnChangeHandler = (value: string) => {
        if (value == "all status") {
            props?.onChange?.(["all status"]);
            setCurrentValue(["all status"]);
        } else {
            if (currentValue[0] == "all status") {
                setCurrentValue([value]);
            } else {
                if (currentValue.includes(value)) {
                    const filter = currentValue.filter((el) => el != value);

                    if (filter.length) {
                        setCurrentValue(filter);
                    } else {
                        setCurrentValue(["all status"]);
                    }
                } else {
                    setCurrentValue((prev) => {
                        return [...(prev ? prev : []), value];
                    });
                }
            }

            if (currentValue[0] == "all status") {
                props?.onChange?.([value]);
            } else {
                if (currentValue.includes(value)) {
                    const filter = currentValue.filter((el) => el != value);
                    if (filter.length == 0) {
                        props?.onChange?.(["all status"]);
                    }
                    props?.onChange?.(filter);
                } else {
                    props?.onChange?.([...currentValue, value]);
                }
            }
        }

        setShowAdminOptionCard(false);
    };

    const toggleAdminOptionCard = () => {
        setShowAdminOptionCard((prev) => !prev);
    };
    const smartToggleGateHandler = () => {
        console.log("smart togglere");
        setShowAdminOptionCard(false);
    };

    return (
        <div className="relative z-20">
            <button
                className="box-border border-[1px] border-[#BBC2CF] h-[38px] w-[140px] px-[10px] rounded-[4px]  text-[14px] font-[700] text-[#525D72] leading-[19px] hover:bg-[#BBC2CF] hover:text-[#FFFFFF] tracking-wider disabled:opacity-50 flex flex-row justify-between items-center space-x-[5px] relative cursor-pointer"
                style={
                    showAdminOptionCard
                        ? { backgroundColor: "#35C6F4", color: "#FFFFFF" }
                        : {}
                }
                ref={trigger}
                onClick={toggleAdminOptionCard}
            >
                <span className="capitalize">{`${
                    currentValue?.length == 0 ? "all status" : currentValue?.[0]
                }`}</span>
                {currentValue && currentValue?.length > 1 && (
                    <span
                        className="text-[#35C6F4] text-[14px]"
                        style={showAdminOptionCard ? { color: "#FFFFFF" } : {}}
                    >{`${currentValue.length - 1}+more`}</span>
                )}
                <div className="relative h-[6px] w-[8px]  ">
                    <Image
                        src="/downwardArrow.png"
                        fill={true}
                        alt="arrow"
                        objectFit="cover"
                    />
                </div>
            </button>
            {showAdminOptionCard && (
                <ClickOutside
                    trigger={trigger}
                    handler={smartToggleGateHandler}
                >
                    <div className="w-full  bg-[white] box-border absolute  border-[1px] border-[#ccc] rounded-[4px]  p-[5px] space-y-[4px]">
                        {props.options &&
                            props.options.map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-row justify-start items-center"
                                    >
                                        <button
                                            key={index}
                                            className={` w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] leading-[21px] capitalize disabled:opacity-50 text-left`}
                                            onClick={() =>
                                                dropDownOnChangeHandler(data)
                                            }
                                            style={
                                                currentValue.includes(data)
                                                    ? {
                                                          backgroundColor:
                                                              "#f2f9fc",
                                                      }
                                                    : {}
                                            }
                                        >
                                            {data}
                                        </button>
                                        {currentValue.includes(data) ? (
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

export default React.memo(FilterOptionDropDown);
