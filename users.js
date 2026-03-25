const express = require("express");
const router = express.Router();
const { Usersdata } = require("./user");
const bcrypt = require("bcrypt");
router.get("/",async (req,res)=>{
       const userList = await Usersdata.find();
       if(!userList){
              res.status(500).json({sucess:false});
       }
       res.send(userList);
})
router.post("/",async (req,res)=>{
       try{
              const newUser = new Usersdata({
                     name:req.body.name,
                     email:req.body.email,
                     passwordHash:bcrypt.hashSync(req.body.passwordHash,12),
                     phone:req.body.phone
              })
              const saveduser = await newUser.save();
              res.status(201).send(saveduser);
       }
       catch(err){
              console.log("Error is",err);
              res.status(500).json({sucess:false})
       }
})
module.exports = router;