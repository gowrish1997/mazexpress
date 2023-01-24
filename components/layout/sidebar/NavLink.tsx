import React from "react";
import Image from "next/image";
import Link from "next/link";
interface IProp {
    content: {
        id: string;
        title: string;
        icon: string;
        path:string
    };
}

const NavLink = (props:IProp) => {
    return (
        <Link
      href={{
        pathname: props.content.path,
      }}
      passHref
      // style={{ ...props.style }}
    >

        <div className=" box-border w-full flex flex-row justify-between items-center relative cursor-pointer px-[10px] rounded-[4px] py-[5px]   hover:bg-[#EDF5F9]">
            <div className=" flex flex-row justify-start items-center w-full">
                <Image src={props.content.icon} height={15} width={15} className="hover:text-[#9845DB]" alt={props.content.title} />
                <div
                    className="ml-3 text-[#525D72] font-[500] text-[14px] leading-[21px] hover:text-[#2B2B2B] hover:font-[600] py-2 transition duration-300 cursor-pointer"
                    // style={{
                        //   color: router.pathname.startsWith(props.slug)
                        //     ? "#9845DB"
                        //     : "black",
                        // }}
                        >
                    {props.content.title}
                </div>
            </div>
        </div>
                    </Link>
    );
};

export default NavLink;
