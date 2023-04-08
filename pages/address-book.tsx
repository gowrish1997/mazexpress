import React, { useContext, useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import UserSavedAddress from "@/components/orders/UserSavedAddress";
import { Address } from "@/models/address.model";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import AuthCTX from "@/components/context/auth.ctx";
import { IWhiteListedUser } from "@/controllers/auth-ctr";
import { GetServerSidePropsContext } from "next";
import { QS } from "@/components/common/QS";
import useAddresses from "@/lib/hooks/useAddresses";
import LoadingPage from "@/components/common/LoadingPage";

const AddressBook = () => {
  const [showEditUserAddressModal, setShowEditUserAddressModal] =
    useState<boolean>(false);
  const [editableAddress, setEditableAddress] = useState<Address>();

  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const user: IWhiteListedUser = useContext(AuthCTX)["active_user"];
  const { addresses, mutateAddresses, addressesIsLoading } = useAddresses({
    type: "get_by_email",
    username: user?.email,
    status: ["active"],
  });

  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;

  // console.log(user);
  // console.log(addresses);

  useEffect(() => {
    let dir = router.locale == "ar" ? "rtl" : "ltr";
    let lang = router.locale == "ar" ? "ar" : "en";
    document.querySelector("html")?.setAttribute("dir", dir);
    document.querySelector("html")?.setAttribute("lang", lang);
  }, [router.locale]);

  const toggleAddNewAddressModal = () => {
    setShowAddNewAddressModal((prev) => !prev);
  };

  const toggleEditUserAddressModal = (addressId?: string) => {
    if (showEditUserAddressModal) {
      setShowEditUserAddressModal(false);
    } else {
      setShowEditUserAddressModal(true);
      const address = (addresses as Address[])?.find((data) => {
        return data.id == addressId;
      });
      setEditableAddress(address);
    }
  };
  if (addressesIsLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <PageHeader
        content={t("addressBookPage.pageHeader.Title")}
        title="Address Book | MazExpress"
      />
      <div className="grid grid-cols-3 gap-3 py-5">
        {addresses &&
          (addresses as Address[])
            ?.filter((el) => el.status === "active")
            .map((data, index) => {
              return (
                <UserSavedAddress
                  type="address-book"
                  allAddresses={addresses}
                  key={data.id}
                  address={data}
                  edit={toggleEditUserAddressModal}
                  update={mutateAddresses}
                  // update={() => {}}
                />
              );
            })}
      </div>
      <div>
        <button
          className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] mt-[25px]"
          onClick={toggleAddNewAddressModal}
        >
          {t("addressBookPage.AddNewButton")}
        </button>
      </div>
      {showAddNewAddressModal && (
        <AddNewAddressModal
          show={showAddNewAddressModal}
          close={toggleAddNewAddressModal}
          update={mutateAddresses}
          // update={() => {}}
        />
      )}

      {showEditUserAddressModal && (
        <EditUserAddressModal
          update={mutateAddresses}
          // update={() => {}}
          show={showEditUserAddressModal}
          close={toggleEditUserAddressModal}
          address={editableAddress!}
          allAddresses={addresses}
        />
      )}
    </>
  );
};

export default AddressBook;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  // get addresses for this user
  // const cookies = ctx.req.cookies;
  // // console.log(cookies.s_email);
  // const qs = new QS({ username: cookies.s_email, status: ["active"] });
  // // console.log(qs.stringified);
  // const response = await (
  //   await fetch(
  //     process.env.NODE_ENV === "development"
  //       ? `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/addresses` +
  //           qs.stringified
  //       : `http://${process.env.NEXT_PUBLIC_SERVER_HOST}/api/addresses` +
  //           qs.stringified
  //   )
  // ).json();
  // const addresses = response.data;
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["common"])),
      // addresses,
    },
  };
}
