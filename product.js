const mongoose = require("mongoose");
const product = mongoose.Schema({
       name:{
              type:String,
              required:true
       },
       description:{
              type:String,
              required:true
       },
       richDescription:{
              type:String,
              default:''
       },
       images:[{
              type:String
       }],
       brand:{
              type:String,
              default:''
       },
       price:{
              type:Number,
              default:0
       },
       category:{
              
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
       },
       stock:{
              type:Number,
              required:true,
              min:0,
              max:220
       },
       rating:{
              type:Number,
              required:true
       },
       NumReviews:{
              type:Number,
              default:0
       },
       isFeatured:{
              type:Boolean,
              default:false
       },
       dateCreated:{
              type:Date,
              default:Date.now
       }
})
const Product = mongoose.model("Products",product)
module.exports = {Product};