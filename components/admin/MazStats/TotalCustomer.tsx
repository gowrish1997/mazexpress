import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import MazStatsDropddown from "./MazStatsDropddown";
import useUsers from "@/lib/hooks/useUsers";
import useUserCount from "@/lib/hooks/useUserCount";

const ageOptions = [
  { value: 0, label: "10-20" },
  { value: 1, label: "20-30" },
  { value: 2, label: "30-40" },
  { value: 3, label: "40+" },
];

const genderOptions = [
  { value: "", label: "all" },
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
  { value: "u", label: "Unknown" },
  { value: "o", label: "Other" },
];

const TotalCustomer = () => {
  const [ageSelection, setAgeSelection] = useState<(number | string)[]>([]);
  const [genderSelection, setGenderSelection] = useState<(number | string)[]>([
    "m",
    "f",
    "u",
    "o",
  ]);

  const { users, mutateUsers, usersIsLoading, usersError } = useUsers({
    include_admins: false,
    include_users: true,
    gender: genderSelection as string[],
    age: ageSelection as number[],
  });

  const ageChangeHandler = (value: number | string) => {
    // console.log(value);
    setAgeSelection((prev) => {
      if (prev.includes(value)) {
        return prev.filter((el) => el !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const genderChangeHandler = (value: string | number) => {
    // console.log(value);
    setGenderSelection((prev) => {
      if (prev.includes(value)) {
        return prev.filter((el) => el !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // useEffect(() => {
  //     console.log(userCount);
  // }, [ageSelection, genderSelection]);

  return (
    <StatCard>
      <div className="w-full flex items-center justify-between">
        <p className="text-[12px] text-[#8794AD] font-[600] leading-[18px] ">
          Total Customers
        </p>
        <div className="flex items-center">
          <MazStatsDropddown
            options={ageOptions}
            header="age"
            onChange={ageChangeHandler}
            selection={ageSelection}
          />
          <MazStatsDropddown
            options={genderOptions}
            header="gender"
            onChange={genderChangeHandler}
            selection={genderSelection}
          />
        </div>
      </div>
      <p className="text-[24px] text-[#18181B] font-[700] leading-[32px] ">
        {users?.count}
      </p>
    </StatCard>
  );
};

export default TotalCustomer;
