import React, { forwardRef, RefObject } from "react";
import Link from "next/link";
import ClickOutside from "@/components/common/ClickOutside";
import { IOrderResponse } from "@/models/order.interface";
import { IUser } from "@/models/user.interface";
import fetchJson from "@/lib/fetchJson";

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  handler: () => void;
  trigger: RefObject<HTMLDivElement>;
  row: IOrderResponse | IUser;
  type: string;
}
export type Ref = HTMLDivElement;

const optionHandler = (type: string) => {
  switch (type) {
    case "live_order":
      return "Move to shipments";
    case "shipments":
      return "Moved out";
    case "in-transit":
      return "Mark as delivered";
    case "user_base":
      return "Send notificaton";
  }
};

const actionHandler = async (type: string, row: unknown) => {
  switch (type) {
    case "live_order":
      let rowFixed: IOrderResponse = row as IOrderResponse;

      const result0 = await fetchJson(`/api/orders?id=${rowFixed.id_orders}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status_orders: "at-warehouse" }),
      });
      console.log(result0);
      const result0_2 = await fetchJson(`/api/orders?id=${rowFixed.id_orders}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status_orders: "at-warehouse" }),
      });
      console.log(result0);
      break;
    case "shipments":
      let rowFixed2: IOrderResponse = row as IOrderResponse;

      // put to order
      const result1 = await fetchJson(`/api/orders?id=${rowFixed2.id_orders}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status_orders: "in-transit" }),
      });
      console.log(result1);
      // const result2 = await fetchJson('/api/tracking', {
      //     method: "POST",
      //     headers: { "Content-type" : "application/json"},
      //     body: JSON.stringify({
      //         order_id: rowFixed.id_orders,
      //         stage_tracking:
      //     })
      // })
      // post to tracking

      break;
    case "in-transit":
      console.log("mark as delievered");
      break;
    case "user_base":
      console.log("user_base");
      break;
    default:
      console.log("default");
      break;
  }
};

const commentHandler = () => {
  console.log("commnet");
};

const LiveOrderOptionModal = forwardRef<HTMLDivElement, IProps>(
  (props, ref) => {
    return (
      <ClickOutside handler={props.handler} trigger={props.trigger}>
        <div
          className="absolute top-[40px] right-[15px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] flex flex-col justify-between items-start p-[10px]  "
          style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
          // ref={ref}
        >
          <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px] cursor-pointer  ">
            <li
              className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
              onClick={() => actionHandler(props.type, props.row)}
            >
              <div className="cursor-pointer">
                <span className="w-full ">{optionHandler(props.type)}</span>
              </div>
            </li>
            {props.type == "in-transit" && (
              <li
                className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                onClick={commentHandler}
              >
                <div className="cursor-pointer">
                  <span className="w-full ">Add comment</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </ClickOutside>
    );
  }
);
LiveOrderOptionModal.displayName = "LiveOrderOptionModal";
export default LiveOrderOptionModal;
