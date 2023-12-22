const express = require('express');
const sequelize = require('../connection');
const router = express();
const User = sequelize.models.User; //user-model 
console.log("User model from user route:", User);


// get all the users 
router.get("/users", async (req, res) => {
    try{
        const users = await User.findAll();
        if(!users) return res.status(404).json({message : "No user found !"});
        res.status(200).json(users);
    }
    catch(err) {
        console.log("Error while fetching users : ", err);
        res.status(500).json({error : "Error while fetching the users : ", err});
    }
});

//get user by ID :

router.get("/users/:userId", async(req, res) => {
    try{
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if(!user) return res.status(404).json({error : "User not found"});
        
        res.status(200).json(user);
    }
    catch(error){
        console.log("Error while fetching user by ID ", error);
        res.status(500).json({error : "Error while fetching user by ID ", error});
    }
});


//create a new user 

router.post("/users", async(req,res) => {
    try{
        const { username , email , isOrganizer } = req.body ; 

        const user = User.findOne({ email});
        if(user) return res.status(403).json({error : "Email already exists !"});

        const newUser = await User.create({ username,email,  isOrganizer});
        res.status(200).json(newUser);
    }
    catch(error ){
        console.log("Error creating user : ", error);
        res.status(500).json({error : "Error creating user :  ", error})
    }
});


module.exports = router;