import React, { useState } from "react";
import axios from "axios";
const registerSample = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [toList, setToList] = useState([
        {
            type: "register",
            toType: "admin",
            header: "New User joined ✨",
            name: "admin",
            userName: "",
            userProfile: "",
            userContactNumber: "",
            userEmail: "",
        },
    ]);

    const sendMailHanlder = () => {
        axios
            .post("/api/mjmlreact")
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

export default registerSample;
