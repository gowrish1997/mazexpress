import useClickOutside from "@/lib/hooks/useClickOutside";
import React, { ReactNode, RefObject, useRef } from "react";

interface IProp {
  children: ReactNode;
  handler: (e?: any) => void;
  trigger: RefObject<HTMLDivElement | HTMLButtonElement>;
  className?: string;
}
const ClickOutside = (props: IProp) => {
  const wrapperRef = useRef(null);
  useClickOutside(props.handler, props.trigger, wrapperRef);
  return (
    <div
      ref={wrapperRef}
      className={
        props.className !== undefined
          ? props.className + "" + ""
          : "absolute"
      }
    >
      {props.children}
    </div>
  );
};

export default ClickOutside;
