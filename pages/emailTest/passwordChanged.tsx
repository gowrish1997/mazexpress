import React, { useState } from "react";
import axios from "axios";
import { user_passwordChangedContent } from "@/lib/emailContent/bodyContent";

const PasswordChanged = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [toList, setToList] = useState([
       
        {
            type: "password_changed",
            toType: "user",
            header: "Your Maz Express Password has been changed successfully ✨",
            toName: "Alex",
            toMail: "kotarigowrish@gmail.com",
            bodyContent:user_passwordChangedContent(),
            buttonContent: "Login now",
            redirectLink:""
        },
    ]);

    const sendMailHanlder = () => {
        axios
            .post("/api/emailTemplate", toList)
            .then((data) => {
              
                // console.log(data.data.body.html);
                // setHtmlCode(data.data.body);
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

export default PasswordChanged;