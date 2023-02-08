import useClickOutside from "@/lib/useClickOutside";
import React, { ReactNode, Ref, RefObject, useEffect, useRef } from "react";

interface IProp {
  children: ReactNode;
  handler: () => void;
  trigger: RefObject<HTMLDivElement | HTMLButtonElement>;
  className?: string 
}
const ClickOutside = (props: IProp) => {
  const wrapperRef = useRef(null);
  useClickOutside(props.handler, props.trigger, wrapperRef);
  return (
    <div ref={wrapperRef} className={props.className !== undefined ? props.className+''+'' : 'absolute top-0 left-0'}>
      {props.children}
    </div>
  );
};

export default ClickOutside;
