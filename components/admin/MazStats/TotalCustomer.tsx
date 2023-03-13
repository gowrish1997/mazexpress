import React, { useEffect } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useUsers from "@/lib/hooks/useUsers";
const genderOptions = [
    { value: "u", label: "male" },
    { value: "f", label: "female" },
    { value: "u", label: "unknown" },
    { value: "o", label: "other" },
];
const ageOptions = [
    { value: "", label: "all age" },
    { value: "10-20", label: "10-20" },
    { value: "10-20", label: "10-20" },
    { value: "10-20", label: "10-20" },
];
const TotalCustomer = () => {
  const { users, mutateUsers } = useUsers({
    is_admin: false,
    count: true,
    count_all: true,
  });
  const ageChangeHanlder = (value: number | string) => {
    console.log(value);
  };

  const genderChangeHanlder = (value: string | number) => {
    console.log(value);
  };

    return (
        <StatCard>
            <div className="w-full flex-type3">
                <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">Total Customers</p>
                <MazStatsDropddown options={ageOptions} type="age" onChange={ageChangeHanlder} />
                <MazStatsDropddown options={genderOptions} type="gender" onChange={genderChangeHanlder} />
            </div>
            <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">1000</p>
        </StatCard>
    );
};

export default TotalCustomer;
