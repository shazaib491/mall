const express = require("express");
const router = new express.Router();

const {
  register,
  logIn,
} = require("../controllers/authController");
const { registrationOTP } = require("../controllers/mail");

const {order,verify} = require("../controllers/payment");

router.get("/", (req, res, next) => {
  console.log(req.headers["authorization"]);
  res.send("routing works");
});



router.post("/register", register);

router.post("/log-in", logIn);

router.post("/VerificationOfEmail", registrationOTP);

router.post("/orderPayment", order);

router.post("/verifyPayment", verify)

module.exports = router;
