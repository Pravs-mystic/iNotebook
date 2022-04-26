const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');



const JWT_SECRET = "HARRY$123";
//Route:1 Creating a User
router.post      ('/createuser', [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({ min: 8 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry!user with same email already exists" });
        }

        // Adding Salt to the user given password - for additional security
        const salt =  await bcrypt.genSalt(10);
        const secpassword =  await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpassword
        })

        const data = {
            user:{
                id:user.id
            }
        }
       
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});
        
    } catch (err) {
        console.error(err.message)
        success = false;
        res.status(500).json({ success, "Internal Server Error": err});
    }
})

//Route:2 Authenticating a User
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    // returning bad requests and errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json(success,'Please provide valid credentials');
        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if(!passwordcompare){
            return res.status(400).json(success ,'Please provide valid credentials');
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken})
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Internal Server Error");
    }
})     

    //Route:3 Get logged in User details using POST: 'api/auth/getuser'. Login is required
router.post('/getuser', fetchUser,async (req, res) => {

        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password');
            res.send(user);
        } catch (err) {
            console.error(err.message)
            res.status(500).json("Internal Server Error"); 
        }

})

module.exports = router;
