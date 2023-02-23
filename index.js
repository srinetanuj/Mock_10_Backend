const express = require('express');
const {userRouter} = require("./routes/user.route");
const {flightRouter} =require("./routes/flight.route");
const {bookingRouter} = require("./routes/booking.route");
const {AirTicketBookingConnection} = require("./config/db");
require('dotenv').config();

const app = express();
app.use(express.json());


app.use("/api", userRouter);
app.use("/api", flightRouter);
app.use("/api", bookingRouter);

app.get("/",(req,res)=>{
    res.send("Welcom to Air Ticket Booking")
})

app.listen(process.env.port, async () => {
    try {
       await AirTicketBookingConnection;
       console.log(`Server is running on port ${process.env.port}`);
    }
    catch (err) {
          console.log(err);
          console.log("Some error occured while connecting to the server");
    }
    
})