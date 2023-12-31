import React, { forwardRef, RefObject } from "react";
import Link from "next/link";
import ClickOutside from "@/components/common/ClickOutside";
import { Order } from "@/models/order.model";
import { useRouter } from "next/router";

interface IProps {
  ref: React.RefObject<HTMLDivElement>;
  handler: () => void;
  trigger: RefObject<HTMLDivElement>;
  row: Order;
  toggle?: () => void;
  show?: boolean;
}
export type Ref = HTMLDivElement;

const OrderOptionModal = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <ClickOutside handler={props.handler} trigger={props.trigger}>
      <div
        className={`absolute ${
          locale == "en" ? "right-[0px]" : "left-[0px]"
        } top-[0px]  w-[150px] bg-[#ffffff] border-[1px] border-[#EDF5F9] rounded-[6px] z-10 flex flex-col justify-between items-start p-[5px]`}
        style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
        // ref={ref}
      >
        <ul className=" w-full text-[#525D72] text-[14px] font-[400] leading-[39px]  ">
          <Link href={`/track/${props.row.maz_id}`}>
            <li className="hover:bg-[#EDF5F9] w-full rounded-[4px] ">
              <div className="cursor-pointer">
                <span className="ml-[15px] w-full ">Track order</span>
              </div>
            </li>
          </Link>
          {props.show && (
            <li
              className="hover:bg-[#EDF5F9] w-full rounded-[4px] "
              onClick={() => props.toggle()}
            >
              <div className="cursor-pointer">
                <span className="ml-[15px] w-full ">Cancel order</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </ClickOutside>
  );
});

OrderOptionModal.displayName = "OrderOptionModal";
export default OrderOptionModal;
