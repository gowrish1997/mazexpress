import fetchJson from "@/lib/fetchServer";
import { APIResponse } from "@/models/api.model";
import { NotificationConfig } from "@/models/notification-config.model";
import { faPen, faRocket, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactSwitch from "react-switch";

interface IProp {
  data: NotificationConfig;
  toggle: (id: string) => void;
}

const ConfigCard = (props: IProp) => {
  const fireCustomNotification = () => {};

  const deleteNotificationConfig = async () => {
    const deleteResult: APIResponse<NotificationConfig> = await fetchJson(
      `/api/notification-settings/${props.data.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (deleteResult.ok) {
    } else {
    }
  };

  const editNotificationConfig = () => {};

  return (
    <div
      className="box-border w-full md:min-w-[49%] md:max-w-[49%] xmd:min-w-[32.5%] xmd:max-w-[32.5%] rounded-[4px] p-[25px] flex flex-col justify-between"
      style={{
        backgroundColor: props.data.is_enabled ? "#EDF5F9" : "white",
        border: props.data.is_enabled ? "none" : "1px solid #BBC2CF",
      }}
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-[#2B2B2B] font-[500] leading-[21px] w-max">
            {props.data.title}
          </p>

          <div className="flex items-center self-start">
            <label className="text-[10px] Inter mr-1">
              {props.data.is_enabled ? "Enabled" : "Disabled"}
            </label>
            <ReactSwitch
              checked={props.data.is_enabled}
              onChange={() => props.toggle(props.data.id)}
              checkedIcon={false}
              uncheckedIcon={false}
              handleDiameter={10}
              height={13}
              width={22}
              onColor={"#35C6F4"}
              offColor={"#BBC2CF"}
              offHandleColor={"#fff"}
              //   className={props.data.is_enabled ? "blue_border":"gray_border"}
              activeBoxShadow={""}
            />
          </div>
        </div>

        <p className="text-[13px] text-[#8794AD] font-[500] leading-[17px] mt-[7px] flex-1">
          {props.data.desc}
        </p>
      </div>
      {/* {props.data.is_custom && (
        <div className="flex items-center justify-between text-[12px] text-[#35C6F4] font-[500] leading-[17px]">
          <div className="space-x-[10px] flex items-center">
            <div
              className="hover:font-[600] hover:bg-sky-100 rounded cursor-pointer p-2 flex flex-col items-center space-y-[5px]"
              onClick={editNotificationConfig}
            >
              <FontAwesomeIcon icon={faPen} className="max-w-[11px]" />
              <span>Edit</span>
            </div>
            <div
              className="hover:font-[600] hover:bg-sky-100 rounded cursor-pointer p-2 flex flex-col items-center space-y-[5px]"
              onClick={deleteNotificationConfig}
            >
              <FontAwesomeIcon icon={faTrash} className="max-w-[10px]" />
              <span>Delete</span>
            </div>
          </div>
          {props.data.is_reusable && (
            <div
              className="hover:font-[600] hover:bg-sky-100 rounded cursor-pointer p-2 text-[13px] h-full flex flex-col items-center space-y-[5px]"
              onClick={fireCustomNotification}
            >
              <FontAwesomeIcon icon={faRocket} className="max-w-[11px]" />
              <span>Fire</span>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default ConfigCard;
