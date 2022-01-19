const employee = require("../Models/employees");
var ObjectId = require('mongodb').ObjectId;
const {casualTypeEmp, fullTimeTypeEmp} = require('./configVariable/enumTypeValues')
const archiveEmps = require("../Models/archiveEmps");
// const fullTimeEmp = require("../Models/fullTimeEmp");
const salaryCard = require("../Models/salaryCard");
const { salCalculator } = require("./minorTasks");
const alert = require('alert');


exports.create = async (req, res) => {
    
    try{
        var empBody= req.body;
        // var salBody= req.body.salaryCard;
        let finalSalary = 0;
            // const empTypID = empBody;
    console.log(empBody);
    console.log("hi");
    let type = empBody.typeOfEmp;
    let type4Emp;
    let  PpH = 0, HoW = 0;
        if(type == `Full Time`){
            console.log("ft")
            type = 'ft';
            type4Emp = fullTimeTypeEmp()
        }else if(type == `Casual`){
            console.log('ca')
            type = 'ca';
            type4Emp = casualTypeEmp()
            finalSalary = empBody.netSalary;
        }
        let newSal =
            {
            "_id": new ObjectId(),
            "dateOfPay":"",
            "contOfWorkDays":empBody.contOfWorkDays,
            "contOfHolidays":0,
            "payPrice": PpH,
            "hourWork": HoW,
            "taxPercentage": empBody.taxPercentage,
            "typeOfEmp":type,
            "netSalary":finalSalary,
            }
             newSC = await salaryCard(newSal).save();
            let newEmp =
            {
                "emp_ID":empBody.empTypeID,
                "Fname":empBody.Fname,
                "Lname":empBody.Lname,
                "dob":empBody.dob,
                "doh":empBody.doh,
                "password":empBody.password,
                "email":empBody.email,
                "phoneNumber_1":empBody.ph1 + empBody.phoneNumber_1,
                "phoneNumber_2":empBody.ph2 + empBody.phoneNumber_2,
                "address":empBody.address,
                "dateOfPay":empBody.dateOfPay,
                "jobTitle":empBody.jobTitle,
                "typeOfEmp":type4Emp,
                "empTypeID": newSC._id,
                "holiDateID": new ObjectId(),
                "Gender":empBody.Gender

            };
            console.log(newEmp)

        let newEpm = await employee(newEmp).save();
        return res.redirect('http://localhost:5000/addNewEmp');

        // let newSC = await salaryCard(newSal).save();
        // res.send(newEpm+newSC);
        } catch (error) {
            console.log(error)
            if(error._message == ('salaryCard validation failed' || 'salaryCard validation failed')){
                alert(
                //    "Wrong Input",
                `Make sure to insert all info Correctly` );
                
        return res.redirect('http://localhost:5000/addNewEmp');
            }
        }
}

exports.getOne = async (req, res) => {
    try{
        var empBody= req.body;
    let fname = empBody.Fname;
    let lname = empBody.Lname;
    let theOne =
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