import React, { useState } from "react";
import MazStatsDropddown from "./MazStatsDropddown";

const StatCard = (props: any) => {
  return (
    <div className="flex-1 flex-type8 border-[1px] border-[#BBC2CF] rounded-[4px] h-[100px] p-[10px] hover:bg-[#EDF5F9]">
      {props.children}
    </div>
  );
};

export default StatCard;
