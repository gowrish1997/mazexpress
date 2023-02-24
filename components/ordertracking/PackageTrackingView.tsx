import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Vehicle from "../../public/svgVehicle.svg";
import WareHouse from "../../public/svgWarehouse.svg";
import Check from "../../public/svgCheck.svg";

const PackageTrackingView = (props: { packageStatus: number }) => {
  const progressBarStatusHandler = () => {
    switch (props.packageStatus) {
      case 0:
        return "source_website";
      case 1:
        return "warehouse";
      case 2:
        return "warehouse";
      case 3:
        return "warehouse";
      case 4:
        return "out_for_delivery";

      case 5:
        return "delivered";

      default:
        return "";
    }
  };

  const percentHandler = (status: number) => {
    switch (status) {
      case 0:
        return 0;
      case 1:
        return 50;
      case 2:
        return 50;
      case 3:
        return 50;
      case 4:
        return 80;

      case 5:
        return 100;

      default:
        return "";
    }
  };

  return (
    <div className={`${progressBarStatusHandler()}  `}>
      <ProgressBar percent={percentHandler(props.packageStatus)}>
        <Step>
          {({ accomplished }: { accomplished: boolean }) => (
            <div className="indexStep_outerLayer">
              <div
                className={`indexedStep ${
                  props.packageStatus == 0 ? "accomplished" : ""
                } ${props.packageStatus > 0 ? "accomplished1" : ""}`}
              >
                <Vehicle />
              </div>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }: { accomplished: boolean }) => (
            <div className="indexStep_outerLayer">
              <div
                className={`indexedStep ${
                  props.packageStatus >= 1 ? "accomplished" : ""
                } ${props.packageStatus > 3 ? "accomplished1" : ""}`}
              >
                <WareHouse
                  className={`${accomplished ? "" : "wareHouse__icon"}`}
                />
              </div>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }: { accomplished: boolean }) => (
            <div className="indexStep_outerLayer">
              <div
                className={`indexedStep ${
                  props.packageStatus == 4 ? "accomplished" : ""
                } ${props.packageStatus > 4 ? "accomplished1" : ""}`}
              >
                <Vehicle
                  className={`${accomplished ? "" : "wareHouse__icon"}`}
                />
              </div>
            </div>
          )}
        </Step>
        <Step>
          {({ accomplished }: { accomplished: boolean }) => (
            <div className="indexStep_outerLayer">
              <div
                className={`indexedStep ${
                  props.packageStatus == 5 ? "accomplished" : ""
                }`}
              >
                <Check className={`${accomplished ? "check__icon" : ""}`} />
              </div>
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default PackageTrackingView;
