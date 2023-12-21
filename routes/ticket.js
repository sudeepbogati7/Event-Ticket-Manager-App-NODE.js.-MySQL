const { Ticket }  = require('../models/ticket');
console.log(Ticket);
const express = require('express');
const router = express.Router();

// create a new ticket , 
router.post('/tickets/create', async(req, res) => {
    try{
        const { eventId, price} = req.body;

        const newTicket = await Ticket.create({
            eventId,
            price,
        });
    
        res.status(201).json({ success: true, ticket : newTicket, message : "Successfully create a new ticket. "});
    }
    catch(error) {
        console.error("Error creating ticket: ", error);
        res.status(500).json({success: false, error : 'Error creating ticket. '});
    }
});


// get the available tickets of an specific event
router.get('/tickets/:eventId', async (req, res) => {
    try{
        const { eventId } = req.body;

        //fetch the available tickets for the specific event
        const availableTickets = await Ticket.findAll({
            where : {
                eventId, 
            },
        });
        res.status(200).json({ success : true, tickets: availableTickets });        
    }
    catch(error ){
        console.error("Error while fetching available tickets : ", error);
        res.status(500).json({ success : false, error :  "Error fetching available tickets."});
    }
}); 


// purchase ticket, (whenever a user purchase a ticket , the ticketNumber is increased by 1 )

router.post('tickets/purchase', async (req, res) => {
    try{
        const {  userId  } = req.body;
        const latestTicket = await Ticket.findOne({
            where : {
                userId,
            },
            order : [['ticketNumber', 'DESC']],
        });
    
        // calculate the next ticket number 
        const nextTicketNumber = (latestTicket ? latestTicket.ticketNumber : 0) +1;
    
        //create a new ticket with the calculated ticket number 
        const newTicket = await Ticket.create({
            price : 199.99,
            eventId : req.body.eventId,
            ticketNumber : nextTicketNumber,
            userId,
        });
    
        res.send(200).json({ success : true, message: "Ticket purchased successfully ", ticket: newTicket });
                
    }
    catch(error) {
        console.error("Error while purchasing ticket : ", error);
        res.status(500).json({ success : false, error : "Error while processing ticket purchase" });
    }
});

module.exports = router; 
