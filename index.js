const express = require('express');
const app = express();
const dbConfig = require("./dbModule");
var router = express.Router();
const empCont = require("./Controllers/empController");
const holiCont = require("./Controllers/holidayController");

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json())

// app.use(require('dotenv').config())



const mongoose = require('mongoose');
const { payForPreMonth } = require('./Controllers/monthlyPay');
mongoose.connect(dbConfig.url).then(() => {
    console.log("Connected to the database!");
});


app.use(router.post("/createEmp",urlencodedParser,empCont.create));

app.use(router.post("/createEmpHoliday",urlencodedParser,holiCont.create));

app.use(router.get("/getEmp",urlencodedParser,empCont.getOne));

app.use(router.get("/getEmpID",urlencodedParser,empCont.getOneById));

app.use(router.get("/getEmpHoliday",urlencodedParser,holiCont.getOne));

app.use(router.get("/getAllEmps",urlencodedParser,empCont.getAll));

app.use(router.get("/getAllEmpsHoliday",urlencodedParser,holiCont.getAll));

app.use(router.put("/updateEmp",urlencodedParser,empCont.update));

app.use(router.put("/updateEmpHoliday",urlencodedParser,holiCont.update));

app.use(router.put("/replayEmpHoliday",urlencodedParser,holiCont.replayOnHolidayRequest));

app.use(router.delete("/deleteEmp",urlencodedParser,empCont.delete));

app.use(router.delete("/deleteEmpHoliday",urlencodedParser,holiCont.delete));

app.use(router.post("/returnEmp",urlencodedParser,empCont.Return));

app.use(router.post("/payEmp",urlencodedParser,payForPreMonth));

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
