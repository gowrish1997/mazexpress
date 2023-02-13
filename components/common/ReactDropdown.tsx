import Dropdown from "react-dropdown";
import Image from "next/image";
import "react-dropdown/style.css";
import ClickOutside from "./ClickOutside";

interface IProp {
    options: string[];
    onChange?: (value: string) => void;
}

const ReactDropdown = (props: IProp) => {
    const dropDownOnChangeHandler = (e: any) => {
        console.log(e);
        if (e.value == "status") {
            props?.onChange?.("");
        } else {
            props?.onChange?.(e.value);
        }
    };

    const defaultOption = props?.options?.[0];
    return (
        <>
            {props.options && (
                <div className="relative">
                    <Dropdown options={props.options} onChange={dropDownOnChangeHandler} value={defaultOption} placeholder="Select an option" className="pageHeaderDropdown" />
                    <div className="absolute h-[6px] w-[8px] top-[17px] right-[10px] ">
                        <Image src="/downwardArrow.png" fill={true} alt="arrow" objectFit="cover" />
                    </div>
                </div>
            )}
        </>
    );
};

export default ReactDropdown;
