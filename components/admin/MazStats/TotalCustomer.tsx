import React, { useEffect } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useUsers from "@/lib/hooks/useUsers";
const options = [
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

  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <StatCard>
      <div className="w-full flex-type3">
        <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">
          Total Customers
        </p>
        <MazStatsDropddown
          options={options}
          type="age"
          onChange={ageChangeHanlder}
        />
        <MazStatsDropddown
          options={options}
          type="gender"
          onChange={genderChangeHanlder}
        />
      </div>
      <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
        {users as number}
      </p>
    </StatCard>
  );
};

export default TotalCustomer;
