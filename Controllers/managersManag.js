const employee = require("../Models/employee");
const holiDate = require("../Models/holiDate");
const salaryCard = require("../Models/salaryCard");

exports.getOneMngInfo = async (req, res) => {
    try{
        var empBody= req.body;
    let emp_id = empBody.emp_ID;
    const theOne =
     await employee.findOne
     ({"emp_ID" : emp_id});

    const salCardID = theOne.empTypeID;
    const holiCardID = theOne.holiDateID;
    
    const theSalaryCard = 
    await salaryCard.findOne
    ({"_id": salCardID });

    const holiDateCard = 
    await holiDate.findOne
    ({"_id": holiCardID });

res.send(theOne + theSalaryCard + holiDateCard);

    }catch(error){
        res.send(error, 200)
    }
}

exports.updateOneMngInfo = async (req, res) => {
    var empBody= req.body;
    var newEmpBody = {
        "email": req.body.email,
        "phoneNumber_1": req.body.phoneNumber_1,
        "phoneNumber_2": req.body.phoneNumber_2,
        "address": req.body.address,
    }
    const id = empBody.acad_ID;
    const theOne = await employee.findOneAndUpdate({"emp_ID":id},newEmpBody);
    res.send(theOne);
}

exports.getAllEmps = async (req, res, next) => {
    const all = await employee.find({})
    res.send(all);
}