import React from "react";
import Image from "next/image";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Vehicle from "../../public/svgVehicle.svg";
import WareHouse from "../../public/svgWareHouse.svg";
import Check from "../../public/svgCheck.svg";
import DeliveryVehicle from "../../public/vehicle1.svg";
const MultiStepProgressBar = () => {
    const array = [20, 40, 80, 100];

    var stepPercentage = 100;

    return (
        <div className="gowrish relative">
            <ProgressBar percent={stepPercentage}>
                <Step>
                    {({ accomplished, index }) => (
                        <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                            <Vehicle />
                        </div>
                    )}
                </Step>
                <Step>
                    {({ accomplished, index }) => (
                        <div className={`indexedStep ${accomplished ? "accomplished1" : null}`}>
                            <WareHouse className={`${accomplished?"":"wareHouse__icon"}`} />
                        </div>
                    )}
                </Step>
                <Step>
                    {({ accomplished, index }) => (
                        <div className={`indexedStep ${accomplished ? "accomplished2" : null}`}>
                            <Vehicle className={`${accomplished?"":"wareHouse__icon"}`} />
                        </div>
                    )}
                </Step>
                <Step>
                    {({ accomplished, index }) => (
                        <div className={`indexedStep ${accomplished ? "accomplished3" : null}`}>
                            <Check className={`${accomplished?".check__icon":""}`}  />
                        </div>
                    )}
                </Step>
            </ProgressBar>
        </div>
    );
};

export default MultiStepProgressBar;
