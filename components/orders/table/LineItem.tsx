import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import OrderOptionModal from "../modal/OrderOptionModal";
import useUser from "@/lib/hooks/useUser";
import useTracking from "@/lib/hooks/useTracking";
import { getDateInStringFormat } from "@/lib/helper";
import GreenRadioButton from "../../../public/green_svg.svg";
import RedRadioButton from "../../../public/red_svg.svg";
import YellowRadioButton from "../../../public/yellow_svg.svg";
import GreyRadioButton from "../../../public/grey_svg.svg";
import { Order } from "@/models/order.model";
import { Tracking } from "@/models/tracking.model";

interface IProp {
    row: Order;
    type: string;
}

const LineItem = (props: IProp) => {
    //   console.log(props.row);
    const trigger = useRef<any>();

    const { user, mutateUser } = useUser();

    //   console.log(addresses);
    const { tracking, trackingIsLoading, mutateTracking } = useTracking({
        maz_id: props.row.maz_id,
    });

    const [estDelivery, setEstDelivery] = useState<string>("...");
    const [gate, setGate] = useState(false);
    //   console.log(gate);

    function smartToggleGateHandler() {
        setGate(false);
    }
    function toggleGateHandler() {
        // console.log("toggle gate");
        setGate((prev) => !prev);
    }

    const orderStatusColorHandler = (status: string) => {
        switch (status) {
            case "in-transit":
                return <RedRadioButton />;
            case "out-for-delivery":
                return <RedRadioButton />;

            case "delivered":
                return <GreenRadioButton />;

            case "at-warehouse":
                return <YellowRadioButton />;
            case "pending":
                return <GreyRadioButton />;
            default:
                return "pending";
        }
    };

    useEffect(() => {
        // console.log("tracking rerender");
        if (
            tracking !== undefined &&
            tracking !== null &&
            tracking.length > 0
        ) {
            // sort and set delivery
            let latestUpdate = [...(tracking as Tracking[])].sort(
                (a, b) => b.stage - a.stage
            )[0];
            let newDate = new Date(latestUpdate?.created_on);
            newDate.setDate(newDate.getDate() + 7);
            const newDateString = getDateInStringFormat(newDate);
            setEstDelivery(newDateString!);
        }
    }, [tracking]);

    return (
        <tr className="h-min text-[16px] text-[#000000] font-[400] leading-[22.4px] relative">
            <td className={`td1`}>{props.row.maz_id}</td>
            <td className={`td2 text-[#35C6F4]`}>{props.row.store_link}</td>
            <td className={`td3`}>{props.row.reference_id}</td>
            <td className={`td4`}>
                {props.row.est_delivery
                    ? getDateInStringFormat(props.row.est_delivery)
                    : <span>{"..."}</span>}
            </td>
            <td className={`td5 `} style={{}}>
                <div className="flex flex-row items-center">
                    <span className="address_td capitalize ">
                        {props.row.address.city}
                    </span>

                    {user?.default_address === props.row.address.id && (
                        <div className="bg-[#FF645A] rounded-[4px] text-[10px] text-[#FFFFFF] font-[500] leading-[15px] py-[5px] px-[10px] ">
                            Default
                        </div>
                    )}
                </div>
            </td>
            <td className={`td6 `}>
                <div className="h-full flex flex-ropw justify-start items-center ">
                    <div className="pending__icon">
                        {orderStatusColorHandler(props.row.status)}
                    </div>
                    <span className="ml-[5px] capitalize">
                        {props.row.status}
                    </span>
                </div>
            </td>
            <td
                className=""
                // onClick={(e) => optionModalHandler(e, index)}
            >
                <div className="w-full h-full ">
                    <div
                        onClick={toggleGateHandler}
                        ref={trigger}
                        className="cursor-pointer relative"
                    >
                        <Image
                            src="/editicon.png"
                            // ref={trigger}
                            height={13}
                            width={4}
                            alt="editIcon"
                        />
                    </div>
                    {gate && (
                        <OrderOptionModal
                            // ref={modalNode}
                            row={props.row}
                            handler={smartToggleGateHandler}
                            trigger={trigger}
                        />
                    )}
                </div>
            </td>
        </tr>
    );
};
export default LineItem;
