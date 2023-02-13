import React, { useEffect, createRef, RefObject } from "react";

let useClickOutside = (handler: () => void, trigger: RefObject<HTMLDivElement>, ref: RefObject<HTMLDivElement>) => {
    let modalNode = createRef<any>();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) {
                // alert("You clicked outside of me!");
                handler();
            } else {
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return modalNode;
};
export default useClickOutside;
