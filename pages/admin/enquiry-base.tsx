import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { i18n } from "next-i18next";
import Table from "@/components/orders/table/index";
import EnquiryBasePageHeader from "@/components/admin/EnquiryBasePageHeader";
import BlankPage from "@/components/admin/BlankPage";
import useEnquiry, { IEnquiry } from "@/lib/hooks/useEnquiry";
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
    const { enquiry, mutateEnquiry, enquiryIsLoading, enquiryError } =
        useEnquiry({});
    console.log(enquiry?.data);

    return (
        <>
            <div>
                <EnquiryBasePageHeader
                    content="enquiry base"
                    title="Enquiry Base | MazExpress Admin"
                />

                <div className="flex flex-col justify-between relative flex-1 h-full">
                    {enquiry?.data && enquiry?.data.length > 0 ? (
                        <>
                            <Table
                                rows={enquiry?.data as IEnquiry[]}
                                headings={tableHeaders}
                                type="enquiry_base"
                            />
                        </>
                    ) : (
                        <BlankPage />
                    )}
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
