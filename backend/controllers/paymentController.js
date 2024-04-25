const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const PayOS = require("@payos/node");
const payOS = new PayOS("54720eb6-968f-4d16-95f4-0ea700b748b1", "32de0061-8a6d-4d70-a833-da73d006c619", "6543ff99bd6ed89a309fb1fc8c0cd596ec14e406758bd4cb0e6cb6cccb96e463");

// Process stripe payments   =>   /api/v1/payment/process
exports.receiveHookPayment = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body)
      res.json({})

})
exports.createPaymentLink = catchAsyncErrors(async (req, res, next) => {
    const {orderCode,totalPrice}=req.body
    const body = {
        orderCode: orderCode,
        amount: totalPrice,
        description: "Thanh toan don hang",
        cancelUrl: 'http://localhost:3000/cart',
        returnUrl: 'http://localhost:3000'
      };
      // const paymentLinkRes = await payOS.createPaymentLink(body);
      // res.json({paymentLink: paymentLinkRes.checkoutUrl})
      res.json({name:1})
})

