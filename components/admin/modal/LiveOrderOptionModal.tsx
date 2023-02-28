import React, { forwardRef, RefObject } from "react";
import ClickOutside from "@/components/common/ClickOutside";
import { IOrderResponse } from "@/models/order.interface";
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/hooks/useUser";
import axios from "axios";
import { createToast } from "@/lib/toasts";
import { OrderEntity } from "@/lib/adapter/entities/OrderEntity";
import { UserEntity } from "@/lib/adapter/entities/UserEntity";

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  handler: () => void;
  trigger: RefObject<HTMLDivElement>;
  row: OrderEntity | UserEntity;
  type: string;
  stage?: number;
}
export type Ref = HTMLDivElement;

const LiveOrderOptionModal = forwardRef<HTMLDivElement, IProps>(
  (props, ref) => {
    const { user, status: userIsLoading } = useUser();

    const optionHandler = () => {
      switch (props.type) {
        case "pending":
          return "Arrived at Istanbul";
        case "shipments":
          return "Left Istanbul Warehouse";
        case "in-transit":
          return "Mark as delivered";
      }
    };

    const commentHandler = () => {
      console.log("commnet");
    };
    const actionHandler = async () => {
      switch (props.type) {
        case "pending":
          let rowFixed: OrderEntity = props.row as OrderEntity;
          // console.log("outer user", user);
          const result0 = await fetchJson(`/api/orders?id=${rowFixed.id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ status: "at-warehouse" }),
          });
          //   console.log(result0);
          const result0_2 = await fetchJson(`/api/tracking`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              order_id: props.row.id,
              stage: 1,
            }),
          });

          // check notifications for user and send notification
          // get notification for user
          // if (user.is_notifications_enabled) {
          //   // get admin notification on backend
          //   // send notification post
          //   const deliveredMessage = {
          //     title_notifications: "Order arrived at Istanbul warehouse!",
          //     content_notifications: `Your order number ${rowFixed.id} has been received at our Istanbul warehouse and will be shipped soon.`,
          //   };
          //   axios
          //     .post(
          //       "/api/notifications",
          //       {
          //         data: deliveredMessage,
          //         files: null,
          //         users: [user.id],
          //         notification_config: 1,
          //       },
          //       {
          //         headers: { "Content-Type": "multipart/form-data" },
          //       }
          //     )
          //     .then((response) => {
          //       createToast({
          //         type: "success",
          //         title: "Notified User",
          //         message: `Sent order received notification to userID ${user.id}`,
          //         timeOut: 2000,
          //       });

          //       //   console.log(response.data);
          //     });
          // }
          //   console.log(result0_2);
          break;
        case "shipments":
          let rowFixed2: OrderEntity = props.row as OrderEntity;

          // put to order
          const result1 = await fetchJson(`/api/orders?id=${rowFixed2.id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ status: "in-transit" }),
          });
          //   console.log(result1);
          // const result1_2 = await fetchJson("/api/tracking", {
          //   method: "POST",
          //   headers: { "Content-type": "application/json" },
          //   body: JSON.stringify({
          //     user_id: user.id,
          //     order_id: rowFixed2.id_orders,
          //     stage_tracking: 2,
          //   }),
          // });
          //   console.log(result1_2);
          // post to tracking

          break;
        case "in-transit":
          // increment stage for
          let rowFixed3: OrderEntity = props.row as OrderEntity;
          //   console.log(rowFixed3.id_orders, stage);

          if (props.stage === 2) {
            // received in libya action
            const result2_2 = await fetchJson("/api/tracking", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                order_id: rowFixed3.id,
                stage_tracking: 3,
              }),
            });
          }
          if (props.stage === 3) {
            // out for delivery action
            const result2_2 = await fetchJson("/api/tracking", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                order_id: rowFixed3.id,
                stage_tracking: 4,
              }),
            });
          }
          if (props.stage === 4) {
            // delivered action

            // set order status
            const result2 = await fetchJson(`/api/orders?id=${rowFixed3.id}`, {
              method: "PUT",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({ status: "delivered" }),
            });

            // enter tracking data
            const result2_2 = await fetchJson("/api/tracking", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                order_id: rowFixed3.id,
                stage_tracking: 5,
              }),
            });

            // send notification

            const deliveredMessage = {
              title_notifications: "Order Delivered!",
              content_notifications: `Your order number ${rowFixed3.id} has been delivered successfully, please leave a review if you liked our service.`,
            };
            axios
              .post(
                "/api/notifications",
                {
                  data: deliveredMessage,
                  files: null,
                  users: [String(rowFixed3.user.id)],
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
                  message: `Sent order delivered notification to userID ${rowFixed3.user.id}`,
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
                onClick={actionHandler}
              >
                <div className="cursor-pointer">
                  <span className="w-full ">Received in Libya</span>
                </div>
              </li>
            )}
            {props.type == "in-transit" && props.stage == 3 && (
              <li
                className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                onClick={actionHandler}
              >
                <div className="cursor-pointer">
                  <span className="w-full ">Out for delivery</span>
                </div>
              </li>
            )}
            <li
              className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
              onClick={actionHandler}
            >
              <div className="cursor-pointer">
                <span className="w-full ">
                  {props.type == "in-transit" ? (
                    props.stage == 4 ? (
                      optionHandler()
                    ) : (
                      <></>
                    )
                  ) : (
                    <>{optionHandler()}</>
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
