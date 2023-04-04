import axios from "axios";
export const sentMail = (toList) => {
 console.log('sendingmail')
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
