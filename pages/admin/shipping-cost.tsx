import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { GetServerSidePropsContext } from "next";

const ShippingCost = () => {
    return (
        <div>
            <p className="box-border text-[18px] text-[#2B2B2B] font-[700] leading-[25px] border-b-[1px] border-[#e3e3e3] pb-[15px] ">
                Shipping cost
            </p>
            <div>
                <div className="flex flex-row justify-start items-end mt-[50px] ">
                    <p className="box-border text-[22px] text-[#2B2B2B] font-[700] leading-[25px]  ">
                        Shipping cost:
                    </p>

                    <input
                        type="number"
                        value={3}
                        placeholder="cost per weight"
                        className="focus:outline-none border-b-[1px]  border-[#e3e3e3] ml-[10px] text-center "
                    />
                    <span>$</span>
                </div>
                <div className="flex flex-row justify-start items-end mt-[50px] ">
                    <p className="box-border text-[22px] text-[#2B2B2B] font-[700] leading-[25px]  ">
                        Factor:
                    </p>
                    <input
                        type="number"
                        className="focus:outline-none border-b-[1px]  border-[#e3e3e3] ml-[10px] text-center "
                        value={5000}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShippingCost;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  // console.log("redders", ctx.req.cookies);
  if (ctx.req.cookies.is_admin !== "true") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
  };
}