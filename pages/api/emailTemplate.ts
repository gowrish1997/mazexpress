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
      <mj-text padding="0" letter-spacing="0.2px" font-style="normal" font-family= "manRope" />
      <mj-button   letter-spacing="0.2px" font-style="normal" font-family= "manRope" color="#FFFFFF" padding="10px" />
      <mj-class name="content_text" color="#384860" font-size="16px" line-height="24px" mjml-margin="20px" />
      <mj-class name="footer_text" color="#202B3C" font-size="16px" line-height="24px" mjml-margin="20px" />
      
    </mj-attributes>
    <mj-style>
.header td {
  padding-top:0px !important;
  padding-left:0px !important;
  padding-right:0px !important;
  padding-bottom:20px !important;
}


</mj-style>

   
  </mj-head>
    <mj-body > 
  

   
    <mj-section background-color="#F8FDFF" padding="30px"  >
    <mj-section css-class="header">
<mj-column >
<mj-image align="left" width="158px" height="44px" src='/email_logo.png'></mj-image>
</mj-column>

</mj-section>
<mj-section background-color="#FFFFFF" padding="10px"  >
<mj-column>


<mj-text  align="left" color="#121A26" font-size="20px" line-height="30px"  >
Welcome to Maz Express
</mj-text>


<mj-text  align="left" mj-class="content_text" padding-top="20px" >
Hi alex,
</mj-text>
<mj-text  align="left" mj-class="content_text" padding-top="20px">
We’re excited to welcome you to Untitled and we’re even more excited about what we’ve got planned. You’re already on your way get your products delivered.
</mj-text>
<mj-text  align="left" mj-class="content_text" padding-top="20px">
Thanks
</mj-text>
<mj-text  align="left" mj-class="content_text">
Maz team
</mj-text>



<mj-button  padding-left="0px" padding-bittom="0px" padding-left="0px" align="left font-family="manRope" background-color="#35C6F4" >Click me</mj-button>

</mj-column>
</mj-section>


<mj-section>
<mj-column>



<mj-text  align="left" mj-class="footer_text">
<mj-if condition="${false}">
Questions or faq? Contact us at faq@mazexpress.com. If you'd rather not receive this kind of email, Don’t want any more emails from Maz? Unsubscribe.
<mj-else>
g
</mj-else>
</mj-if>
</mj-text>


<mj-text  align="left" mj-class="footer_text" padding-top="20px">


100 Smith Street, Melbourne VIC 3000
© 2022 Mazexpress
</mj-text>



</mj-column>
</mj-section>
<mj-section>
<mj-column>
  <mj-social font-size="15px" icon-size="30px" mode="horizontal">
    <mj-social-element name="facebook" href="https://mjml.io/">
    
    </mj-social-element>
    <mj-social-element name="instagram" href="https://mjml.io/">
    
    </mj-social-element>
    <mj-social-element  name="twitter" href="https://mjml.io/">
   
    </mj-social-element>
  </mj-social>
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
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
