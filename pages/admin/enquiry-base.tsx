import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { i18n } from "next-i18next";
import Table from "@/components/orders/table/index";
import EnquiryBasePageHeader from "@/components/admin/EnquiryBasePageHeader";
const tableHeaders = ["Customer Email ID", "Mobile numbers", "Date", "Message"];

const enquiryList = [
    {
        email: "alksnfdakdf",
        phone: "234123",
        created: "32423",
        message: "fnasd",
    },
];

const EnquiryBase = () => {
    return (
        <>
            <div>
                <EnquiryBasePageHeader
                    content="enquiry base"
                    title="Enquiry Base | MazExpress Admin"
                />

                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {/* {!orders?.data && !searchKey && !createdDateFilterKey ? (
                        <BlankPage />
                    ) : (
                        <> */}
                    <Table
                        rows={enquiryList}
                        headings={tableHeaders}
                        type="enquiry_base"
                    />
                    {/* </>
                )} */}
                </div>
            </div>
        </>
    );
};

export default EnquiryBase;
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
