const mongoose = require('mongoose');
var ObjectId = mongoose.ObjectId;
const schema = mongoose.Schema;
const dbConfig = require("../dbModule");
mongoose.connect(dbConfig.url);

const admin =  new schema({
    admin_ID: {type:Number,required: true, unique: true,
        validate: {
            validator: function (v) {
              return (
                v && // check that there is a date object
                v.toString().length === 10
              );
            },
            message:
              "error.admin_ID.wrong.insertion",
          }
        }
    ,
    password: {type:String, required: true, unique: true,
        validate: {
            validator: function (v) {
              return (
                v && // check that there is a date object
                v.toString().length < 30 &&
                v.toString().length > 15 
              );
            },
            message:
              "error.password.wrong.insertion",
          }}
    ,
    email: {type:String, required: true}    
    ,
    jobTitle: {type:String, required: true}    
    ,
    
    address: {type:String, required: true ,
      validate: {
        validator: function (v) {
          return (
            v && // check that there is a date object
            v.toString().length > 20 
          );
        },
        message:
          "error.address.wrong.insertion",
      }
    }  
    
    ,
    phoneNumber_1: {type:Number, required: true,
      validate: {
        validator: function (v) {
          return (
            v && // check that there is a date object
            v.toString().length > 10 
          );
        },
        message:
          "error.phoneNumber.wrong.range",
      }
    }   
    
    ,

    phoneNumber_2: {type:Number, required: false,
      validate: {
        validator: function (v) {
          return (
            v && // check that there is a date object
            v.toString().length > 10 
          );
        },
        message:
          "error.phoneNumber.wrong.range",
      }
    }   
    ,
    Fname: {type:String,required: true}

    ,
    
    Lname: {type:String,required: true}

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
    typeOfEmp:{ type: String, enum: type,required: true },
    empTypeID: {type:ObjectId,required: true},
  //   {
  //     type: mongoose.Schema.Types.ObjectId, 
  //     ref: 'salaryCard'
  // },

}, { minimize: false })


module.exports = mongoose.model("admin", admin);

