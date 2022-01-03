const managers = require("../Models/employees");
// const salaryCard = require("../Models/salaryCard");
// const holidayCard = require("../Models/holiDate");
const { counterOfSatdaysAndFridays, calculatorNetSalary } = require("./minorTasks");

exports.payForPreMonthAllEmps = async (req, res) => {
            const nowDate = new Date(Date.now());
            const payMonth = nowDate.getMonth() - 1; 
            const payYear = nowDate.getFullYear() - 1; 
            const weekend = counterOfSatdaysAndFridays( new Date(payYear),  new Date(payMonth))
    // try{
        
        let allManagers = await managers.find({});
        // MangsArray.push(allManagers);
        let finalResult ;
        allManagers.map( async (oneMangr) => {
            finalResult = await calculatorNetSalary(oneMangr.emp_ID, weekend);
        //     console.log("one emp here")
        //     let SalCard = await salaryCard.findOne({"_id": oneMangr.empTypeID});;
        //     if(oneMangr.typeOfEmp === "ca"){
                
        //     console.log("one casual here") 
        //     let HoliCard = await holidayCard.findOne({"_id": oneMangr.holiDateID});
            
        //     const HDateFrom = new Date(HoliCard.holiDateFrom);
        //     const HDateTo = new Date(HoliCard.holiDateTo);
        //     if(HDateFrom.getMonth() === payMonth && HoliCard.requestStatus === "accepted"){
        //         console.log("check here");
        //         var Difference_In_Days=0;
        //         if(oneMangr.empTypeID == "ca"){
        //         var daysInMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate();

        //         var Difference_In_Time = HDateTo.getTime()  - HDateFrom.getTime() ;

        //          Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        //         }
        //         var totalOfHolidays = 
        //         (Difference_In_Days + weekend);

        //         await salaryCard.findByIdAndUpdate(
        //             {"_id": oneMangr.empTypeID},
        //             {"contOfHolidays": totalOfHolidays,
        //             "contOfWorkDays":(daysInMonth - totalOfHolidays)}
        //             )
        //             // console.log(oneMangr);
        //              MangsArray += (oneMangr + SalCard + HoliCard);
        //             //  var empNum = `emp${i}`
        //             //  finalResult = {empNum : [{
        //             //      'Presonal Info': MangsArray[i],
        //             //      'The Salary Info': MangsArray[i+1],
        //             //      'The Last Holiday Info': MangsArray[i+2],
        //             //  }]};
        //             // console.log(MangsArray[0], MangsArray[1]);
                    
        //             i+=1;
        //     }else if(oneMangr.typeOfEmp === "ft"){
        //         console.log("one full time");
        //         var totalOfHolidays = 
        //         (weekend);

        //         await salaryCard.findByIdAndUpdate(
        //             {"_id": oneMangr.empTypeID},
        //             {"contOfHolidays": totalOfHolidays,
        //             "contOfWorkDays":(daysInMonth - totalOfHolidays)}
        //             )
        //             // console.log(oneMangr);
        //             await MangsArray.push(oneMangr + SalCard + HoliCard);
                     
        //              i+=1;
        //     }
        //     console.log(MangsArray);
        // }
        // console.log("finished");
        });
        res.send(finalResult);
    // }catch(e){
    //     res.send(e);
    // }
}

exports.payForPreMonthOneEmp = async (req, res) => {
// try{

// let oneMangr = await managers.findOne({"_id":req.body._id});
// MangsArray.push(allManagers);
let finalResult ;
let oneManager = await managers.findOne({"emp_ID": req.body.emp_ID});
    finalResult = await calculatorNetSalary(oneManager.emp_ID);
res.send(finalResult);
// }catch(e){
//     res.send(e);
// }
}

