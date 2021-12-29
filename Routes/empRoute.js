var router = require("express").Router();
const empCont = require("../Controllers/empController");

class routes{
    CreateNewEmployee(){
        router.post("/createEmp",empCont.create);
    };
}


module.exports = routes;