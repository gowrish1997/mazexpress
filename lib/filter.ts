import { Order } from "@/models/entity/Order";
import moment from "moment";
export const filter = (
  allLiveOrders: Order[],
  createdDateFilterKey: Date | string,
  mazTrackingIdFilterKey: string
) => {
  const liveOrder = allLiveOrders
    ?.filter((el) => {
      if (createdDateFilterKey) {
        return (
          moment(el.created_on).format("DD-MM-YYYY") ===
          moment(createdDateFilterKey).format("DD-MM-YYYY")
        );
      } else {
        return el;
      }
    })
    .filter((el) => {
      return el.id
        .toLocaleLowerCase()
        .includes(mazTrackingIdFilterKey?.toLocaleLowerCase());
    });

  return liveOrder;
};
