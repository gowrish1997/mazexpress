import { capitalizeFirstLetter } from "@/lib/helper";
import useUsers from "@/lib/hooks/useUsers";
import { User } from "@/models/user.model";
import Image from "next/image";
import Link from "next/link";

const RecentCustomers = () => {
    const { users, mutateUsers, usersIsLoading, usersError } = useUsers({
        per_page: 6,
    });

    return (
        <div
            className="p-[10px] border-[1px] border-[#BBC2CF] rounded-[4px] h-full space-y-[30px]"
            style={{ width: "calc(33% - 2px)" }}
        >
            <div className="w-full flex-type3">
                <p className="text-[14px] text-[#18181B] font-[600] leading-[24px]">
                    Recent Customers
                </p>
                <Link href="/admin/users">
                    <p className="text-[12px] text-[#35C6F4] font-[500] leading-[21px] cursor-pointer">{`See All Customers >`}</p>
                </Link>
            </div>
            <div className="space-y-[15px]">
                {users &&
                    (users.data as User[])?.length > 0 &&
                    (users.data as User[])?.map((data: User) => {
                        return (
                            <td
                                className={`flex flex-row justify-start items-center`}
                                key={data.email}
                            >
                                <div className="relative h-[30px] w-[30px] rounded-full overflow-hidden">
                                    <Image
                                        src={
                                            data?.avatar_url
                                                ?"https://mazbackend.easydesk.work/user/" +
                                                  data?.avatar_url
                                                :"/user-images/default_user.png"
                                        }
                                        fill
                                        style={{ objectFit: "cover" }}
                                        alt="profileImage"
                                    />
                                </div>
                                <div className="ml-[5px] flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                    <p className=" text-[12px] text-[#18181B] font-[800] leading-[22px] ">
                                        {capitalizeFirstLetter(
                                            data?.first_name
                                        ) +
                                            " " +
                                            capitalizeFirstLetter(
                                                data?.last_name
                                            )}
                                    </p>
                                    <p className="text-[12px] text-[#71717A] font-[400] leading-[22px] ">
                                        {" "}
                                        {data?.email}
                                    </p>
                                </div>
                            </td>
                        );
                    })}
            </div>
        </div>
    );
};

export default RecentCustomers;
