import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { i18n } from "next-i18next";
import Table from "@/components/orders/table/index";
import EnquiryBasePageHeader from "@/components/admin/EnquiryBasePageHeader";
import BlankPage from "@/components/admin/BlankPage";
import useEnquiry, { IEnquiry } from "@/lib/hooks/useEnquiry";
const tableHeaders = ["Customer Email ID", "Mobile numbers", "Date", "Message"];
import LoadingPage from "@/components/common/LoadingPage";
import { GetServerSidePropsContext } from "next";
import useAuthorization from "@/lib/hooks/useAuthorization";

const EnquiryBase = () => {
  const { enquiry, mutateEnquiry, enquiryIsLoading, enquiryError } = useEnquiry(
    {}
  );

  const { status: rank, is_loading: rank_is_loading } = useAuthorization();
  console.log(enquiry?.data);

  if (rank_is_loading) {
    return <div>content authorization in progress..</div>;
  }

  if (!rank_is_loading && rank !== "admin") {
    return <div>401 - Unauthorized</div>;
  }

  if (enquiryIsLoading) {
    <LoadingPage />;
  }

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
// export async function getStaticProps({ locale }: { locale: any }) {
//     if (process.env.NODE_ENV === "development") {
//         await i18n?.reloadResources();
//     }
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ["common"])),
//         },
//     };
// }

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  // console.log("redders", ctx.req.cookies);
  // if (ctx.req.cookies.is_admin !== "true") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
  };
}
