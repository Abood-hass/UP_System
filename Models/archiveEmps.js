const mongoose = require('mongoose');
const schema = mongoose.Schema;
const dbConfig = require("../dbModule");
mongoose.connect(dbConfig.url);


const archiveEmps = new schema({
    acad_ID:Number
    // {
        // typy: {typy: Number},
        // index: true,
        // unique: true,
        // min : 10,
        // max : 10
    // }
    ,
    
    Fname:String
    // {
    //     typy: {typy: String},
    //     // reg: "/^[a-zA-Z ,.'-]+$/u",
    //     // required: true,
    //     // minLength : 40,
    //     // maxLength : 40
    // }
    ,
    
    Lname:String
    ,
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
              "dob out of the range",
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
              "dob out of the range",
          }
    },

}, { minimize: false })

module.exports = mongoose.model('archiveEmps', archiveEmps);