const express = require('express');
const {flightModel} = require("../models/flight.model");
const flightRouter = express.Router();

flightRouter.use(express.json());

flightRouter.get("/flights", async (req, res) => {
    const query = req.query;
    try {
       const flights_find = await flightModel.find(query);
       res.send(flights_find);
    }
    catch (err) {
      console.log("Something went wrong to searching of flights");
      console.log(err);
    }
});


flightRouter.get("/flights/:id", async (req, res) => {
    const ID = req.params.id;
    try {
       const flight = await flightModel.find(ID);
       res.send(flight);
    }
    catch (err) {
      console.log("Something went wrong to searching of flight");
      console.log(err);
    }
});


flightRouter.post("/flights", async (req, res) => {
    const payload = req.body;
    try {
       const add_new_flight = new flightModel(payload);
       await add_new_flight.save();
       res.send(add_new_flight);
    }
    catch (err) {
        console.log("Something went wrong to adding of flight");
        console.log(err);
    }
})

flightRouter.patch("/flights/:id", async (req, res) => {
    const payload = req.body;
    const ID = req.params.id;
    const flight = await flightModel.findOne({_id: ID});
    try {
        if(!flight) {
            res.send("Flight not found in database");
        } else {
            const updated_flight = await flightModel.findByIdAndUpdate({ _id: ID}, payload);
            console.log(updated_flight);
            res.send("Flight is updated successfully");
        }
       
    }
    catch (err) {
        console.log("Something went wrong updating of flight details");
        console.log(err);
    }
});


flightRouter.delete("/flights/:id", async (req, res) => {
    const ID = req.params.id;
    const flight = await flightModel.findOne({_id: ID});
    try {
        if(!flight) {
            res.send("Flight not found in database");
        } else {
            const deleted_flight = await flightModel.findByIdAndDelete({_id:ID});
            res.send("Flight is deleted successfully");
        }
       
    }
    catch (err) {
        console.log("Something went wrong deleting of flight details");
        console.log(err);
    }
})

module.exports={
    flightRouter 
}

