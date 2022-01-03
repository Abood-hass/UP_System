const employee = require("../Models/managers");
const holiDate = require("../Models/holiDate");
const salaryCard = require("../Models/salaryCard");
const { holidayInserter } = require("./minorTasks");

exports.getMyOwnInfo = async (req, res) => {
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

exports.updateMyOwnInfo = async (req, res) => {
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

exports.requetHoliday = async (req, res) => {
    try{
        const holidayBody = req.body;
        const id = holidayBody.holiday_ID;
        let finalHolidayResult = 
            await holidayInserter(holidayBody,id);
        res.send(finalHolidayResult);
    }catch(error){
        res.send(error);
    }
}
