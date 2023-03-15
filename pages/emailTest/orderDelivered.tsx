import React, { useState } from "react";
import axios from "axios";
import { user_orderDelivered } from "@/lib/emailContent/bodyContent";
const OrderPlaced = () => {
    const [htmlCode, setHtmlCode] = useState("");
    const [toList, setToList] = useState([
       
        {
            type: "delivered",
            toType: "user",
            header: "Your order has delivered",
            toName: "Alex",
            toMail: "kotarigowrish@gmail.com",
            bodyContent:user_orderDelivered("1231"),
            buttonContent: "Let’s Get Started",
            redirectLink:""
        },
    ]);

    const sendMailHanlder = () => {
        axios
            .post("/api/emailTemplate", toList)
            .then((data) => {
                console.log(data.data.body[0].html);
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
