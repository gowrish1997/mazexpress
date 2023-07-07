import { capitalizeFirstLetter } from "@/lib/helper";
import { Warehouse } from "@/models/warehouse.model";
import copy from "copy-to-clipboard";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import GreenRadioButton from "../../public/green_svg.svg";
import RedRadioButton from "../../public/red_svg.svg";
import YellowRadioButton from "../../public/yellow_svg.svg";

const WarehouseCard = (props: { address: Warehouse }) => {
  const { t } = useTranslation("common");

  const wareHouseStatusColorHandler = (status: string) => {
    switch (status) {
      case "closed":
        return <RedRadioButton />;

      case "active":
        return <GreenRadioButton />;

      case "inactive":
        return <YellowRadioButton />;
      default:
        return "pending";
    }
  };

  const copyToClipboard = () => {
    copy(
      `${props.address.address_1} ,${props.address.address_2}, ${props.address.city}, ${props.address.country}, ${props.address.phone}`
    );
    alert(
      `you have copied ${props.address.address_1} ,${props.address.address_2}, ${props.address.city}, ${props.address.country}, ${props.address.phone}`
    );
  };

  return (
    <div className="box-border w-full h-[260px] sm:h-[220px] md:min-w-[49%] md:max-w-[49%] xmd:min-w-[32.5%] xmd:max-w-[32.5%] border-[0.4px] border-[#BBC2CF] hover:bg-[#EDF5F9] rounded-[4px] p-[25px] ">
      <div className="flex-type3 space-x-[10px]">
        <p className="text-[14px] text-[#2B2B2B] font-[600] leading-[21px] ">
          {capitalizeFirstLetter(props.address.tag)}
        </p>
        <div className="flex items-center">
          <div>{wareHouseStatusColorHandler(props.address.status)}</div>

          <span className="ml-[5px] text-[12px] text-[#2B2B2B] font-[500] leading-[18px] ">
            {capitalizeFirstLetter(props.address.status)}
          </span>
        </div>
      </div>
      <p className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] mt-[7px] capitalize ">
        {props.address.country}
      </p>
      <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">{`${props.address.address_1}, ${props.address.address_2}`}</p>
      <p className="text-[12px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] ">
        {props.address.city}
      </p>

      <div className="flex flex-row justify-between items-center mt-[15px] ">
        <div className="flex flex-row justify-start items-center gap-x-[4px] ">
          <Image src="/mobile.png" height={12} width={12} alt="mobile" />
          <div className="text-[12px] text-[#2B2B2B] font-[500] leading-[17px] ml-[10px]">
            {props.address.phone}
          </div>
        </div>

        <div
          className="flex justify-end text-[12px] text-[#35C6F4] font-[500] leading-[17px] space-x-[5px] cursor-pointer "
          onClick={copyToClipboard}
        >
          <Image src="/copy.png" alt="copy" height={12} width={12} />
          <span>{t("warehousePage.warehouseCard.Content")}</span>
        </div>
      </div>
    </div>
  );
};

export default WarehouseCard;
