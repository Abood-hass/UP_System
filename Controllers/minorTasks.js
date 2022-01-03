const holiDate = require("../Models/holiDate");
const managers = require("../Models/employees");
const employee = require("../Models/employees");
const salaryCard = require("../Models/salaryCard");
let {casualTypeEmp, fullTimeTypeEmp} = require('../Controllers/configVariable/enumTypeValues');


exports.salCalculator = function (empBody,salBody) {
    try{
        let hourWork = salBody.hourWork;
        var wHours = 
            salBody.contOfWorkDays - salBody.contOfHolidays;
        let thePrice;
        // console.log(thePrice);
        let finalSalary;
        let taxPercentage = (salBody.taxPercentage);

        if(empBody.typeOfEmp === fullTimeTypeEmp()){
            finalSalary = salBody.netSalary;
        }else if(empBody.typeOfEmp === casualTypeEmp()){
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

exports.counterOfSatdaysAndFridays = (year, month) => {

    var day, counter, date;

    day = 1;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
        if (date.getDay() === 6 || date.getDay() === 5) { // Sun=0, Mon=1, Tue=2, etc.
            counter += 1;
        }
        day += 1;
        date = new Date(year, month, day);
    }
    return counter;
}

exports.calculatorNetSalary = async (theOneEmpID) =>{
    
    const nowDate = new Date(Date.now());
    const payMonth = nowDate.getMonth() - 1; 
    const payYear = nowDate.getFullYear() - 1; 
    const weekend = this.counterOfSatdaysAndFridays( new Date(payYear),  new Date(payMonth))
    const oneMangr = await managers.findOne({"emp_ID": theOneEmpID});
    console.log ("EMP: "+oneMangr)
// MangsArray.push(allManagers);
// allManagers.map( async (oneMangr) => {
    // console.log(casualTypeEmp())
    let SalCard = await salaryCard.findOne({"_id": oneMangr.empTypeID});;
    if(oneMangr.typeOfEmp === casualTypeEmp()){
        
    let HoliCard = await holiDate.findOne({"_id": oneMangr.holiDateID});
    
    const HDateFrom = new Date(HoliCard.holiDateFrom);
    const HDateTo = new Date(HoliCard.holiDateTo);
    if(HDateFrom.getMonth() === payMonth && HoliCard.requestStatus === "accepted"){
        console.log("check here");
        var Difference_In_Days=0;
        if(oneMangr.empTypeID == casualTypeEmp()){
            console.log("one casual here") 
        var daysInMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate();

        var Difference_In_Time = HDateTo.getTime()  - HDateFrom.getTime() ;

         Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        }else if(oneMangr.typeOfEmp === fullTimeTypeEmp()){
            console.log("one full time");
            var totalOfHolidays = 
            (weekend);
    
            await salaryCard.findByIdAndUpdate(
                {"_id": oneMangr.empTypeID},
                {"contOfHolidays": totalOfHolidays,
                "contOfWorkDays":(daysInMonth - totalOfHolidays)}
                )
                // console.log(oneMangr);
                // await MangsArray.push(oneMangr + SalCard + HoliCard);
                 
                 i+=1;
        }
    }
        var totalOfHolidays = 
        (Difference_In_Days + weekend);

        await salaryCard.findByIdAndUpdate(
            {"_id": oneMangr.empTypeID},
            {"contOfHolidays": totalOfHolidays,
            "contOfWorkDays":(daysInMonth - totalOfHolidays)}
            )
            // console.log(oneMangr);
            //  var empNum = `emp${i}`
            //  finalResult = {empNum : [{
            //      'Presonal Info': MangsArray[i],
            //      'The Salary Info': MangsArray[i+1],
            //      'The Last Holiday Info': MangsArray[i+2],
            //  }]};
            // console.log(MangsArray[0], MangsArray[1]);
            
            // i+=1;
    }
console.log("finished");
// });
return oneMangr;

}