const { json } = require("body-parser");
const { ServerMonitoringMode } = require("mongodb");
const mongoose = require("mongoose");
const { User } = require("parse");
const userSchema = mongoose.Schema({
       name:{
              type:String,
              required:true
       },
       email:{
              type:String,
              required:true

       },
       passwordHash:{
              type:String,
              default:''

       },
       phone:{
              type:Number,
              required:true
       },
       street:{
              type:String,
              default:""
       },
       city:{
              type:String,
              default:""
       },
       state:{
              type:String,
              default:""
       },
       pincode:{
              type:String,
              default:""
       },
       isAdmin:{
              type:Boolean,
              default:false
       }

})
userSchema.virtual('id').get(function(){
       return this._id.toHexString();
})
userSchema.set('toJSON',{virtuals:true});
const Usersdata = mongoose.model("Userdata",userSchema);
module.exports = {Usersdata}