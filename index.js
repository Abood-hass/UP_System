const { start } = require('./StartupCode');

try{
    const express = require('express');
    const res = express.response;
// const views = require('./')
const app = express();
const dbConfig = require("./dbModule");
var router = express.Router();
const empCont = require("./Controllers/empController");
const showAll = require("./views/employeeManagmentPages/showAll")
const holiCont = require("./Controllers/holidayController");
const http = require('http');
const path = require('path');
var Service = require('node-windows').Service;
// import loginPage from'./views/adminLoginPageSetion/loginAdminPage.html';
app.use(express.static(__dirname + '/loginAdminPage.html'));
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json())

app.set('view engine', 'html');
app.set("views", path.join(__dirname, "adminLoginPageSetion"));


const mongoose = require('mongoose');
const { payForPreMonthAllEmps, payForPreMonthOneEmp} = require('./Controllers/monthlyPay');
const { notifyTheEmps } = require('./Controllers/minorTasks');
const { loginasAdmin } = require('./views/adminLoginPageSetion/loginAdmin');
const { create } = require('./Controllers/empController');
mongoose.connect(dbConfig.url).then(() => {
    console.log("Connected to the database!");
});

// app.set('view engine', 'ejs');
// app.set('loginAdminPage.ejs', path.join(__dirname, 'loginAdminPage.ejs'));

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

app.use(router.post("/payAllEmps",urlencodedParser,payForPreMonthAllEmps));

app.use(router.post("/payOneEmp",urlencodedParser,payForPreMonthOneEmp));

app.use(router.post("/email",urlencodedParser,notifyTheEmps));

app.use(router.get("/manageAll",urlencodedParser,(req, res, next) => {
    res.sendFile(__dirname+'/views/employeeManagmentPages/giveItTry.html')
}));
app.use(router.get("/addNewEmp",urlencodedParser,(req, res, next) => {
    res.sendFile(__dirname+'/views/employeeManagmentPages/addNewEmpPage.html')
}));

app.use(router.get("/",urlencodedParser,(req, res, next) => {
    res.sendFile(__dirname+'/views/adminLoginPageSetion/loginAdminPage.html')
}));
app.use(router.get("/",urlencodedParser,
(req, res, next) => {
    res.send("Hello")
    // res.sendFile(__dirname+'/views/adminLoginPageSetion/loginAdminPage.html')
}
));

app.use(router.post("/loginFunctionAdmin",urlencodedParser,loginasAdmin));

app.use(router.post("/addnewfunction",urlencodedParser,create));

// app.use(router.post("/showAll",urlencodedParser,showAll));


// app.use(start())

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });


}catch(err){
    console.log(err)
}