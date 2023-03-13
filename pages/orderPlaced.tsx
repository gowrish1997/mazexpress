import React, { useState } from "react";
import axios from "axios";
const orderPlaced = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const sendMailHanlder = () => {
        axios
            .post("/api/emailTemplate")
            .then((data) => {
                console.log(data.data.body.html);
                setHtmlCode(data.data.body.html);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    return (
        <div className="">
            <button className="border-[1px] border-[blue] p-[5px] rounded-[6px] " onClick={sendMailHanlder}>
                send mail
            </button>
            <div className="w-full" dangerouslySetInnerHTML={{ __html: htmlCode }}></div>
        </div>
    );
};

export default orderPlaced