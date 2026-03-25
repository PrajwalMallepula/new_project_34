const express = require("express");
const Router = express.Router();
const { Category } = require("../Models/category");
Router.get("/",async (req,res)=>{
       const category = await Category.find();
       if(!category){
              res.send(500).json(sucess=false)
       }
       
       res.send(category);

})
Router.post("/",async (req,res)=>{
       const newCategory = new Category({
              name:req.body.name,
              icon:req.body.icon,
              color:req.body.color
       })
       const saved = await newCategory.save();
       if(!saved){
              return res.status(404).send("No category is available");
       }
       res.send(saved);
})
Router.get("/:id",async (req,res)=>{
       const category = await Category.findById(req.params.id);
       if(!category){
              res.status(500).send({category:"category not found"});
       }
              res.status(200).send(category);
})
Router.put("/:id",async (req,res)=>{
       const putCategory = await Category.findByIdAndUpdate(req.params.id,{
              name:req.body.name,
              icon:req.body.icon,
              color:req.body.icon
       },{new:true})
       res.status(200).json(putCategory);
})
Router.delete("/:id",(req,res)=>{
    Category.findByIdAndDelete(req.params.id).then(category=>{
       if(category){
              return res.status(200).json({sucess:true,message:"Category found"})
       }
       else{
              return res.status(404).json({sucess:false,message:"category not found"})
       }
    }).catch(err=>{
       return res.status(400).json({sucess:false,error:err});
    })
})

module.exports = Router;