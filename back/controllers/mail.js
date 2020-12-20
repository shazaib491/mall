const nodemailer = require("nodemailer");
const createError = require('http-errors')

module.exports = { 
    registrationOTP:async (req, res, next) => {
        try {
            const email = req.body.email;
            if(!req.body.email){
                throw  createError.BadRequest()
            }
            function generateOTP() {
                var digits = "0123456789";
                let OTP = "";
                for (let i = 0; i < 6; i++) {
                  OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
              }
              const OTP = generateOTP();

              let transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                  user: "snakesnake575@gmail.com",
                  pass: "1010101010As",
                },
              });
        
              const output = `<p> This is your otp ${OTP}`;
        
              let mailOptions = {
                from: "snakesnake575@gmail.com",
                to: email,
                subject: "OTP",
                html: output,
              };
        
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  res.json({
                    success: false,
                    msg: "Something went wrong",
                    error: error.message,
                  });
                } else {
                  res.send({
                    success: true,
                    OTP: OTP,
                    msg: "Enter the OTP",
                  });
                }
              });
        } catch (error) {
            if (error.isJoi == true) {
                error.status = 422;
            }
            next(error)
        }
    }

}