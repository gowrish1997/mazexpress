import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageHeader from "@/components/common/PageHeader";
import UserSavedAddress from "@/components/orders/UserSavedAddress";
import ReactHookFormInput from "@/components/common/ReactHookFormInput";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import useAddresses from "@/lib/hooks/useAddresses";

import fetchJson from "@/lib/fetchServer";
import { Address } from "@/models/address.model";
import { APIResponse } from "@/models/api.model";
import { Order } from "@/models/order.model";
import { createToast } from "@/lib/toasts";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import {
  user_orderPlaced,
  admin_orderPlaced,
} from "@/lib/emailContent/bodyContent";
import axios from "axios";
import { sentMail } from "@/lib/sentMail";
import AuthCTX from "@/components/context/auth.ctx";
import { IWhiteListedUser } from "@/controllers/auth-ctr";
import useAuthorization from "@/lib/hooks/useAuthorization";
const schema = yup
  .object({
    address_id: yup
      .string()
      .required("Adress is required field")
      .typeError("Adress is required field"),
    reference_id: yup.string().required("Reference ID is required field"),
    store_link: yup.string().required("Store Link is required field"),
  })
  .required();

const AddNewOrder = () => {
  const { status: rank, is_loading: rank_is_loading } = useAuthorization();
  //   const [userSavedAddresses, setUserSavedAddresses] = useState(addresses);
  const [editableAddress, setEditableAddress] = useState<Address>();
  const [showEditUserAddressModal, setShowEditUserAddressModal] =
    useState<boolean>(false);
  const user: IWhiteListedUser = useContext(AuthCTX)["active_user"];
  const { addresses, mutateAddresses } = useAddresses({
    type: "get_by_email",
    username: user?.email,
    status: ["active"],
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
    // mutateAddresses();
    const address = (addresses as Address[])?.find(
      (el) => el.id === user?.default_address
    );

    return address;
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<{
    reference_id: string;
    store_link: string;
    address_id: string;
  }>({
    defaultValues: {
      address_id: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (addresses?.length == 1) {
      // console.log("runnnign inside useEffect");
      // const address = (addresses as Address[])?.find(
      //     (el) => el.id === user?.default_address
      // );
      // console.log(address);
      // console.log(addresses[0]?.id);
      setValue("address_id", addresses[0]?.id!, { shouldValidate: true });
    }
  }, [addresses]);

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

  const updataDeliveryAdressId = (id: string) => {
    setValue("address_id", id, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<{
    reference_id: string | null | undefined;
    store_link: string | null | undefined;
    address_id: string | null | undefined;
  }> = async (data) => {
    console.log(data);
    const toList = [
      {
        type: "ordered",
        toType: "admin",
        header: "New order placed ✨",
        toName: "admin",
        bodyContent: admin_orderPlaced(
          data.reference_id!,
          data.store_link!,
          "1",

          "istanbul"
        ),
        userName: user?.first_name + " " + user?.last_name,
        userProfile: user?.avatar_url,
        userContactNumber: user?.phone,
        userEmail: user?.email,
      },
      {
        type: "ordered",
        toType: "user",
        header: "Thank you for the order!",
        toName: user?.first_name + " " + user?.last_name,
        toMail: user?.email,
        bodyContent: user_orderPlaced(data.reference_id!),
        buttonContent: "Let’s Get Started",
        redirectLink: "",
      },
    ];
    try {
      let orderObj = {
        username: user?.email,
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
      if (result.ok) {
        createToast({
          type: "success",
          title: "success",
          message: "Created order successfully",
          timeOut: 1000,
        });

        /** sending mail after placing order   */
        try {
          sentMail(toList);
        } catch (error) {
          console.error(error);
        }

        router.push("/orders");
      } else {
        createToast({
          type: "error",
          title: "An error occurred",
          message: "Order create pipe failed, contact dev",
          timeOut: 3000,
        });
      }
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

  if (rank_is_loading) {
    return <div>content authorization in progress..</div>;
  }

  if (!rank_is_loading && rank !== "user") {
    return <div>401 - Unauthorized</div>;
  }


  return (
    <>
      <PageHeader
        content={t("addNewOrderPage.pageHeader.Title")}
        showCalender={false}
        title="Add New Order | MazExpress"
      />
      <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="flex-type1 gap-x-[10px] bg-[#EDF5F9] p-[10px] rounded-[6px] ">
                    <Image
                        src="/blueexclamatory.png"
                        alt="icon"
                        width={16}
                        height={16}
                    />
                    <p className="text-[14px] text-[#606060] font-[500] leading-[19.6px] ">
                        {t("addNewOrderPage.LinkPPart1")}
                        <span className="text-[#35C6F4]">
                            {t("addNewOrderPage.LinkPPart2")}
                        </span>
                    </p>
                </div> */}
        <div className="flex-type1 gap-x-[10px] mt-[25px]">
          <Controller
            name="reference_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactHookFormInput
                label={inputFieldLabels[0]}
                name="reference_id"
                value={value}
                onChange={onChange}
                type="string"
                error={errors.reference_id}
              />
            )}
          />
          <Controller
            name="store_link"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactHookFormInput
                value={value}
                onChange={onChange}
                label={inputFieldLabels[1]}
                name="store_link"
                type="string"
                error={errors.store_link}
              />
            )}
          />
        </div>
        <div className="mt-[20px]">
          <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px]">
            {t("addNewOrderPage.addressBook.Title")}
            <span
              className="text-[#35C6F4] mx-[10px] cursor-pointer hover:bg-[#EDF5F9] p-[5px] rounded-[4px]  "
              onClick={toggleAddNewAddressModal}
            >
              {t("addNewOrderPage.addressBook.AddButton")}
            </span>
          </p>
        </div>
        {errors.address_id?.message && (
          <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px] mt-[10px] ">
            {errors.address_id.message}
          </p>
        )}
        {addresses && addresses.length > 0 && (
          <div className="grid grid-cols-3 gap-3 py-5">
            {addresses &&
              addresses !== null &&
              (addresses as Address[]).map((data: Address) => {
                return (
                  <UserSavedAddress
                    type="add-new-order"
                    key={data.id}
                    address={data}
                    allAddresses={addresses}
                    register={register("address_id")}
                    edit={toggleEditUserAddressModal}
                    update={mutateAddresses}
                    updateDeliveryAddress={updataDeliveryAdressId}
                    selectedAddressId={getValues("address_id")}
                  />
                );
              })}
          </div>
        )}

        <button
          className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#35C6F4] rounded-[4px] p-[10px] mt-[25px]"
          type="submit"
        >
          {t("addNewOrderPage.SubmitButton")}
        </button>
      </form>
      {showAddNewAddressModal && (
        <AddNewAddressModal
          show={showAddNewAddressModal}
          close={toggleAddNewAddressModal}
          update={mutateAddresses}
          //   updateuser={mutateUser}
        />
      )}

      {showEditUserAddressModal && (
        <EditUserAddressModal
          update={mutateAddresses}
          show={showEditUserAddressModal}
          close={toggleEditUserAddressModal}
          address={editableAddress!}
          allAddresses={addresses}
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
