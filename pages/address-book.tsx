import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import UserSavedAddress from "@/components/orders/UserSavedAddress";
import AddNewAddressModal from "@/components/orders/modal/AddNewAddressModal";
import useAddresses from "@/lib/hooks/useAddresses";
import useUser from "@/lib/hooks/useUser";
import { IAddressProps } from "@/models/address.interface";
import EditUserAddressModal from "@/components/orders/modal/EditUserAddressModal";
import { AddressEntity } from "@/lib/adapter/entities/AddressEntity";

const AddressBook = () => {
  const [showEditUserAddressModal, setShowEditUserAddressModal] =
    useState<boolean>(false);
  // const [editableAddress, setEditableAddress] = useState<IAddressProps>();

  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const { user, status: userIsLoading } = useUser();
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

  useEffect(() => {
    console.log(addresses)
  }, [addressesIsLoading])

  return (
    <>
      <PageHeader content="My Address Book" title="Address Book | MazExpress" />
      <div className="grid grid-cols-3 gap-3 py-5">
        {
          addressesIsLoading && <div>loading</div>
        }
        {addresses &&
          addresses.data
            // ?.filter((el) => el.status === 1)
            .map((data: AddressEntity) => {
              return (
                <UserSavedAddress
                  key={data.id}
                  address={data}
                  edit={toggleEditUserAddressModal}
                  // update={() => {}}
                />
              );
            })}
      </div>
      <div>
        <button
          className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px] mt-[25px]"
          onClick={toggleAddNewAddressModal}
        >
          + Add New
        </button>
      </div>

      <AddNewAddressModal
        show={showAddNewAddressModal}
        close={toggleAddNewAddressModal}
        update={mutateAddresses}
      />
      {/* {showEditUserAddressModal && (
        <EditUserAddressModal
          update={mutateAddresses}
          show={showEditUserAddressModal}
          close={toggleEditUserAddressModal}
          // address={editableAddress!}
        />
      )} */}
    </>
  );
};

export default AddressBook;
