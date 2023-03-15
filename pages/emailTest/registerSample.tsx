import React, { useState } from "react";
import axios from "axios";
import { user_registerBodyContet } from "@/lib/emailContent/bodyContent";
import { admin_registerBodyContent } from "@/lib/emailContent/bodyContent";
const RegisterSample = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [toList, setToList] = useState([
        {
            type: "register",
            toType: "admin",
            header: "New User joined ✨",
            toName: "admin",
            bodyContent: admin_registerBodyContent(),
            userName: "gowrish",
            userProfile: "",
            userContactNumber: "8310623228",
            userEmail: "kotarigowrish@gmail.com",
        },
        {
            type: "register",
            toType: "user",
            header: "Welcome to Maz Express",
            toName: "Alex",
            toMail: "kotarigowrish@gmail.com",
            bodyContent: user_registerBodyContet(),
            buttonContent: "Let’s Get Started",
            redirectLink:""
        },
    ]);

    const sendMailHanlder = () => {
        axios
            .post("/api/emailTemplate", toList)
            .then((data) => {
                console.log(data.data.body[1].html);
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

export default RegisterSample;
