// const { Double } = require('mongodb');
const mongoose = require('mongoose');
var ObjectId = mongoose.ObjectId;
const schema = mongoose.Schema;
const dbConfig = require("../dbModule");
mongoose.connect(dbConfig.url);
let nowDate = new Date(); 
let DateYear = nowDate.getYear(),
DateMonth = nowDate.getMonth();


let type = ["ca","ft"]; 

const salaryCard = new schema({
    _id:{type:ObjectId},
    dateOfPay:{type:Date,default:new Date(DateYear, DateMonth, 1)},
    contOfWorkDays:{type:Number,required: true},
    contOfHolidays:{type:Number,default: 0},
    payPrice:{type:Number,required: true},
    hourWork:{type:Number},
    taxPercentage:{type:Number},
    typeOfEmp:{ type: String, enum: type,required: true},
    netSalary:{type:Number},
    sumOfSalary:{type:Number, default: 0}
});

module.exports  = mongoose.model('salaryCard', salaryCard);