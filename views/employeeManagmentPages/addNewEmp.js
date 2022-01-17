const { salCalculator } = require("../../Controllers/minorTasks");
const employees = require("../../Models/employees");
const salaryCard = require("../../Models/salaryCard");

exports.create = async (req, res) => {
    try{
    var empBody= req.body;
    // var salBody= req.body.salaryCard;
    let finalSalary = salCalculator(empBody,salBody, res);
        const empTypID = empBody;

    let newSal =
        {
            "emp_ID":empBody.id,
            "Fname":empBody.Fname,
            "Lname":empBody.Lname,
            "dob":empBody.dob,
            "doh":empBody.doh,
            "password":empBody.password,
            "email":empBody.Email,
            "phoneNumber_1":empBody.phone1,
            "phoneNumber_2":empBody.phone2,
            "address":empBody.address,
            "dateOfPay":salBody.dateOfPay,
            "contOfWorkDays":salBody.contOfWorkDays,
            "contOfHolidays":0,
            "payPrice": salBody.payPrice,
            "hourWork": salBody.hourWork,
            "taxPercentage": salBody.taxPercentage,
            "typeOfEmp":empBody.typeOfEmp,
            "netSalary":finalSalary,
        };

    const newEpm = await employees(empBody).save();
    const newSC = await salaryCard(newSal).save();
    res.send(newEpm+newSC);
    } catch (error) {
        res.json(error.message,200);
    }
}
