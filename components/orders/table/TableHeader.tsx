import React from "react";
interface IProp {
  type: string;
  headings: Array<string>;

  onSelect: (e: string, type: string) => void;
}

const TableHeader = (props: IProp) => {
  const selectAllCheckboxClickHandler = (e: any) => {
    console.log(e.target.value);
    props.onSelect(e.target.checked, "selectAllOrder");
  };

  return (
    <thead className="w-full z-40">
      <tr className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px] border-b-[1px] border-[#e3e3e3] ">
        {(props.type == "pending" ||
          props.type == "shipments" ||
          props.type == "in-transit") && (
          <th className="th0">
            <input
              type="checkbox"
              className="h-[10px] w-[10px] cursor-pointer"
              onClick={selectAllCheckboxClickHandler}
            />
          </th>
        )}
        {props.headings.map((data, index) => {
          return (
            <th key={index} className={`th${index + 1}`}>
              {data}
            </th>
          );
        })}
        <th className={`th${props.headings?.length + 1}`}></th>
      </tr>
    </thead>
  );
};

export default TableHeader;
