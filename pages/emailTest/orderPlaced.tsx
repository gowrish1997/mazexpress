import React, { useState } from "react";
import axios from "axios";
import { user_orderPlaced,admin_orderPlaced } from "@/lib/emailContent/bodyContent";
const OrderPlaced = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [toList, setToList] = useState([
        {
            type: "ordered",
            toType: "admin",
            header: "New order placed ✨",
            toName: "admin",
            bodyContent: admin_orderPlaced("123234","2","2000","istanbul"),
            userName: "gowrish",
            userProfile: "",
            userContactNumber: "8310623228",
            userEmail: "kotarigowrish@gmail.com",
        },
        {
            type: "ordered",
            toType: "user",
            header: "Thank you for the order!",
            toName: "Alex",
            toMail: "kotarigowrish@gmail.com",
            bodyContent:user_orderPlaced("1231"),
            buttonContent: "Let’s Get Started",
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

export default OrderPlaced;