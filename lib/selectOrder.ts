export const selectOrder = (
  value: any,
  type: any,
  setSelectedOrder: any,
  filteredLiveOrders: any,
  selectedOrder: any
) => {
  if (type == "selectAllOrder") {
    console.log(filteredLiveOrders,selectedOrder)
    if (value) {
      const order = filteredLiveOrders?.map((el: any) => {
        if (el.id) {
          return el.id;
        } else {
          return el.id;
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
};
