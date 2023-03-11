import type { NextApiRequest, NextApiResponse } from "next";
import mjml2html from "mjml";
import nodemailer from "nodemailer";
type Data = {
    name: string;
};
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7c17d8572d05a4",
        pass: "b010674af9d540",
    },
});

// const mailBody = () => {
const htmlOutput = mjml2html(`
    <mjml>
    <mj-head>
    <mj-attributes>
      <mj-text padding="0" letter-spacing="0.2px" font-style="normal" />
    
    </mj-attributes>
    <mj-style>
    td {
      padding:0px !important;
    }
  </mj-style>
  </mj-head>
    <mj-body > 
  

   
    <mj-section background-color="#F8FDFF" padding="30px" >

<mj-section justify="space-between" >


<mj-column  >
<mj-image align="left" width="100px" src="http://191n.mj.am/img/191n/3s/x0l.png"></mj-image>

</mj-column>
<mj-column>

<mj-section justify="space-between" >
<mj-group>
<mj-column  >
<mj-image  src="http://191n.mj.am/img/191n/3s/x0l.png"></mj-image>

</mj-column>
<mj-column  >
<mj-image  src="http://191n.mj.am/img/191n/3s/x0l.png"></mj-image>

</mj-column>
<mj-column  >
<mj-image  src="http://191n.mj.am/img/191n/3s/x0l.png"></mj-image>

</mj-column>
</mj-group>
</mj-section>



</mj-column>


</mj-section>

</mj-section>
  </mj-body>
    </mjml>
  `);
//     return htmlOutput.html;
// };

const mailData =
    // [
    {
        from: "test@example.com",
        to: "teste@xample.com",
        subject: `New feedback from maz express`,
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

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ body: htmlOutput });

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
