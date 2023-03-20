import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import useAddresses from "@/lib/hooks/useAddresses";
import useUser from "@/lib/hooks/useUser";
import { createToast } from "@/lib/toasts";
import UserSavedAddress from "@/components/orders/UserSavedAddress";
import { Address } from "@/models/address.model";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";

const AddressBook = () => {
  const [showEditUserAddressModal, setShowEditUserAddressModal] =
    useState<boolean>(false);
  const [editableAddress, setEditableAddress] = useState<Address>();

  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const { user, mutateUser } = useUser();
  const { addresses, mutateAddresses, addressesIsLoading } = useAddresses({
    user_id: user?.id,
    status: "active",
  });

  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;

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

  return (
    <>
      <PageHeader
        content={t("addressBookPage.pageHeader.Title")}
        title="Address Book | MazExpress"
      />
      <div className="grid grid-cols-3 gap-3 py-5">
        {addresses &&
          (addresses as Address[])
            ?.filter((el) => el.status === 'active')
            .map((data) => {
              return (
                <UserSavedAddress
                type="address-book"
                  key={data.id}
                  address={data}
                  edit={toggleEditUserAddressModal}
                  update={mutateAddresses}
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

      <AddNewAddressModal
        show={showAddNewAddressModal}
        close={toggleAddNewAddressModal}
        update={mutateAddresses}
      />
      {showEditUserAddressModal && (
        <EditUserAddressModal
          update={mutateAddresses}
          show={showEditUserAddressModal}
          close={toggleEditUserAddressModal}
          address={editableAddress!}
        />
      )}
    </>
  );
};

export default AddressBook;
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
