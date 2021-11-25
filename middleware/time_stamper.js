const clock = require('moment');

// log date middleware
const time_stamper = (req,res,next) => {
    console.log(`${req.method} request to ${req.originalUrl}: on ${clock().format()}`);
    next();
};

module.exports = time_stamper;