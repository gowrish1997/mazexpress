import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import Add from "../../public/add.png";

const AddButton = (props: { onClick: () => void }) => {
    const router = useRouter();
    const { t } = useTranslation("");
    const { locale } = router;
    return (
        <div className={`fixed w-[58px] h-[58px] ${locale == "en" ? " bottom-10 right-10" : " bottom-10 left-10"}  rounded-full flex justify-center items-center cursor-pointer bg-[#000000] `} onClick={props.onClick}>
            <div className="flex items-center justify-center relative h-[20px] w-[20px] ">
                {/* <FontAwesomeIcon icon={faPlus} color="white" /> */}
                <Image src={Add} fill={true} alt="add" />
            </div>
        </div>
    );
};

export default AddButton;
