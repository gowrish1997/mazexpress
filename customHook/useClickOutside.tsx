import React, { useEffect, createRef } from "react";

let useClickOutside = (
  handler: (e: any) => void,
  trigger: React.RefObject<HTMLElement>,
  gate: boolean
) => {
  let modalNode = createRef<HTMLDivElement>();
  useEffect(() => {
    let outsideClickHandler = (event: MouseEvent) => {
      console.log(modalNode.current?.contains(event.target as Node));
      if (gate) {
        if (
          // if you click the trigger do action
          trigger.current === event.target ||
          trigger.current?.contains(event.target as Node)
        ) {
          handler(event);
        } else if (
          // if you click the modal do nothing
          event.target === modalNode.current ||
          modalNode.current?.contains(event.target as Node)
        ) {
          //   handler()
          
        } else {
          // if you click outside the trigger and outside the modal do action
          handler(event);
        }
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  return modalNode;
};
export default useClickOutside;
