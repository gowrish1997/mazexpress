import React from "react";
import DummyChild from "./DummyChild";
import { useTranslation } from "react-i18next";
const Dummy = () => {
    const {t}= useTranslation();
    return (
        <>
            <div>{t("greeting")}</div>
            <DummyChild name={"Iam dummy child"} />
        </>
    );
};

export default Dummy;
