import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
interface IProp {
    show: boolean;
    close: () => void;
    confirm: () => void;
}
const LogoutConfirmModal = (props: IProp) => {
    const router = useRouter();

    const { t } = useTranslation("");
    const { locale } = router;

    var content: string[] = t("sidebar.logoutConfirmModal.Content", { returnObjects: true });

    return (
        <>
            {props.show && (
                <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] flex flex-row justify-center items-center z-50">
                    <div className="box-border flex-type8 bg-[#ffffff] rounded-[8px] py-[20px] px-[25px] w-[600px] h-[150px] gap-y-[15px]">
                        <div>{content[0]}</div>
                        <div className="flex flex-row justify-end items-center w-full space-x-[10px] ">
                            <button
                                className="w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#ffffff] bg-[#3672DF] text-center ml-[5px] "
                                onClick={() => props.confirm()}
                            >
                                {content[1]}
                            </button>
                            <button
                                className="w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center "
                                onClick={() => props.close()}
                            >
                                {content[2]}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutConfirmModal;
