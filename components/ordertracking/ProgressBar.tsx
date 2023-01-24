import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
const MultiStepProgressBar = () => {
    const array = [20, 40, 80, 100];

    var stepPercentage = 30;

    return (
        <div className="gowrish">
            <ProgressBar percent={stepPercentage} text="gowrish" className="gowrish">
                <Step>{({ accomplished, index }) => <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>{index + 1}</div>}</Step>
                <Step>{({ accomplished, index }) => <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>{index + 1}</div>}</Step>
                <Step>{({ accomplished, index }) => <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>{index + 1}</div>}</Step>
                <Step>{({ accomplished, index }) => <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>{index + 1}</div>}</Step>
            </ProgressBar>
        </div>
    );
};

export default MultiStepProgressBar;
