import React, { useEffect, createRef, RefObject } from "react";

let useClickOutside = (
  handler: (e?: any) => void,
  trigger: RefObject<HTMLDivElement | HTMLButtonElement>,
  ref: RefObject<HTMLDivElement>
) => {
  let modalNode = createRef<any>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !trigger.current?.contains(event.target as Node)
      ) {
        // alert("You clicked outside of me!");
        handler(event);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler, trigger]);

  return modalNode;
};
export default useClickOutside;
