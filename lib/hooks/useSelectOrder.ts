import { UserEntity } from '@/lib/adapter/entities/UserEntity';
import { OrderEntity } from '@/lib/adapter/entities/OrderEntity';
interface IProp {
  value: any;
  type: string;
  setSelectedOrder: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  filteredLiveOrders: OrderEntity[] & UserEntity[];
}
export default function useSelectOrder(
  value: any,
  type: any,
  setSelectedOrder: any,
  filteredLiveOrders: any,
  selectedOrder: any
) {
  if (type == "selectAllOrder") {
    if (value) {
      const order = filteredLiveOrders?.map((el: any) => {
        if (el.id_orders) {
          return el.id_orders;
        } else {
          return el.id_users;
        }
      });
      setSelectedOrder(order);
    } else {
      setSelectedOrder([]);
    }
  } else {
    const order = selectedOrder?.find((el: any) => el == value);

    if (!order) {
      setSelectedOrder((prev: any) => {
        return [...(prev ? prev : []), value];
      });
    } else {
      const filteredOrder = selectedOrder?.filter((el: any) => {
        return el !== value;
      });
      setSelectedOrder(filteredOrder);
    }
  }
  return "gowrish";
}
