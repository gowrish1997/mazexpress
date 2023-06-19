import mjml2html from "mjml";
const imageHanlder = (type: string, api?: string) => {
    return "https://api.mazexpress.com.ly/public/assets/maz_logo.png";
};
export const adminMailBody = (
    header: string,
    toName: string,
    bodyContent: string[],
    userName: string,
    userProfile: string,
    userContactNumber: string,
    userEmail: string
) => {
    const adminHtmlOutput = mjml2html(`
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
  .image td {
    padding:0px !important;
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
  <mj-text  align="left" color="#121A26" font-size="20px" line-height="30px"  >
  ${header}
  </mj-text>
  <mj-text  align="left" mj-class="content_text" padding-top="20px" >
  Hi ${toName},
  </mj-text>
  ${bodyContent.map((data) => {
      return `<mj-text  align="left" mj-class="content_text" padding-top="20px">
  ${data}
  </mj-text>`;
  })}
  <mj-text  align="left" mj-class="footer_text" padding-top="5px">
</mj-text>
  <mj-image align="left" width="80px" height="80px" src=""  border-radius="50%"></mj-image> 
  <mj-text  align="left" mj-class="footer_text" padding-top="5px">
  ${userName}
  </mj-text>
  <mj-text  align="left" mj-class="footer_text" padding-top="5px">
${userEmail}
  </mj-text>
  <mj-text  align="left" mj-class="footer_text" padding-top="5px">
${userContactNumber}
  </mj-text>
  </mj-column>
  </mj-section>

  </mj-column>
  </mj-section>
  </mj-section>
    </mj-body>
      </mjml>
    `);
    return adminHtmlOutput.html;
};
