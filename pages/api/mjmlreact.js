// import type { NextApiRequest, NextApiResponse } from "next";
import mjml2html from "mjml";
import nodemailer from "nodemailer";
const { MJMLRenderer } = require('mjml-react');

// type Data = {
//     name: string;
// };
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7c17d8572d05a4",
        pass: "b010674af9d540",
    },
});


  
import {
    render,
    Mjml,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
  } from 'mjml-react';
  const { html, errors } = render(
    <Mjml>
      <MjmlBody width="500">
        <MjmlSection backgroundColor="#EFEFEF">
          <MjmlColumn>
            <MjmlText fontSize="20px">Hello world!</MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    { validationLevel: 'soft' }
  );

const mailData =
    // [
    {
        from: "test@example.com",
        to: "teste@xample.com",
        subject: `New Message from maz express team`,
        // text: `your odder  `,
        // html: `<p>${mailBody()}</p>`,
    };
//     {
//         from: "test@example.com",
//         to: "kotarigowrish@gamil.com",
//         subject: `New feedback from maz express`,
//         // text: `gowrrisn testing `,
//         html: `<p>${mailBody("gowrisn", "24", "nagappa", "shwwlavathi")}</p>`,
//     },
// ];

export default function handler(req, res) {
    res.status(200).json({ body: html });

    // try {
    //     const invalidEmails = [];
    //     for (let i = 0; i < mailData.length; i++) {
    //         const { accepted, rejected } = await transporter.verify(mailData[i].to);
    //         if (rejected.length > 0) {
    //             invalidEmails.push(mailData[i].to);
    //         }
    //     }

    //     if (invalidEmails.length === 0) {
    //         const promises = mailData.map((email) => {
    //             return transporter.sendMail(email);
    //         });

    //         const results = await Promise.all(promises);
    //         console.log(results);
    //         results.forEach((result) => console.log("Email sent: " + result.response));
    //         res.status(200).json({ message: "Email sent successfully" });
    //     } else {
    //         res.status(400).json({ message: "Invalid email address(es) detected", invalidEmails });
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: "Error sending email" });
    // }

    //another method

    // transporter.sendMail(mailData, (error, info) => {
    //     if (error) console.log(error);
    //     console.log(`Message sent: ${info.accepted}`);
    // });
}