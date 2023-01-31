import React, { useEffect, createRef } from "react";

let useClickOutside = (
  handler: (e: any) => void,
  trigger: React.RefObject<HTMLElement>,
  gate: boolean | number
) => {
  let modalNode = createRef<HTMLDivElement>();
  useEffect(() => {
    let outsideClickHandler = (event: MouseEvent) => {
      //   console.log(trigger.current, event.target, gate);
      if (gate) {
        // console.log(trigger.current?.contains(event.target));
        // if trigger is clicked or if trigger contains clicked
        // dont execute handler
        // or if modal is clicked or modal children are clicked
        // dont execute handler
        if (
          trigger.current === event.target ||
          trigger.current?.contains(event.target as Node) ||
          event.target === modalNode.current ||
          modalNode.current?.contains(event.target as Node)
        ) {
          //   handler()
        } else {
          handler(event);
        }

        // if (
        //   !modalNode.current?.contains(event.target) &&
        //   event.target !== trigger?.current
        // ) {
        //   console.log("not container");
        //   handler();
        // }
      } else {
        // console.log("gate is closed");
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
