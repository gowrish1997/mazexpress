import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useAllUser from "@/lib/useAllUsers";
import Image from "next/image";
import { IUser } from "@/models/user.interface";
const RecentCustomers = () => {
    const { allUser, mutateAllUser, allUserIsLoading, error } = useAllUser({
        per_page: 6,
    });
    console.log(allUser);
    return (
        <div className="p-[10px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full space-y-[30px]" style={{ width: "calc(33% - 2px)" }}>
            <div className="w-full flex-type3">
                <p className="text-[14px] text-[#18181B] font-[600] leading-[24px]">Recent Customers</p>
                <Link href="/admin/users">
                    <p className="text-[12px] text-[#3672DF] font-[500] leading-[21px] cursor-pointer">{`See All Customers >`}</p>
                </Link>
            </div>
            <div className="space-y-[15px]">
                {allUser &&
                    allUser.data.length > 0 &&
                    allUser.data.map((data: IUser,index:number) => {
                        return (
                            <td key={index} className={`flex flex-row justify-start items-center capitalize`}>
                                {allUser && (data as IUser)?.avatar_url_users !== undefined ? (
                                    <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden ">
                                        <Image src={"/user-images/" + (data as IUser)?.avatar_url_users} fill style={{ objectFit: "cover" }} alt="profileImage" />
                                    </div>
                                ) : (
                                    <div className="relative h-[30px] w-[30px] rounded-full   bg-slate-500">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                )}
                                <div className="ml-[5px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                    <p className=" text-[12px] text-[#18181B] font-[800] leading-[22px] ">
                                        {(data as IUser)?.first_name_users + "" + (data as IUser)?.last_name_users}
                                    </p>
                                    <p className="text-[12px] text-[#71717A] font-[400] leading-[22px] "> {(data as IUser)?.email_users}</p>
                                </div>
                            </td>
                        );
                    })}
            </div>
        </div>
    );
};

export default RecentCustomers;
