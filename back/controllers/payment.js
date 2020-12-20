var Razorpay = require("razorpay");


let instance = new Razorpay({
    key_id: 'rzp_test_LwbzGwkSx0IhlS', // your `KEY_ID`
    key_secret: 'eLqC0YBKhC9zln4PMKURLXc9' // your `KEY_SECRET`
})


module.exports = {
    order: async (req, res, next) => {
        params = req.body;
        try {
            const data = await instance.orders.create(params);
            res.send({ "sub": data, "status": "success" });
        } catch (e) {
            res.send({ "sub": e, "status": "failed" });
        }
    },
    verify: async (req, res, next) => {
        body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
        var crypto = require("crypto");
        var expectedSignature = crypto.createHmac('sha256', 'eLqC0YBKhC9zln4PMKURLXc9')
            .update(body.toString())
            .digest('hex');
        // save krana he 
        console.log(req.body);
        // save krana he
        var response = { "status": "failure" }
        if (expectedSignature === req.body.razorpay_signature)
            response = { "status": "success" }
        res.send(response);
    }
}


