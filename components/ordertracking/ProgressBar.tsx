import React from "react";
import Image from "next/image";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Vehicle from "../../public/svgVehicle.svg";
import WareHouse from "../../public/svgWareHouse.svg";
import Check from "../../public/svgCheck.svg";

const MultiStepProgressBar = (props: { stepPercentage: number }) => {
    const progressBarStatusHandler = () => {
        switch (props.stepPercentage) {
            case 30:
                return "source_website";
            case 50:
                return "warehouse";
            case 80:
                return "out_for_delivery";

            case 100:
                return "delivered";

            default:
                return "";
        }
    };

    return (
        <div className={`${progressBarStatusHandler()}`}>
            <ProgressBar percent={props.stepPercentage}>
                <Step>
                    {({ accomplished }: { accomplished: boolean }) => (
                        <div className="indexStep_outerLayer">
                            <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                                <Vehicle />
                            </div>
                        </div>
                    )}
                </Step>
                <Step>
                    {({ accomplished }: { accomplished: boolean }) => (
                        <div className="indexStep_outerLayer">
                            <div className={`indexedStep ${accomplished ? "accomplished1" : null}`}>
                                <WareHouse className={`${accomplished ? "" : "wareHouse__icon"}`} />
                            </div>
                        </div>
                    )}
                </Step>
                <Step>
                    {({ accomplished }: { accomplished: boolean }) => (
                        <div className="indexStep_outerLayer">
                            <div className={`indexedStep ${accomplished ? "accomplished2" : null}`}>
                                <Vehicle className={`${accomplished ? "" : "wareHouse__icon"}`} />
                            </div>
                        </div>
                    )}
                </Step>
                <Step>
                    {({ accomplished }: { accomplished: boolean }) => (
                        <div className="indexStep_outerLayer">
                            <div className={`indexedStep ${accomplished ? "accomplished3" : null}`}>
                                <Check className={`${accomplished ? "check__icon" : ""}`} />
                            </div>
                        </div>
                    )}
                </Step>
            </ProgressBar>
        </div>
    );
};

export default MultiStepProgressBar;
