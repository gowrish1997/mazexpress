import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { GetServerSidePropsContext } from "next";
import useAuthorization from "@/lib/hooks/useAuthorization";
import fetchJson from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";

const ShippingCost = () => {
  const { status: rank, is_loading: rank_is_loading } = useAuthorization();

  const submitHandler = async (e: any) => {
    /**
     * set shipping options
     *
     * POST   ---   /api/shipping/set
     *
     * body:
     *      per_kg: number (required) not tested ex: 3
     *      name: string (required) not tested ex: `black friday offer shipping`
     *      factor: number (required) not tested ex: 5000
     *      status: string (default: inactive) not tested ex: "active", "inactive"
     *
     * sample call
     */
    const per_kg = 3,
      factor = 5000,
      name = "christmas config",
      status = "active";
    const response: APIResponse<unknown> = await fetchJson(
      `/api/shipping/set`,
      {
        method: "POST",
        body: JSON.stringify({
          per_kg,
          factor,
          name,
          status,
        }),
      }
    );
    console.log(response.data);
  };
  if (rank_is_loading) {
    return <div>content authorization in progress..</div>;
  }

  if (!rank_is_loading && rank !== "admin") {
    return <div>401 - Unauthorized</div>;
  }

  return (
    <div>
      <button onClick={submitHandler}>Submit</button>
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
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
    },
  };
}
