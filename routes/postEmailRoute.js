const express = require('express');
const router = express.Router();
const emailjs = require('@emailjs/nodejs');
const {EmailJSResponseStatus} = require("@emailjs/nodejs");


router.post('/sendemail' , async (req,res)=>{
    const {username , phone , message } = req.body;
    if(username.length < 3 || phone.length !== 12 || message.length < 10) return res.status(500).json({success:false,errmessage:'invalid input'})
    const templateParams =  {
            from_name: username,
            to_name: "ODB CLEANING SERVICE",
            from_phone:phone,
            message: message,
        };
    try {
        await emailjs.send(
            process.env.SERVICE_ID,
            process.env.TEMPLATE_ID,
            templateParams,
            {
                publicKey: process.env.PUBLIC_KEY,
                privateKey: process.env.PRIVATE_KEY, // optional, highly recommended for security reasons
            },
        );
        res.status(200).json({success:true})
    } catch (err) {
        if (err instanceof EmailJSResponseStatus) {
            console.log('EMAILJS FAILED...', err);
            res.status(500).json({success:false})
        }
    }
})



module.exports = router;