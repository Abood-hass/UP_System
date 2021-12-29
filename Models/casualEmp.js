const { Double } = require('mongodb');
const mongoose = require('mongoose');
const schema = mongoose.schema;
const dbUrl = process.env.dbConnection ;
await mongoose.connect(dbUrl);


const casualEmp = new schema({
    empIdCard:{type:String,required: true},
    dateOfPay:{type:Date,required: true},
    contOfWorkDays:{type:Number,required: true},
    contOfHolidays:{type:Number,required: true},
    dayPrice:{type:Double,required: true},
    netSalary:{type:Double,required: true},
});

exports = mongoose.model('casualEmp', casualEmp);