import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
<<<<<<< HEAD
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";

import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
=======
>>>>>>> sessions
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
<<<<<<< HEAD
    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
=======
  const [showEditUserAddressModal, setShowEditUserAddressModal] =
    useState<boolean>(false);
  const [editableAddress, setEditableAddress] = useState<Address>();

  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const { user, mutateUser } = useUser();
  const { addresses, mutateAddresses, addressesIsLoading } = useAddresses({
    user_id: user?.id,
    status: "active",
  });
>>>>>>> sessions

  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = router;

<<<<<<< HEAD
    const [showEditUserAddressModal, setShowEditUserAddressModal] = useState<boolean>(false);
    const [editableAddress, setEditableAddress] = useState<Address>();

    const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
    const { user, mutateUser } = useUser();
    const { addresses, mutateAddresses, addressesIsLoading } = useAddresses({
        user_id: user?.id,
    });

    const toggleAddNewAddressModal = () => {
        setShowAddNewAddressModal((prev) => !prev);
    };

    const toggleEditUserAddressModal = (addressId?: string) => {
        if (showEditUserAddressModal) {
            setShowEditUserAddressModal(false);
        } else {
            setShowEditUserAddressModal(true);
            // const address = addresses?.find((data) => {
            //   return data.id == addressId;
            // });
            // setEditableAddress(address);
        }
    };

    const updateAddresses = () => {
        createToast({
            type: "success",
            message: "Created new address.",
            timeOut: 2000,
            title: "Success",
        });
        mutateAddresses();
    };

    const updateUserAndAddresses = async () => {
        console.log("updating user and addresses");
        await mutateAddresses();
        await mutateUser();
    };

    useEffect(() => {
        console.log("running side effect");
        console.log(user);
    }, [user, addresses]);

    return (
        <>
            <PageHeader content={t("addressBookPage.pageHeader.Title")} title="Address Book | MazExpress" />
            {addresses?.count === 0 ? (
                <div className="py-5">
                  {locale=='en'?" No addresses yet.":"لا توجد عناوين حتى الآن."}
                   
                    <button className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]" onClick={toggleAddNewAddressModal}>
                        {t("addressBookPage.AddNewButton")}
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-3 py-5">
                    {addressesIsLoading && <div>loading</div>}
                    {addresses?.data &&
                        addresses.data.map((data) => {
                            return <UserSavedAddress key={(data as Address).id} address={data as Address} edit={toggleEditUserAddressModal} update={updateUserAndAddresses} />;
                        })}
                </div>
            )}
            <div>
                <button className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]" onClick={toggleAddNewAddressModal}>
                    {t("addressBookPage.AddNewButton")}
                </button>
            </div>

            <AddNewAddressModal show={showAddNewAddressModal} close={toggleAddNewAddressModal} update={updateUserAndAddresses} />
            {/* {showEditUserAddressModal && (
=======
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
          className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] mt-[25px]"
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
>>>>>>> sessions
        <EditUserAddressModal
          update={mutateAddresses}
          show={showEditUserAddressModal}
          close={toggleEditUserAddressModal}
          address={editableAddress!}
        />
<<<<<<< HEAD
      )} */}
        </>
    );
=======
      )}
    </>
  );
>>>>>>> sessions
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
