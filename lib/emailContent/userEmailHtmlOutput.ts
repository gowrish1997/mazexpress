import mjml2html from "mjml";
import fetchJson from "../fetchServer";
{
  /**
image handler can be used to control the image based to emailType wheterh it is register confirmed or delivered or dispatched according to that we can send image url
*/
}
const imageHanlder = (type: string, api?: string) => {
  let api_point = "";
  switch (type) {
    case "email_logo":
      api_point = "/public/assets/maz_logo.png";
      break;

    case "register":
      api_point = "/public/assets/register.png";
      break;

    case "ordered":
      api_point = "/public/assets/order-placed.png";
      break;

    case "dispatched":
      api_point = "/public/assets//out-for-delivery.png";
      break;
    case "delivered":
      api_point = "/public/assets/delivered.png";
      break;
    case "bill_update":
      api_point = `/bill/${api}`;
      break;
  }

  return "https://api.mazexpress.com.ly" + api_point;
};
export const userMailBody = (
  type: string,
  header: string,
  toName: string,
  bodyContent: string[],
  button: string,
  linkToRedirect: string
) => {
  const userHtmlOutput = mjml2html(`
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
    <mj-image align="left" width="158px" height="44px" src=${imageHanlder(
      "email_logo"
    )}></mj-image>
    </mj-column>


    </mj-section>
    <mj-section background-color="#FFFFFF" padding="10px"  >
    <mj-column>

    ${
      (type == "register" ||
        type == "ordered" ||
        type == "dispatched" ||
        type == "delivered") &&
      `<mj-image align="left" width="433px" height="282px" src=${imageHanlder(
        type
      )}></mj-image>`
    }

    <mj-text  align="left" color="#121A26" font-size="20px" line-height="30px"  >
    ${header}
    </mj-text>

    <mj-text  align="left" mj-class="content_text" padding-top="20px" >
    Hi ${toName} 👋,
    </mj-text>

    ${
      type == "bill_update" &&
      `<mj-image align="left" width="433px" height="282px" src=${imageHanlder(
        "bill_update",
        linkToRedirect
      )}></mj-image>`
    }
    ${bodyContent.map((data) => {
      return `<mj-text  align="left" mj-class="content_text" padding-top="20px">
    ${data}
    </mj-text>`;
    })}
    ${
      (type == "register" ||
        type == "password_changed" ||
        type == "forgot_password") &&
      `  <mj-button href=${linkToRedirect}  padding-left="0px" padding-bittom="0px" padding-left="0px" align="left font-family="manRope" background-color="#35C6F4" >${button}</mj-button>`
    }

    <mj-text  align="left" mj-class="content_text" padding-top="20px">
    Thanks
    </mj-text>
    
    <mj-text  align="left" mj-class="content_text">
    Maz team
    </mj-text>
    </mj-column>
    </mj-section>


    <mj-section>
    <mj-column>
    <mj-text  align="left" mj-class="footer_text">
    Questions or faq? Contact us at faq@mazexpress.com. If you'd rather not receive this kind of email, Don’t want any more emails from Maz? Unsubscribe.
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
  return userHtmlOutput.html;
};
