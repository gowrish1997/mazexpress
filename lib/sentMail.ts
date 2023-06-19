import axios from "axios";
export const sentMail = (toList) => {
  axios
    .post("/api/sendgridEmail", toList)
    .then((data) => {
      // console.log(data.data.body.html);
      // setHtmlCode(data.data.body);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
