const { ERROR } = require("sqlite3");
const sequelize = require("../connection");
const express = require('express');
const router = express();

const Event = sequelize.models.Event;

//create an event 

router.post('/events', async (req,res) => {
    try{
        const { name , date, organizerId, description } = req.body;
        const newEvent = await Event.create({ name, date, organizerId, description});
        res.status(201).json(newEvent);
        
    }catch(error) {
        console.log("Error while creating event : ", error);
        res.status(500).json({error : "Error creating event "});
    }
});


//get all the events : 
router.get('/events', async(req, res) => {
    try{
        const events = await Event.findAll();
        if(!events) return res.status(404).json({message: "Opps ! there is no event at the moment. "});
        res.status(200).json(events);
    }catch(error){
        console.log("Error while getting events : ", error);
        res.status(500).json({error : "Error fetching events:"});
    }
   
});

// get and specific event by ID:
router.get('/events/:eventId', async (req, res) => {
    try{
        const { eventId } = req.params;
        const event = await Event.findByPk(eventId);
    
        if(!event) return res.status(404).json({error : "Event not found "});
        res.status(200).json(event);
    }catch(error) {
        console.log("Error while fetching event by ID : ", error);
        res.status(500).json({error : "Error while fetching event by Id"});
    }
});

module.exports = router;