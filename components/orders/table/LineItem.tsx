import React from "react";
import Image from "next/image";
import OrderOptionModal from "../modal/OrderOptionModal";
import useClickOutside from "@/customHook/useClickOutside";
import { IOrderDetail } from "@/models/orders";
interface IProp {
    row: IOrderDetail;
    active: number;
    setActiveHandler: (index: number, e: any) => void;
    index: number;
    show: boolean;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

const LineItem = ({ row, active, setActiveHandler, index, show, setActive }: IProp) => {
    let modalNode = useClickOutside(() => {
        setActive(-1);
    });

    function optionModalHandler(e: any, index: number) {
        setActiveHandler(index, e);
    }

    const orderStatusColorHandler= (status:string) => {
        switch (status) {
            case "In Transit":
                return "in_transit";

            case "Delivered":
                return "delivered";

            case "At warehouse":
                return "at_warehouse";

            default:
        }
    };

    return (
        <>
            <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px]">
                <td className={`td1`}>{row.mazTrackingId}</td>
                <td className={`td2`}>{row.storeLink}</td>
                <td className={`td3`}>{row.referenceId}</td>
                <td className={`td4`}>{row.estimateDelivery}</td>
                <td className={`td5`}>{row.address}</td>
                <td className={`td6 customRadioInput ${orderStatusColorHandler(row.status)}`}>
                    <input type="radio" checked={true}></input>
                    <span className="ml-[5px]">{row.status}</span>
                </td>
                <td className="box-border relative cursor-pointer" onClick={(e) => optionModalHandler(e, index)}>
                    <Image src="/editicon.png" height={13} width={4} alt="editIcon" />
                    {show && <OrderOptionModal ref={modalNode} />}
                </td>
            </tr>
        </>
    );
};

export default LineItem;
