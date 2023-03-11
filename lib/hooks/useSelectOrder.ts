import { Order } from "@/models/order.model";
import { User } from "@/models/user.model";

interface IProp {
  value: any;
  type: string;
  selectedOrder: any;
  setSelectedOrder: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  filteredLiveOrders: Order[] & User[];
}

export default function useSelectOrder(props: IProp) {
  if (props.type == "selectAllOrder") {
    if (props.value) {
      const order = props.filteredLiveOrders?.map((el: any) => {
        if (el.id_orders) {
          return el.id_orders;
        } else {
          return el.id_users;
        }
      });
      props.setSelectedOrder(order);
    } else {
      props.setSelectedOrder([]);
    }
  } else {
    const order = props.selectedOrder?.find((el: any) => el == props.value);

    if (!order) {
      props.setSelectedOrder((prev: any) => {
        return [...(prev ? prev : []), props.value];
      });
    } else {
      const filteredOrder = props.selectedOrder?.filter((el: any) => {
        return el !== props.value;
      });
      props.setSelectedOrder(filteredOrder);
    }
  }
  return "a7";
}
