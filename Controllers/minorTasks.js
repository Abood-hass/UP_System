const holiDate = require("../Models/holiDate");
const employee = require("../Models/employee");

exports.salCalculator = function (empBody,salBody) {
    try{
        let hourWork = salBody.hourWork;
        var wHours = 
            salBody.contOfWorkDays - salBody.contOfHolidays;
        let thePrice;
        // console.log(thePrice);
        let finalSalary;
        let taxPercentage = (salBody.taxPercentage);

        if(empBody.typeOfEmp === "tf"){
            thePrice = salBody.payPrice;
            finalSalary = wHours * thePrice;
        }else if(empBody.typeOfEmp === "ca"){
            thePrice = salBody.payPrice;
            finalSalary = wHours * thePrice * hourWork * taxPercentage;
        }else{console.log("try again")}
            return finalSalary;
    } catch (error) {
        console.log(error);
    }
};

exports.holidayInserter = async function (holidayBody, id){
    try{
    let one = await employee.findOne({"holiDateID":id});
    let holiDateTo = new Date(holidayBody.holidayTo) ;
    let holiDateFrom = new Date(holidayBody.holidayFrom) ;
    
    let finalResult = {};

    // console.log(holiDateTo.getMonth(), holiDateFrom.getMonth())

    if(holiDateTo.getMonth() === holiDateFrom.getMonth()){
        

    var Difference_In_Time = holiDateTo.getTime()  - holiDateFrom.getTime() ;

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    // console.log(id);
    // console.log(holidayBody.holidayFrom);
    // console.log(holidayBody.holidayTo);
    // console.log(Difference_In_Days);

    let newHoliday = 
    {
        "_id":id,
        "holidayFrom":holidayBody.holidayFrom,
        "holidayTo":holidayBody.holidayTo,
        "countOfHolidays":Difference_In_Days,
        "holidayDisc":{
            "holiTitle":holidayBody.holidayDisc.holiTitle,
            "holiBody":holidayBody.holidayDisc.holiBody
        },
        "requestStatus":"pendding"
    };

// console.log(one);
if(one !== null){

    let theOne = await holiDate.findOneAndUpdate({"_id":id},newHoliday);
    
    // res.send(theOne);

}else{
    
    
    await holiDate(newHoliday).save();
    console.log("hello 2");
    // res.send(newHoliday);
}
finalResult = newHoliday;
}else{
    finalResult = "the holiday should be in the same month";
    // res.send("the holiday should be in the same month");
}
return finalResult;
}catch(error){
    finalResult = error.message;
}
}