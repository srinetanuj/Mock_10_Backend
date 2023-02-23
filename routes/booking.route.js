const express = require('express');
const bookingRouter = express.Router();
const {bookingModel} = require("../models/booking.model");


bookingRouter.post("/booking",async(req,res)=>{
    const payload = req.body;

    try{
       const bookingFlight = new bookingModel(payload);
       await bookingFlight.save();
       res.send(bookingFlight);
    }catch(err){
        console.log(err)
    }
});

bookingRouter.get("/dashboard", async (req, res) => {
    try{
        const bookingFlight = await bookingModel.find().populate(["user", "flight"]);
        res.send("Flight is booked successfully");
        // res.send({"bookedFlight": bookingFlight})
    }catch(err){
        console.log(err);
    }
})

module.exports ={
    bookingRouter
}