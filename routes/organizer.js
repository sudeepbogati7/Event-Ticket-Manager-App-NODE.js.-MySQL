const express = require('express');
const sequelize = require('../config/connection');
const router = express.Router();

const Organizer = sequelize.models.Organizer;

router.post("/organizers/create", async (req, res) => {
    try{
        const { name, email } = req.body;
         
        const organizer = Organizer.findOne({ email });
        if(organizer) return res.status(403).json({error : "Organizer already exists !"});
        const newOrganizer = await Organizer.creaet({
            name,
            email
        });
        res.status(201).json({ success : true , organizer : newOrganizer, message : "Organizer created successsfully "});        
    }
    catch(error){
        console.log("Error while creating organizer : ", error);
        res.status(500).json("Error creating organzer : ", error);
    }
});


// Get the list of organizers
router.get('/organizers', async (req, res) => {
    try {
      // Fetch all organizers
      const organizers = await Organizer.findAll();
      if(!organizers) return res.status(404).json({sucess : false, error : "Opps ! couldn't find any organizers at the moment . "});
      res.status(200).json({ success: true, organizers });
    } catch (error) {
      console.error('Error fetching organizers:', error);
      res.status(500).json({ success: false, error: 'Error fetching organizers' });
    }
  });
  
module.exports = router; 