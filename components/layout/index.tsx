import React from "react";
interface ILayoutProps {
    children: React.ReactNode | React.ReactNode[] | null;
}
const Layout = (props: ILayoutProps) => {
    return (
        <div className="rounded-lg border border-[#E5E5E5] p-5 flex-1 h-full">
            {props.children}
        </div>
    );
};

export default Layout;
