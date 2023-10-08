const express = require('express');
const morgan = require('morgan');


const  {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

const PORT = 3005;


app.use(morgan('combined')); // for logging 

app.use('/bookingservice', createProxyMiddleware({ target: 'http://localhost:6005/'}));

app.get('/home', function (req,res){
    return res.json({
        message : "Ok"
    });
})

app.listen(PORT, function (){
    console.log(`Server started at port ${PORT}`);
})