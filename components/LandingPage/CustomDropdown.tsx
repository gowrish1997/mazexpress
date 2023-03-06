import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FieldError } from "react-hook-form";
import ClickOutside from "../common/ClickOutside";

interface IProp {
    label: string;
    name: string;
    type: string;
    register?: any;
    value?: string;
    IconEnabled: boolean;
    error?: string;
    disabled?: boolean;
    options?: { value: string; label: string}[];
    placeHolder?: string;
    setValue: any;
    className?: string;
}

const genderHandler = (type: string, locale: string) => {
    switch (type) {
        case "m":
            return locale == "en" ? "Male" : "ذكر";
        case "f":
            return locale == "en" ? "Female" : "أنثى";
        case "u":
            return locale == "en" ? "Unknown" : "مجهول";
        case "o":
            return locale == "en" ? "Other" : "آخر";
    }
};
const languageHandler = (type: string, locale: string) => {
    switch (type) {
        case "ar":
            return locale == "en" ? "Arabic" : "عربي";
        case "en":
            return locale == "en" ? "English" : "إنجليزي";
    }
};

const CusotmDropdown = (props: IProp) => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;

    const trigger = useRef<any>(null);
    const [showAdminOptionCard, setShowAdminOptionCard] = useState<boolean>(false);

    const toggleAdminOptionCard = () => {
        setShowAdminOptionCard((prev) => !prev);
    };
    function smartToggleGateHandler() {
        setShowAdminOptionCard(false);
    }

    const dropDownOnChangeHandler = (value: string) => {
        props.setValue(props.name, value, { shouldValidate: true });
        setShowAdminOptionCard(false);
    };

    const dropdownValueHanlder = (label: string, value: string) => {
        console.log(label);
        switch (label) {
            case "Gender":
                return genderHandler(value, locale!);
            case "جنس":
                return genderHandler(value, locale!);

            case "Language":
                return languageHandler(value, locale!);
            case "لغة":
                return languageHandler(value, locale!);
            default:
                return value;
        }
    };

    return (
        <div className={"w-full flex-type6 relative"}>
            <label htmlFor={props.name} className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] ">
                {props.label}
            </label>
            <div
                className={"flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[46px] relative "}
                style={{ borderColor: props.error ? "#f02849" : "" }}
                onClick={toggleAdminOptionCard}
            >
                <input
                    id={props.name}
                    type={props.type}
                    {...props.register}
                    value={dropdownValueHanlder(props.label, props.value as string)}
                    placeholder={props.placeHolder ? props.placeHolder : ""}
                    className={"w-full h-full px-[5px] rounded-[5px] focus:outline-none capitalize" + " " + props.className}
                    name={props.name}
                    disabled={props.disabled}
                />
                {props.IconEnabled ? (
                    <div className={`absolute h-[6px] w-[8px] cursor-pointer  ${locale == "en" ? "right-[8px]" : "left-[8px]"} `}>
                        <Image src="/downwardArrow.png" fill={true} alt="arrow" objectFit="cover" className="cursor-pointer absolute right-[8px] " />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {showAdminOptionCard && (
                <ClickOutside handler={smartToggleGateHandler} trigger={trigger}>
                    <div className="w-full z-[10]  bg-[white] box-border absolute top-[60px] border-[1px] border-[#ccc] rounded-[4px] mt-[10px] p-[5px] space-y-[4px]">
                        {props.options &&
                            props.options.map((data, index) => {
                                return (
                                    <div key={index} className="flex flex-row justify-start items-center">
                                        <button
                                            key={index}
                                            className={
                                                " w-full p-[5px] py-[8px] hover:bg-[#f2f9fc] text-[14px] text-[#333] rounded-[4px] font-[500] cursor-pointer leading-[21px] capitalize disabled:opacity-50 text-left " +
                                                " " +
                                                props.className
                                            }
                                            onClick={() => dropDownOnChangeHandler(data.value)}
                                        >
                                            {data.label}
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </ClickOutside>
            )}
            {props.error && <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">{props.error}</p>}
        </div>
    );
};

export default CusotmDropdown;
