const express = require('express');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3000;

const app = express();




const limiter = rateLimit({
    windowMs: 24 * 60  * 60 * 1000, // 24  hours
    max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message:"Urinishlar soni juda ko'p! Iltimos keyinroq urinib ko'ring",
    statusCode: 429,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//limiter
app.use(limiter);
app.set('trust proxy' , 1);

//cors
app.use(cors(corsOptions))
//express
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/' , (req,res)=>{
    res.send("Hello world")
})

app.use('/v1/api' , require('./routes/postEmailRoute'));

app.listen(PORT , ()=>console.log(`listening on port ${PORT}`))