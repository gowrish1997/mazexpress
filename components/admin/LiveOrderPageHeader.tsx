import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ReactDropdown from "../common/ReactDropdown";
import FilterOptionDropDown from "./FilterOptionDropDown";
import PageheaderTitle from "./PageheaderTitle";
import MoveToShipmentConfirmModal from "./modal/MoveToShipmentConfirmModal";
import { IOrderResponse } from "@/models/order.interface";

import AdminOptionDropDown from "./AdminOptionDropDown";
interface IProp {
    content: string;
    title?: string;
    onChangeStatus?: (value: string) => void;
    selectedOrder: string[];
    allLiveOrders: IOrderResponse[];
    filterByDate: (value: Date | string) => void;
}

const warehouse = ["istanbul"];
const adminOption = ["Move to Shipments"];

const LiveOrderPageHeader = (props: IProp) => {
    const [showMoveToShipmentConfirmModal, setShowMoveToShipmentConfirmModal] = useState(false);
    const [packageStatusDropDownOptoin, setPackageStatusDropDownOptoin] = useState<string[]>([]);
    const [warehousesDropDownOptoin, setWarehousesDropdownOption] = useState<string[]>(warehouse);

    useEffect(() => {
        const packageStatus = new Set();
        if (props.allLiveOrders) {
            for (const object of props.allLiveOrders) {
                if (object.status_orders != "delivered") packageStatus.add(object.status_orders);
            }

            setPackageStatusDropDownOptoin((prev) => {
                return ["status", ...(Array.from(packageStatus) as string[])];
            });
        }
    }, [props.allLiveOrders]);

    const toggleMoveToShipmentHandler = () => {
        setShowMoveToShipmentConfirmModal((prev) => !prev);
    };

    const moveToShipmentsHandler = () => {
        console.log(props.selectedOrder);
    };

    return (
        <>
            <div className={"w-full flex-type3 border-b-[1px] border-b-[#E3E3E3] pb-[20px] px-[5px] relative z-50 "}>
                <Head>
                    <title></title>
                </Head>
                <PageheaderTitle content={props.content} allLiveOrders={props.allLiveOrders} filterByDate={props.filterByDate} />
                {props.allLiveOrders && props.allLiveOrders.length > 0 && (
                    <div className="flex-type1 space-x-[10px] ">
                        <FilterOptionDropDown options={packageStatusDropDownOptoin} onChange={props.onChangeStatus!} />
                        <FilterOptionDropDown options={warehousesDropDownOptoin} />

                        <AdminOptionDropDown option={adminOption} toggle={toggleMoveToShipmentHandler} disabled={!props.selectedOrder?.length} orders={props.allLiveOrders} />
                    </div>
                )}
            </div>
            <MoveToShipmentConfirmModal
                close={toggleMoveToShipmentHandler}
                show={showMoveToShipmentConfirmModal}
                total={props.selectedOrder?.length!}
                confirm={moveToShipmentsHandler}
            />
        </>
    );
};

export default LiveOrderPageHeader;

// { backgroundColor: "#BBC2CF", color: "#FFFFFF" }
