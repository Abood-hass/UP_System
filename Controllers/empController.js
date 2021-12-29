const employee = require("../Models/employee");
var ObjectId = require('mongodb').ObjectId;
const archiveEmps = require("../Models/archiveEmps");
// const fullTimeEmp = require("../Models/fullTimeEmp");
const salaryCard = require("../Models/salaryCard");
const { salCalculator } = require("./minorTasks");

exports.create = async (req, res) => {
    try{
    var empBody= req.body.employee;
    var salBody= req.body.salaryCard;
    var holidayBody= req.body.holidayList;
    let finalSalary = salCalculator(empBody,salBody, res);

    let newSal =
        {
            "_id":empBody.empTypeID,
            "dateOfPay":salBody.dateOfPay,
            "contOfWorkDays":salBody.contOfWorkDays,
            "contOfHolidays":salBody.contOfHolidays,
            "payPrice": salBody.payPrice,
            "hourWork": salBody.hourWork,
            "taxPercentage": salBody.taxPercentage,
            "typeOfEmp":empBody.typeOfEmp,
            "netSalary":finalSalary,
        };

    const newEpm = await employee(empBody).save();
    const newSC = await salaryCard(newSal).save();
    res.send(newEpm+newSC);
    } catch (error) {
        res.json(error.message,200);
    }
}

exports.getOne = async (req, res) => {
    try{
        var empBody= req.body;
    let fname = empBody.Fname;
    let lname = empBody.Lname;
    const theOne =
     await employee.findOne
     ({"Fname":fname, "Lname": lname});

     const salCardID = theOne.empTypeID;
    //  console.log(salCardID)
    const theSalaryCard = 
        await salaryCard.findOne
        ({"_id": salCardID });
    res.send(theOne + theSalaryCard);
    // res.send(theOne);
    }catch(error){
        res.send(error, 200)
    }
}

exports.getOneById = async (req, res) => {
    try{
        var empBody= req.body;
    let emp_ID = empBody.emp_ID;
    const theOne =
     await employee.findOne
     ({"emp_ID":emp_ID});

     const salCardID = theOne.empTypeID;
    //  console.log(salCardID)
    const theSalaryCard = 
        await salaryCard.findOne
        ({"_id": salCardID });
    res.send(theOne + theSalaryCard);
    // res.send(theOne);
    }catch(error){
        res.send(error, 200)
    }
}


exports.getAll = async (req, res, next) => {
    const all = await employee.find({})
    res.send(all);
}
exports.update = async (req, res) => {
    var empBody= req.body;
    const id = empBody.acad_ID;
    const theOne = await employee.findOneAndUpdate({"emp_ID":id},empBody);
    res.send(theOne);
}
exports.delete = async (req, res) => {
    const id = req.body.acad_ID;
    const theOldOne = await employee.findOne({"acad_ID":id});
        //
        const acad_ID = theOldOne.acad_ID;
        const Fname = theOldOne.Fname;
        const Lname = theOldOne.Lname;
        const dob = theOldOne.dob;
        const doh = theOldOne.doh;
        //
    const theNewOne = {"acad_ID": acad_ID,
                        "Fname": Fname,
                        "Lname": Lname,
                        "dob": dob,
                        "doh": doh
                        };
    await archiveEmps(theNewOne).save();
    await employee.findOneAndDelete({"acad_ID":id});
    res.send(theNewOne);
}
exports.Return = async (req, res) => {
    const id = req.body.acad_ID;
    const theOldOne = await archiveEmps.findOne({"acad_ID":id});
        //
        const Fname = theOldOne.Fname;
        const Lname = theOldOne.Lname;
        const dob = theOldOne.dob;
        const doh = theOldOne.doh;
        //
    const theNewOne = {"acad_ID": acad_ID,
                        "Fname": Fname,
                        "Lname": Lname,
                        "dob": dob,
                        "doh": doh
                        };
    await employee(theNewOne).save();
    await archiveEmps.findOneAndDelete({"acad_ID":id});
    res.send(theNewOne);
}