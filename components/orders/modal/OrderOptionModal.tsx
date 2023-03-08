import React, { forwardRef, RefObject } from "react";
import Link from "next/link";
import ClickOutside from "@/components/common/ClickOutside";
import { Order } from "@/models/entity/Order";

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  handler: () => void;
  trigger: RefObject<HTMLDivElement>;
  row: Order;
}
export type Ref = HTMLDivElement;

const OrderOptionModal = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  return (
    <ClickOutside handler={props.handler} trigger={props.trigger}>
      <div
        className="absolute top-[10px] right-0 w-[150px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] z-10 flex flex-col justify-between items-start p-[5px]"
        style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
        // ref={ref}
      >
        <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px]  ">
          <Link href={`/track/${props.row.id}`}>
            <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] ">
              <div className="cursor-pointer">
                <span className="ml-[15px] w-full ">Track order</span>
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </ClickOutside>
  );
});

OrderOptionModal.displayName = "OrderOptionModal";
export default OrderOptionModal;
