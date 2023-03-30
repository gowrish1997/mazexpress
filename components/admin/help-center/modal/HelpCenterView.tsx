import PageHeader from "@/components/common/PageHeader";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EditHelpModal from "@/components/admin/help-center/modal/EditHelpModal";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import fetchJson from "@/lib/fetchSelf";
import { useRouter } from "next/router";


const HelpCenterView = () => {
    const router = useRouter();

    const [showEditHelpModal, setShowEditHelpModal] = useState(false);
    const [data, setData] = useState<any>();

    const toggleEditHelpModal = () => {
        setShowEditHelpModal((prev) => !prev);
    };
    
   

    useEffect(() => {
        fetchJson("/api/help-center").then((data) => setData(data));
    }, []);

    return (
        <>
            <PageHeader
                content="Help Center"
                title="Help Center | MazExpress Admin"
            />
            <div className="grid grid-cols-3 gap-3 py-5">
                <div className="min-w-[32%] min-h-[180px] bg-[#EDF5F9] rounded-[4px] p-[25px] ">
                    <div className="flex-type3 space-x-[10px]">
                        <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
                            {data && data.name}
                        </p>
                    </div>
                    <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] ">
                        Istanbul, Turkey
                    </p>
                    <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
                        Write us on{" "}
                        <span className="font-[700] text-[#2B2B2B]">
                            {data && data.email}
                        </span>
                    </p>

                    <div className="flex flex-col justify-between mt-[15px]">
                        <div className="flex items-center mb-2">
                            <Image
                                src="/mobile.png"
                                height={12}
                                width={12}
                                alt="mobile"
                            />
                            <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
                                {data && data.num1}
                            </p>
                        </div>
                        <div className="flex items-center mb-2">
                            <Image
                                src="/mobile.png"
                                height={12}
                                width={12}
                                alt="mobile"
                            />
                            <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
                                {data && data.num2}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Image
                                src="/mobile.png"
                                height={12}
                                width={12}
                                alt="mobile"
                            />
                            <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
                                {data && data.num3}
                            </p>
                        </div>
                    </div>
                    {router.pathname.includes("admin") && (
                        <div className="text-[12px] text-[#35C6F4] font-[500] leading-[17px] flex justify-end flex-1 grow">
                            <div className="space-x-[20px] flex items-end  ">
                                <button
                                    className="hover:font-[600]"
                                    onClick={toggleEditHelpModal}
                                >
                                    Edit
                                </button>
                                <button className="hover:font-[600]">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {data && (
                <EditHelpModal
                    show={showEditHelpModal}
                    close={toggleEditHelpModal}
                    update={() => new Promise((resolve, reject) => {})}
                    data={data}
                />
            )}
        </>
    );
};

export default HelpCenterView;
export async function getStaticProps({ locale }: { locale: any }) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
