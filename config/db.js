const mongoose =require('mongoose');
require("dotenv").config()

const AirTicketBookingConnection = mongoose.connect(process.env.AirTicketBookingMongoURL);

module.exports={
    AirTicketBookingConnection
}