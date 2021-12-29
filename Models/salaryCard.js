// const { Double } = require('mongodb');
const mongoose = require('mongoose');
var ObjectId = mongoose.ObjectId;
const schema = mongoose.Schema;
const dbConfig = require("../dbModule");
mongoose.connect(dbConfig.url);

let type = ["ca","ft"]; 

const salaryCard = new schema({
    _id:{type:ObjectId,required: true},
    dateOfPay:{type:Date,required: true},
    contOfWorkDays:{type:Number,required: true},
    contOfHolidays:{type:Number,required: true},
    payPrice:{type:Number,required: true},
    hourWork:{type:Number},
    taxPercentage:{type:Number},
    typeOfEmp:{ type: String, enum: type,required: true},
    netSalary:{type:Number}
});

module.exports  = mongoose.model('salaryCard', salaryCard);