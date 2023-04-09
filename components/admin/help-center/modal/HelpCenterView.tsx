import PageHeader from "@/components/common/PageHeader";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EditHelpModal from "@/components/admin/help-center/modal/EditHelpModal";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import fetchJson from "@/lib/fetchServer";
import { useRouter } from "next/router";
import { IHelpCenter } from "@/lib/hooks/useHelpCenter";
import ContactLogo from "@/public/admin.png";
import CallLogo from "@/public/mobile.png";
import { KeyedMutator } from "swr";
import { AxiosResponse } from "axios";
import { createToast } from "@/lib/toasts";
import { GetServerSidePropsContext } from "next";

interface IProp {
  data: IHelpCenter[];
  mutateHelpCenter?: KeyedMutator<AxiosResponse<IHelpCenter[], any>>;
}

const HelpCenterView = (props: IProp) => {
  const router = useRouter();

  const [showEditHelpModal, setShowEditHelpModal] = useState(false);
  const [editableHelpCenter, setEditableHelpCenter] = useState<IHelpCenter>();

  const toggleEditHelpModal = (id: string) => {
    if (showEditHelpModal) {
      setShowEditHelpModal(false);
    } else {
      const data = props.data.find((data) => {
        return data.id == id;
      });
      setShowEditHelpModal(true);
      setEditableHelpCenter(data);
    }
  };

  const removeHelpCenter = async (id: string) => {
    try {
      const result = await fetchJson(`/api/help-center/id/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "applicaton/json" },
      });
      createToast({
        type: "success",
        title: "Success",
        message: "Successfully removed help center",
        timeOut: 3000,
      });
      props.mutateHelpCenter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHeader
        content="Help Center"
        title="Help Center | MazExpress Admin"
      />
      <div className="grid grid-cols-3 gap-3 py-5">
        {props.data &&
          props.data.map((data, index) => {
            return (
              <div
                key={index}
                className=" border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] "
              >
                {/* <div className="flex-type3 space-x-[10px]">
                                    <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
                                        {data.comments}
                                    </p>
                                </div> */}
                <p className="text-[14px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
                  Address:
                  <span className="font-[700] text-[#2B2B2B]">{` ${data.address_1}, ${data.address_2}, ${data.city}, ${data.country}`}</span>
                </p>
                <p className="text-[14px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
                  Write us on:
                  <span className="font-[700] text-[#2B2B2B]">
                    {` ${data.email}`}
                  </span>
                </p>

                <div className="flex flex-col justify-between mt-[15px]">
                  <div className="flex items-center mb-2">
                    <Image
                      src={ContactLogo}
                      height={12}
                      width={12}
                      alt="mobile"
                    />
                    <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
                      {data.name}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <Image src={CallLogo} height={12} width={12} alt="mobile" />
                    <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
                      {data && data.mobile}
                    </p>
                  </div>
                </div>
                {router.pathname.includes("admin") && (
                  <div className="text-[12px] text-[#35C6F4] font-[500] leading-[17px] flex justify-end flex-1 grow">
                    <div className="space-x-[20px] flex items-end  ">
                      <button
                        className="hover:font-[600]"
                        onClick={() => toggleEditHelpModal(data.id)}
                      >
                        Edit
                      </button>
                      {props.data.length > 1 && (
                        <button
                          className="hover:font-[600]
                                                "
                          onClick={() => removeHelpCenter(data.id)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {showEditHelpModal && (
        <EditHelpModal
          close={toggleEditHelpModal}
          data={editableHelpCenter}
          mutateHelpCenter={props.mutateHelpCenter}
        />
      )}
    </>
  );
};

export default HelpCenterView;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
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
