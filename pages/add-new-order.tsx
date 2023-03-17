import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageHeader from "@/components/common/PageHeader";
import UserSavedAddress from "@/components/orders/UserSavedAddress";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import useAddresses from "@/lib/hooks/useAddresses";
import useUser from "@/lib/hooks/useUser";
import fetchJson from "@/lib/fetchServer";
import { Address } from "@/models/address.model";
import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import { createToast } from "@/lib/toasts";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const schema = yup
    .object({
        reference_id: yup.string().required("Reference ID is required field"),
        store_link: yup.string().required("Store Link is required field"),
    })
    .required();

const AddNewOrder = () => {
    //   const [userSavedAddresses, setUserSavedAddresses] = useState(addresses);
    const [editableAddress, setEditableAddress] = useState<Address>();
    const [showEditUserAddressModal, setShowEditUserAddressModal] =
        useState<boolean>(false);
    const { user, mutateUser } = useUser();
    const { addresses, mutateAddresses } = useAddresses({
        user_id: user?.id,
    });

   

    const router = useRouter();
    const { t } = useTranslation("common");
    const { locale } = router;
    const inputFieldLabels: string[] = t("addNewOrderPage.ordersForm.Labels", {
        returnObjects: true,
    });
    const fieldErrors: string[] = t("addNewOrderPage.ordersForm.Errors", {
        returnObjects: true,
    });

    useEffect(() => {
        let dir = router.locale == "ar" ? "rtl" : "ltr";
        let lang = router.locale == "ar" ? "ar" : "en";
        document.querySelector("html")?.setAttribute("dir", dir);
        document.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);

    const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);

    const defaultAddressHandler = () => {
        mutateAddresses();
        const address = (addresses as Address[])?.find(
            (el) => el.id === user?.default_address
        );

        return address;
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<{
        reference_id: string;
        store_link: string;
        address_id: string;
    }>({
        defaultValues: {
            address_id: defaultAddressHandler()?.id,
        },
        resolver: yupResolver(schema),
    });

    const toggleAddNewAddressModal = () => {
        setShowAddNewAddressModal((prev) => !prev);
    };

    const toggleEditUserAddressModal = (addressId?: string) => {
        // console.log(addressId);
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

    const updataDeliveryAdressId=(id:string)=>{
      setValue("address_id",id,{shouldValidate:true})
    }

    const onSubmit: SubmitHandler<{
        reference_id: string | null | undefined;
        store_link: string | null | undefined;
        address_id: string | null | undefined;
    }> = async (data) => {
        // console.log(data);
        try {
            let orderObj = {
                user_id: user?.id,
                address_id: data.address_id,
                reference_id: data.reference_id,
                store_link: data.store_link,
            };
            const result: APIResponse<Order> = await fetchJson(`/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderObj),
            });
            // console.log(result);

            createToast({
                type: "success",
                title: "Success",
                message: "Created order successfully",
            });
        } catch (err) {
            console.log(err);
            createToast({
                type: "error",
                title: "An error occurred",
                message: "Check console for more info.",
                timeOut: 3000,
            });
        }
    };

    return (
        <>
            <PageHeader
                content={t("addNewOrderPage.pageHeader.Title")}
                showCalender={false}
                title="Add New Order | MazExpress"
            />
            <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-type1 gap-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
                    <Image
                        src="/blueexclamatory.png"
                        alt="icon"
                        width={16}
                        height={16}
                    />
                    <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                        {t("addNewOrderPage.LinkPPart1")}
                        <span className="text-[#3672DF]">
                            {t("addNewOrderPage.LinkPPart2")}
                        </span>
                    </p>
                </div>
                <div className="flex-type1 gap-x-[10px] mt-[25px]">
                    <ReactHookFormInput
                        label={inputFieldLabels[0]}
                        name="reference_id"
                        type="string"
                        register={register("reference_id")}
                        error={errors.reference_id}
                    />
                    <ReactHookFormInput
                        label={inputFieldLabels[1]}
                        name="store_link"
                        type="string"
                        register={register("store_link")}
                        error={errors.store_link}
                    />
                </div>
                <div className="mt-[20px]">
                    <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px]">
                        {t("addNewOrderPage.addressBook.Title")}
                        <span
                            className="text-[#3672DF] mx-[10px] cursor-pointer hover:bg-[#EDF5F9] p-[5px] rounded-[4px]  "
                            onClick={toggleAddNewAddressModal}
                        >
                            {t("addNewOrderPage.addressBook.AddButton")}
                        </span>
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-3 py-5">
                    {addresses &&
                        addresses !== null &&
                        (addresses as Address[]).map((data: Address) => {
                            return (
                                <UserSavedAddress
                                    type="add-new-order"
                                    key={data.id}
                                    address={data}
                                    register={register("address_id")}
                                    edit={toggleEditUserAddressModal}
                                    update={mutateAddresses}
                                    updateDeliveryAddress={updataDeliveryAdressId}
                                />
                            );
                        })}
                </div>
                <button
                    className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] mt-[25px]"
                    type="submit"
                >
                    {t("addNewOrderPage.SubmitButton")}
                </button>
            </form>

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

export default AddNewOrder;
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
