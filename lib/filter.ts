import moment from "moment";
import { OrderEntity } from "./adapter/entities/OrderEntity";
export const filter = (
  allLiveOrders: OrderEntity[],
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
