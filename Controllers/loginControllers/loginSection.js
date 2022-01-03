const admin = require("../../Models/admin");
const managers = require("../../Models/managers");
const { vlaidateInputFun } = require("./validatorsContollers/validtor");

exports.loginAdminSystem = async (req, res) => {
    let loginBody = req.body;
    if(vlaidateInputFun(loginBody.id, loginBody.password)){
        let theOne = admin.findOne({
            "admin_ID":loginBody.id,
            "password":loginBody.password
        })
        if(theOne === null){
            res.send("there is on admin with this info", 200);
        }else{
            res.send(theOne, 200);
        }
    }else{
        res.send("somthing wrong in input", 200);
    }
}

exports.loginEmployeeSystem = async (req, res) => {
    let loginBody = req.body;
    if(vlaidateInputFun(loginBody.id, loginBody.password)){
        let theOne = managers.findOne({
            "emp_ID":loginBody.id,
            "password":loginBody.password
        })
        if(theOne === null){
            res.send("there is on Manager with this info", 200);
        }else{
            res.send(theOne, 200);
        }
    }else{
        res.send("somthing wrong in input", 200);
    }
}