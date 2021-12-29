const mongoose = require('mongoose');
var ObjectId = mongoose.ObjectId;
const schema = mongoose.Schema;
const dbConfig = require("../dbModule");
mongoose.connect(dbConfig.url);

// let topLimitId = Math.pow(10,10);
// let buttomLimit = Math.pow(10,8);

let type = ["ca","ft"]; 

const employee = new schema({
    emp_ID: {type:Number,required: true, unique: true}
    // {
    //     typy:  Number,
    //     validate: {
    //       validator: function (v) {
    //         return (
    //           v && // check that there is a date object
    //           v > topLimitId &&
    //           v < buttomLimit
    //         );
    //       },
    //       message:
    //         "error.id.wrong.rang",
        
    //       }
    // }
    ,
    
    Fname: {type:String,required: true}
    // {
    //     typy:  String,
    //     validate: {
    //       validator: function (v) {
    //         return (
    //           v && // check that there is a date object
    //           v.length > 10 &&
    //           v.length < 2
    //         );
    //       },
    //       message:
    //         "error.fname.wrong.long",
    //       }
    // }
    ,
    
    Lname: {type:String,required: true}
    // {
    //     typy: {typy: String},
    //     validate: {
    //       validator: function (v) {
    //         return (
    //           v && // check that there is a date object
    //           v.length > 10 &&
    //           v.length < 2
    //         );
    //       },
    //       message:
    //         "error.lname.wrong.long",
    //       }
    // }
    ,

    // name: this.Fname + Lname,

    dob:{
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
              return (
                v && // check that there is a date object
                v.getTime() < Date.now()
              );
            },
            message:
              "error.dob.wrong.range",
          }
    },
    doh:{
        type: Date,
        required: true,
        default: Date.now(),
        validate: {
            validator: function (v) {
              return (
                v && // check that there is a date object
                v.getTime() < Date.now()
              );
            },
            message:
            "error.doh.wrong.range",
          }
    },
    holiDateID: {type:ObjectId,required: true},
    typeOfEmp:{ type: String, enum: type,required: true },
    empTypeID: {type:ObjectId,required: true},
  //   {
  //     type: mongoose.Schema.Types.ObjectId, 
  //     ref: 'salaryCard'
  // },

}, { minimize: false })



module.exports = mongoose.model('employee', employee);