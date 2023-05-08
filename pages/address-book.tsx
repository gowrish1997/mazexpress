import LoadingPage from "@/components/common/LoadingPage";
import PageHeader from "@/components/common/PageHeader";
import UserSavedAddress from "@/components/orders/UserSavedAddress";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import useAddresses from "@/lib/hooks/useAddresses";
import { Address } from "@/models/address.model";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserPageWrapper from "@/components/common/UserPageWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "@/components/layout";

const AddressBook = () => {
    const [showEditUserAddressModal, setShowEditUserAddressModal] =
        useState<boolean>(false);
    const [editableAddress, setEditableAddress] = useState<Address>();
    const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
    const { data: session, update }: { data: any; update: any } = useSession();
    const { addresses, mutateAddresses, addressesIsLoading } = useAddresses({
        type: "get_by_email",
        username: session?.user?.email,
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
        <UserPageWrapper>
            <PageHeader
                content={t("addressBookPage.pageHeader.Title")}
                title="Address Book | MazExpress"
            />
            <Layout>
                {" "}
                {/* <div className="grid add_sm:grid-cols-2 add_sm:gap-3  add_md:grid-cols-3  add_md:gap -3 py-5"> */}
                <div className="w-full flex flex-row justify-start items-start gap-x-[10px] gap-y-[10px] flex-wrap  ">
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
            </Layout>

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
        </UserPageWrapper>
    );
};

export default AddressBook;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    const session = await getServerSession(
        ctx.req as any,
        ctx.res as any,
        authOptions as any
    );
    // const { pathname } = ctx.req.url;
    console.log(session);
    if (!session) {
        return {
            redirect: {
                destination: `/auth/gate?mode=1`,
                permanent: false,
            },
        };
    }

    if (
        (ctx.locale == "en" ? "english" : "arabic") !=
        ((session as any)?.user as any).lang
    ) {
        return {
            redirect: {
                destination:
                    ((session as any)?.user as any).lang === "english"
                        ? `${ctx.resolvedUrl}`
                        : `/ar${ctx.resolvedUrl}`,
                permanent: false,
            },
        };
    }
    if (((session as any)?.user as any).is_admin) {
        return {
            redirect: {
                destination: `/`,
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
