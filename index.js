const express = require('express');
const morgan = require('morgan');
const { rateLimit } = require('express-rate-limit');


const  {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

const PORT = 3005;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 5, // Limit each IP to 4 requests per `window` (here, per 15 minutes)
})

app.use(morgan('combined')); // for logging 
app.use(limiter);

app.use('/bookingservice', createProxyMiddleware({ target: 'http://localhost:6005/'}));

app.get('/home', function (req,res){
    return res.json({
        message : "Ok"
    });
})

app.listen(PORT, function (){
    console.log(`Server started at port ${PORT}`);
})