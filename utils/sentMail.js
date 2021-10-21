const config = require("../config/default");

const { SENDGRID_API_KEY, FROM_MAIL } = config.SENDGRID;
const { NODE_ENV } = config.SERVER;

const website_name = "Eventogenic";
const website_link =
  "https://github.com/jsdcommunity/build_Together_college-Event-Management-System_BackEnd";

/**
 * Send mail to email
 * @param {Object} data - email, userName, URL, type
 * @returns {Boolean}
 */
const sendMail = ({ email, userName, URL, type }) => {
  return new Promise((resolve, reject) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(SENDGRID_API_KEY);

    const dynamicData = {
      title: type === "Reset" ? "Reset your Password" : "Verify your Account",
      sub: type === "Reset" ? "Reset Password" : "Verify Account",
      desc:
        type === "Reset"
          ? "Reset your password for your Eventogenic account"
          : "Please verify your email for your Eventogenic account",
      button_name: type === "Reset" ? "Reset Password" : "Verify Account",
      button_link: URL,
      website_name,
      website_link,
    };

    if (NODE_ENV === "development") {
      console.log(URL);
    }
    const msg = {
      from: {
        email: FROM_MAIL,
        name: "Eventogenic",
      },
      template_id: "d-86a3206b63814288b92c9b2eb073ce7a",
      personalizations: [
        {
          to: [
            {
              email,
              name: userName,
            },
          ],
          dynamic_template_data: dynamicData,
        },
      ],
    };

    sgMail
      .send(msg)
      .then((res) => {
        resolve(true);
      })
      .catch((error) => {
        reject({ message: error.message, code : error.code });
      });
  });
};

module.exports = sendMail;
