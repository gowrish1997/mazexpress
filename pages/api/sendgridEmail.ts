import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

import { adminMailBody } from "@/lib/emailContent/adminEmailHtmlOutput";
import { userMailBody } from "@/lib/emailContent/userEmailHtmlOutput";
import type { NextApiRequest, NextApiResponse } from "next";

interface IBody {
  type: string;
  toType: string;
  header: string;
  toName: string;
  bodyContent: string[];
  toMail?: string;
  buttonContent?: string;
  redirectLink?: "";
  userName?: string;
  userProfile?: string;
  userContactNumber?: string;
  userEmail?: string;
  subject?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const toList=
  // res.status(200).json({ body:adminHtmlOutput.html});

  const toList = req.body.map((data: IBody) => {
    if (data.toType == "admin") {
      return {
        // from: "info@mazexpress.com.ly",
        from: {
          email: "info@mazexpress.com.ly",
          name: "Maz express",
        },
        to:
          data.type == "enquiry"
            ? "zeomohamedali@gmail.com"
            : "info@mazexpress.com.ly",
        subject: data.subject
          ? data.subject
          : `New Message from maz express team`,
        html: `<p>${adminMailBody(
          data.header,
          data.toName,
          data.bodyContent,
          data.userName!,
          data.userProfile!,
          data.userContactNumber!,
          data.userEmail!
        )}</p>`,
      };
    } else {
      return {
        from: {
          email: "info@mazexpress.com.ly",
          name: "Maz express",
        },
        to: data.toMail,
        subject: `New Message from maz express team`,
        html: `<p>${userMailBody(
          data.type,
          data.header,
          data.toName,
          data.bodyContent,
          data.buttonContent!,
          data.redirectLink!
        )}</p>`,
      };
    }
  });

  try {
    //  res.status(200).json({ body:toList});

    const invalidEmails = [];

    {
      /**
    
    this is varify function to check wheter mail is valid nr not
    */
    }
    // for (let i = 0; i < toList.length; i++) {
    //     const { accepted, rejected } = await transporter.verify(toList[i].to);
    //     if (rejected.length > 0) {
    //         invalidEmails.push(toList[i].to);
    //     }
    // }
    // if (invalidEmails.length === 0) {

    const promises = toList.map(
      (email: {
        from: string;
        to: string;
        subject: string;
        html: HTMLBodyElement;
      }) => {
        return sendgrid.send(email as any);
      }
    );
    const results = await Promise.all(promises);

    results.forEach((result) => console.log(""));
    res.status(200).json({ message: "Email sent successfully" });

    // } else {
    //   console.log('elsebloclk')
    //     res.status(400).json({ message: "Invalid email address(es) detected", invalidEmails });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
  // another method
  // transporter.sendMail(toList, (error, info) => {
  //     if (error) console.log(error);
  //     console.log(`Message sent: ${info.accepted}`);
  // });
}
