import React, { useEffect, createRef } from "react";

let useClickOutside = (handler: () => void) => {
    console.log('clickoutside')
    let modalNode = createRef<HTMLDivElement>();
    useEffect(() => {
        let mouseDownHandler = (event:MouseEvent) => {
            if (!modalNode.current?.contains(event.target as Node)) {
                handler();
            }
        };

        document.addEventListener("mousedown", mouseDownHandler);
        return () => {
            document.removeEventListener("mousedown", mouseDownHandler);
        };
    });

    return modalNode;
};
export default useClickOutside