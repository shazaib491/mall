const jwt = require("jsonwebtoken");
const creteError = require("http-errors");

const ACCESS_SECRET_KEY =
  "2783ca68ccba00d235f0efd11fc6db68b8cde001c917cbd29dee70d88db34952";

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = ACCESS_SECRET_KEY;
      const options = {
        expiresIn: "86400s",
        issuer: "pickurpage.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(creteError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
};
