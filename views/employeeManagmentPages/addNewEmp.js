const { salCalculator } = require("../../Controllers/minorTasks");
const employees = require("../../Models/employees");
const salaryCard = require("../../Models/salaryCard");
const alert = require('alert');

exports.create = async (req, res) => {
    try{
    var empBody= req.body;
    // var salBody= req.body.salaryCard;
    let finalSalary = salCalculator(empBody);
        // const empTypID = empBody;
console.log(empBody);
console.log("hi");
return res.redirect('http://localhost:5000/addNewEmp');
    let newEmp =
        {
            "emp_ID":empBody.id,
            "Fname":empBody.Fname,
            "Lname":empBody.Lname,
            "dob":empBody.dob,
            "doh":empBody.doh,
            "password":empBody.password,
            "email":empBody.email,
            "phoneNumber_1":empBody.phoneNumber_1,
            "phoneNumber_2":empBody.phoneNumber_2,
            "address":empBody.address,
            "dateOfPay":empBody.dateOfPay,
            
            
            
        };
        const newSal =
        {
        dateOfPay:"",
        "contOfWorkDays":empBody.contOfWorkDays,
        "contOfHolidays":0,
        "payPrice": empBody.payPrice,
        "hourWork": empBody.hourWork,
        "taxPercentage": empBody.taxPercentage,
        "typeOfEmp":empBody.typeOfEmp,
        "netSalary":finalSalary,
        }
    // const newEpm = await employees(empBody).save();
    // const newSC = await salaryCard(newSal).save();
    // res.send(newEpm+newSC);
    } catch (error) {
        alert(`Make sure to insert all info Correctly \n code Error: ${error.message}`)
    }
}
