const mongoose = require('mongoose');
const schema = mongoose.schema;
const dbUrl = process.env.dbConnection ;
await mongoose.connect(dbUrl);

const bankEmpInfo = new schema({

})

exports = mongoose.model('bankEmpInfo', bankEmpInfo);