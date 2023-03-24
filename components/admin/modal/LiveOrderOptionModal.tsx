import React, { forwardRef, RefObject } from "react";
import ClickOutside from "@/components/common/ClickOutside";
import fetchServer from "@/lib/fetchServer";
import useUser from "@/lib/hooks/useUser";
import axios from "axios";
import { createToast } from "@/lib/toasts";
import { Order } from "@/models/order.model";
import { User } from "@/models/user.model";
import { APIResponse } from "@/models/api.model";
import useOrders from "@/lib/hooks/useOrders";
import { singleOrderAction } from "@/lib/selectOrder";

import { KeyedMutator } from "swr";
interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  handler: () => void;
  trigger: RefObject<HTMLDivElement>;
  row: Order | User;
  type: string;
  stage?: number;
  click?: () => void;
  mutateOrder?: KeyedMutator<APIResponse<Order>>;
}
export type Ref = HTMLDivElement;

const LiveOrderOptionModal = forwardRef<HTMLDivElement, IProps>(
  (props, ref) => {
    const { user, mutateUser } = useUser();

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

    const actionHandler = async () => {
      switch (props.type) {
        case "pending":
          try {
            const result0_3 = await singleOrderAction(
              props.row as Order,
              "at-warehouse",
              1,
              "Order arrived at Istanbul warehouse!",
              "has been received at our Istanbul warehouse and will be shipped soon.",
              true
            );

            if (result0_3) {
              createToast({
                type: "success",
                title: "Notified User",
                message: `Sent order received notification to userID ${
                  (props.row as Order).user.id
                }`,
                timeOut: 2000,
              });
            } else {
              createToast({
                type: "error",
                title: "Failed creating notification",
                message: `check console for more info`,
                timeOut: 2000,
              });
            }
          } catch (error) {
            console.error(error);
          }

          props.mutateOrder?.();

          // console.log(result0_2);
          break;
        case "shipments":
          try {
            const result0_3 = await singleOrderAction(
              props.row as Order,
              "in-transit",
              2,
              "Order left Istanbul warehouse!",
              "has left our Istanbul warehouse and will be reach Libya soon.",
              true
            );

            if (result0_3) {
              createToast({
                type: "success",
                title: "Notified User",
                message: `Sent order left Istanbul warehouse notification to userID ${
                  (props.row as Order).user.id
                }`,
                timeOut: 2000,
              });
            } else {
              createToast({
                type: "error",
                title: "Failed creating notification",
                message: `check console for more info`,
                timeOut: 2000,
              });
            }
          } catch (error) {
            console.error(error);
          }

          // console.log(result1);

          props.mutateOrder?.();
          break;
        case "in-transit":
          // increment stage for
          let rowFixed3: Order = props.row as Order;
          //   console.log(rowFixed3.id_orders, stage);

          if (props.stage === 2) {
            // received in libya action

            try {
              const result0_3 = await singleOrderAction(
                props.row as Order,
                "in-transit",
                3,
                "Order received in Libya warehouse!",
                "has reached our Libya warehouse and will reach you soon.",
                false
              );

              if (result0_3) {
                createToast({
                  type: "success",
                  title: "Notified User",
                  message: `Sent order received in Libya warehouse notification to userID ${
                    (props.row as Order).user.id
                  }`,
                  timeOut: 2000,
                });
              } else {
                createToast({
                  type: "error",
                  title: "Failed creating notification",
                  message: `check console for more info`,
                  timeOut: 2000,
                });
              }
            } catch (error) {
              console.error(error);
            }

            // check notifications for user and send notification
            // get notification for user

            props.mutateOrder?.();
          }
          if (props.stage === 3) {
            try {
              const result0_3 = await singleOrderAction(
                props.row as Order,
                "out-for-delivery",
                4,
                "Order out for delivery!",
                "is out for delivery and will reach you soon.",
                false
              );

              if (result0_3) {
                createToast({
                  type: "success",
                  title: "Notified User",
                  message: `Sent order out for delivery notification to userID ${
                    (props.row as Order).user.id
                  }`,
                  timeOut: 2000,
                });
              } else {
                createToast({
                  type: "error",
                  title: "Failed creating notification",
                  message: `check console for more info`,
                  timeOut: 2000,
                });
              }
            } catch (error) {
              console.error(error);
            }

            props.mutateOrder?.();
          }
          if (props.stage === 4) {
            try {
              const result0_3 = await singleOrderAction(
                props.row as Order,
                "delivered",
                5,
                "Order delivered!",
                "has been marked as delivered.",
                true
              );

              if (result0_3) {
                createToast({
                  type: "success",
                  title: "Notified User",
                  message: `Sent order delivered notification to userID ${
                    (props.row as Order).user.id
                  }`,
                  timeOut: 2000,
                });
              } else {
                createToast({
                  type: "error",
                  title: "Failed creating notification",
                  message: `check console for more info`,
                  timeOut: 2000,
                });
              }
            } catch (error) {
              console.error(error);
            }

            // check notifications for user and send notification

            props.mutateOrder?.();
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
            <li
              className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
              onClick={props.click}
            >
              <div className="cursor-pointer">
                <span className="w-full ">View Order</span>
              </div>
            </li>
            {/* {props.type == "in-transit" && (
              <li
                className="hover:bg-[#EDF5F9] w-full rounded-[4px] px-[5px]"
                onClick={commentHandler}
              >
                <div className="cursor-pointer">
                  <span className="w-full ">Add comment</span>
                </div>
              </li>
            )} */}
          </ul>
        </div>
      </ClickOutside>
    );
  }
);
LiveOrderOptionModal.displayName = "LiveOrderOptionModal";
export default LiveOrderOptionModal;
