import PageHeader from "@/components/common/PageHeader";
import React,{useEffect} from "react";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const HelpCenter = () => {
  const router=useRouter();

  const { locales, locale: activeLocale } = router;

  useEffect(() => {
      console.log("use efft");
      router.push(router.asPath, router.asPath, { locale: "en" });
  }, []);
  return (
    <>
      <PageHeader content="Help Center" title="Help Center | MazExpress" />
      <div className="py-10">
        <h1>Coming soon...</h1>
      </div>
    </>
  );
};

export default HelpCenter;
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
