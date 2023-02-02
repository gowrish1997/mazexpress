import React, { useEffect, createRef } from "react";

let useClickOutside = (handler: (e: any) => void, trigger: any, gate: boolean | number) => {
    let modalNode = createRef<any>();

    useEffect(() => {
        let outsideClickHandler = (event: MouseEvent) => {
            event.stopImmediatePropagation();
            // console.log(gate);
            // console.log(trigger.current, event.target, gate);
            // if (gate >= 0) {
            //     console.log("gate is greater than one");

            if (
                // trigger.current == event.target ||
                // trigger.current?.contains(event.target as Node) ||
                // event.target == modalNode.current
                // modalNode.current?.contains(event.target as Node)
                trigger.current?.src === event.target?.src
            ) {
            } else {
                handler(event);
            }

            // } else {
            //     // console.log("gate is closed");
            // }
        };

        document.addEventListener("mousedown", outsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler);
        };
    }, []);

    return modalNode;
};
export default useClickOutside;
