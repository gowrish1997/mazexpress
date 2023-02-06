import Dropdown from "react-dropdown";
import Image from "next/image";
import "react-dropdown/style.css";
const options = ["one", "two", "three"];
const defaultOption = options[0];
const ReactDropdown = () => {
    return (
        <div className="relative">
            <Dropdown options={options} onChange={() => console.log("gowrish")} value={defaultOption} placeholder="Select an option" className="pageHeaderDropdown" />
            <div className="absolute h-[6px] w-[8px] top-[17px] right-[10px] ">
                <Image src="/downwardArrow.png" fill={true} alt="arrow" objectFit="cover" />
            </div>
        </div>
    );
};

export default ReactDropdown;
