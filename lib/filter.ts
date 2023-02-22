import moment from "moment";
import { IOrderResponse } from "@/models/order.interface";
export const filter = (
  allLiveOrders: IOrderResponse[],
  createdDateFilterKey: Date | string,
  mazTrackingIdFilterKey: string
) => {
  const liveOrder = allLiveOrders
    ?.filter((el) => {
      if (createdDateFilterKey) {
        return (
          moment(el.created_on_orders).format("DD-MM-YYYY") ===
          moment(createdDateFilterKey).format("DD-MM-YYYY")
        );
      } else {
        return el;
      }
    })
    .filter((el) => {
      return el.id_orders
        .toLocaleLowerCase()
        .includes(mazTrackingIdFilterKey?.toLocaleLowerCase());
    });

  return liveOrder;
};
