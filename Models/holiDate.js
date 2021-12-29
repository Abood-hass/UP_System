const mongoose = require('mongoose');
var ObjectId = mongoose.ObjectId;
const schema = mongoose.Schema;
const dbConfig = require("../dbModule");
mongoose.connect(dbConfig.url);
const currentStatus = ["inHoliday", "inWork"];
const request = ["pendding", "accepted", "rejected"];

const holiDate = new schema({

    _id:{type:ObjectId,required: true},

    holidayFrom:{
        type: Date,
        validate: {
            validator: function (v) {
              return (
                v && // check that there is a date object
                v.getTime() > Date.now()
              );
            },
            message:
              "holiday From out of the range",
          }
    },
    
    holidayTo:{
        type: Date,
        validate: {
            validator: function (v) {
              return (
                v && // check that there is a date object
                v.getTime() > Date.now()
              );
            },
            message:
              "holiday From out of the range",
          }
    },
    holidayDisc:{
      holiTitle:String,
      holiBody:String,
    },
    countOfHolidays:Number,
    requestStatus:{ type: String, enum: request,required: true }
})


module.exports = mongoose.model('holiDate', holiDate);