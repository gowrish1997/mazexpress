import React, { forwardRef, RefObject } from "react";
import Link from "next/link";
import ClickOutside from "@/components/common/ClickOutside";
import { IOrderResponse } from "@/models/order.interface";
import { IUser } from "@/models/user.interface";
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import axios from "axios";
import { createToast } from "@/lib/toasts";

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  handler: () => void;
  trigger: RefObject<HTMLDivElement>;
  row: IOrderResponse | IUser;
  type: string;
  stage?: number;
}
export type Ref = HTMLDivElement;

const optionHandler = (type: string) => {
  switch (type) {
    case "pending":
      return "Arrived at Istanbul";
    case "shipments":
      return "Left Istanbul Warehouse";
    case "in-transit":
      return "Mark as delivered";
    case "user_base":
      return "Send notificaton";
  }
};

const actionHandler = async (type: string, row: unknown, stage?: number) => {
  const user: IUser = await fetchJson(
    `/api/users?id=${(row as IOrderResponse).user_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  switch (type) {
    case "pending":
      let rowFixed: IOrderResponse = row as IOrderResponse;
      console.log("outer user", user);
      const result0 = await fetchJson(`/api/orders?id=${rowFixed.id_orders}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status_orders: "at-warehouse" }),
      });
      //   console.log(result0);
      const result0_2 = await fetchJson(`/api/tracking`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          user_id: rowFixed.user_id,
          order_id: rowFixed.id_orders,
          stage_tracking: 1,
        }),
      });
      // check notifications for user and send notification
      // get notification for user
      if (user.is_notifications_enabled_users === 1) {
        // get admin notification on backend
        // send notification post
        const deliveredMessage = {
          title_notifications: "Order arrived at Istanbul warehouse!",
          content_notifications: `Your order number ${rowFixed.id_orders} has been received at our Istanbul warehouse and will be shipped soon.`,
        };
        axios
          .post(
            "/api/notifications",
            {
              data: deliveredMessage,
              files: null,
              users: [String(rowFixed.user_id)],
              notification_config: 1,
            },
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
          .then((response) => {
            createToast({
              type: "success",
              title: "Notified User",
              message: `Sent order received notification to userID ${rowFixed.user_id}`,
              timeOut: 2000,
            });

            //   console.log(response.data);
          });
      }
      //   console.log(result0_2);
      break;
    case "shipments":
      let rowFixed2: IOrderResponse = row as IOrderResponse;

      // put to order
      const result1 = await fetchJson(`/api/orders?id=${rowFixed2.id_orders}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status_orders: "in-transit" }),
      });
      //   console.log(result1);
      const result1_2 = await fetchJson("/api/tracking", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          user_id: rowFixed2.user_id,
          order_id: rowFixed2.id_orders,
          stage_tracking: 2,
        }),
      });
      //   console.log(result1_2);
      // post to tracking

      break;
    case "in-transit":
      // increment stage for
      let rowFixed3: IOrderResponse = row as IOrderResponse;
      //   console.log(rowFixed3.id_orders, stage);

      if (stage === 2) {
        // received in libya action
        const result2_2 = await fetchJson("/api/tracking", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user_id: rowFixed3.user_id,
            order_id: rowFixed3.id_orders,
            stage_tracking: 3,
          }),
        });
      }
      if (stage === 3) {
        // out for delivery action
        const result2_2 = await fetchJson("/api/tracking", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user_id: rowFixed3.user_id,
            order_id: rowFixed3.id_orders,
            stage_tracking: 4,
          }),
        });
      }
      if (stage === 4) {
        // delivered action

        // set order status
        const result2 = await fetchJson(
          `/api/orders?id=${rowFixed3.id_orders}`,
          {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ status_orders: "delivered" }),
          }
        );

        // enter tracking data
        const result2_2 = await fetchJson("/api/tracking", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user_id: rowFixed3.user_id,
            order_id: rowFixed3.id_orders,
            stage_tracking: 5,
          }),
        });

        // send notification

        const deliveredMessage = {
          title_notifications: "Order Delivered!",
          content_notifications: `Your order number ${rowFixed3.id_orders} has been delivered successfully, please leave a review if you liked our service.`,
        };
        axios
          .post(
            "/api/notifications",
            {
              data: deliveredMessage,
              files: null,
              users: [String(rowFixed3.user_id)],
              notification_config: 2,
            },
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
          .then((response) => {
            createToast({
              type: "success",
              title: "Notified User",
              message: `Sent order delivered notification to userID ${rowFixed3.user_id}`,
              timeOut: 2000,
            });

            //   console.log(response.data);
          });
      }
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
    const { user, mutateUser } = useUser();

    return (
      <ClickOutside
        handler={props.handler}
        trigger={props.trigger}
        className="z-50 absolute top-0 left-0 w-full"
      >
        <div
          className="absolute top-[40px] right-[15px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] flex flex-col justify-between items-start p-[10px]"
          style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
          // ref={ref}
        >
          <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px] cursor-pointer  ">
            {props.type == "in-transit" && props.stage == 2 && (
              <li
                className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                onClick={() =>
                  actionHandler(props.type, props.row, props.stage)
                }
              >
                <div className="cursor-pointer">
                  <span className="w-full ">Received in Libya</span>
                </div>
              </li>
            )}
            {props.type == "in-transit" && props.stage == 3 && (
              <li
                className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                onClick={() =>
                  actionHandler(props.type, props.row, props.stage)
                }
              >
                <div className="cursor-pointer">
                  <span className="w-full ">Out for delivery</span>
                </div>
              </li>
            )}
            <li
              className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
              onClick={() => actionHandler(props.type, props.row, props.stage)}
            >
              <div className="cursor-pointer">
                <span className="w-full ">
                  {props.type == "in-transit" ? (
                    props.stage == 4 ? (
                      optionHandler(props.type)
                    ) : (
                      <></>
                    )
                  ) : (
                    <>{optionHandler(props.type)}</>
                  )}
                </span>
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
