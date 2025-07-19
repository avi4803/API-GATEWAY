const express = require('express');
const rateLimit = require('express-rate-limit');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { message } = require('./utils/common/error-response');
const {createProxyMiddleware} = require('http-proxy-middleware')



const app = express();
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,      ///every 2 minutes
    max: 20,
    message: 'Too many request, try again after some time'                        /// max request is 3
})  



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(limiter)

app.use('/api', apiRoutes);

app.use('/flightService', createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin:true
}));

app.use('/bookingService', createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin:true
}))

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
