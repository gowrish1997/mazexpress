import { IOrderResponse } from "@/models/order.interface";
interface IProp {
    value: any;
    type: string;
    setSelectedOrder: React.Dispatch<React.SetStateAction<string[] | undefined>>;
    allLiveOrders: IOrderResponse;
}
export const useSelectOrder = (value:string,type:string,setSelectedOrder:React.Dispatch<React.SetStateAction<string[] | undefined>>,allLiveOrders:IOrderResponse[],selectedOrder:string[   ]) => {
    if (type == "selectAllOrder") {

        if(selectedOrder?.length==allLiveOrders?.length){
       setSelectedOrder([])
        }
        else{
            const order=allLiveOrders?.map((el) =>el.id_orders);
            setSelectedOrder(order)
            console.log(order)

        }

    } else {
        const order = selectedOrder?.find((el) => el == value);

        if (!order) {
            setSelectedOrder((prev) => {
                return [...(prev ? prev : []), value];
            });
        } else {
            const filteredOrder = selectedOrder?.filter((el) => {
                return el !== value;
            });
            setSelectedOrder(filteredOrder);
        }
    }
    return "gowrish";
};
