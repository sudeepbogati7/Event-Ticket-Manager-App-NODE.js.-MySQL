const sequelize = require('../config/connection');
const Ticket = sequelize.models.Ticket;
const Event = sequelize.models.Event;
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation');


// create a new ticket , 
router.post('/tickets/create',validate.validateTicket, async (req, res) => {
    
    try{
        const transaction =  await sequelize.transaction();
        const { eventId, price} = req.body;

        const newTicket = await Ticket.create({
            eventId,
            price,
        }, { transaction });
        
        await transaction.commit();
        res.status(201).json({ success: true, ticket : newTicket, message : "Successfully create a new ticket. "});
    }
    catch(error) {

        await transaction.rollback();
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

router.post('/tickets/purchase', async (req, res) => {
    try {
        const { userId, eventId } = req.body;
    
        // Find the event
        const event = await Event.findByPk(eventId);
    
        if (!event) {
          return res.status(404).json({ success: false, error: 'Event not found' });
        }
    
        // Calculate the next ticket number
        const latestTicket = await Ticket.findOne({
          where: {
            eventId,
          },
          order: [['ticketNumber', 'DESC']],
        });
    
        const nextTicketNumber = (latestTicket ? latestTicket.ticketNumber : 0) + 1;
    
        // Create a new ticket with the calculated ticket number and associate it with the user
        const newTicket = await Ticket.create({
          price: 199.99, // Set the price as needed
          eventId,
          ticketNumber: nextTicketNumber,
        });
    
        // Associate the ticket with the user
        // NOTE: If you have an association between User and Ticket, you can add it here
    
        res.status(201).json({ success: true, message: 'Ticket purchased successfully', ticket: newTicket });
      } catch (error) {
        console.error('Error while purchasing ticket:', error);
        res.status(500).json({ success: false, error: 'Error processing ticket purchase' });
    }
});

module.exports = router; 
