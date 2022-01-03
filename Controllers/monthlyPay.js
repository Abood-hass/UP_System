const managers = require("../Models/managers")
const salaryCard = require("../Models/salaryCard")
const holidayCard = require("../Models/holiDate");
const { counterOfSatdaysAndFridays } = require("./minorTasks");
var MangsArray = {};

exports.payForPreMonth = async (req, res) => {
            const nowDate = new Date(Date.now());
            const payMonth = nowDate.getMonth() - 1; 
            const payYear = nowDate.getFullYear() - 1; 
            const weekend = counterOfSatdaysAndFridays( new Date(payYear),  new Date(payMonth))
    // try{
        
        var finalResult = {};
        let allManagers = await managers.find({});
        // MangsArray.push(allManagers);
        allManagers.map( async (oneMangr) => {
            console.log("one emp here")
            let SalCard = await salaryCard.findOne({"_id": oneMangr.empTypeID});;
            if(oneMangr.typeOfEmp === "ca"){
                
            console.log("one casual here") 
            let HoliCard = await holidayCard.findOne({"_id": oneMangr.holiDateID});
            
            const HDateFrom = new Date(HoliCard.holiDateFrom);
            const HDateTo = new Date(HoliCard.holiDateTo);
            if(HDateFrom.getMonth() === payMonth && HoliCard.requestStatus === "accepted"){
                console.log("check here");
                var Difference_In_Days=0;
                if(oneMangr.empTypeID == "ca"){
                var daysInMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate();

                var Difference_In_Time = HDateTo.getTime()  - HDateFrom.getTime() ;

                 Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                }
                var totalOfHolidays = 
                (Difference_In_Days + weekend);

                await salaryCard.findByIdAndUpdate(
                    {"_id": oneMangr.empTypeID},
                    {"contOfHolidays": totalOfHolidays,
                    "contOfWorkDays":(daysInMonth - totalOfHolidays)}
                    )
                    // console.log(oneMangr);
                     MangsArray += (oneMangr + SalCard + HoliCard);
                    //  var empNum = `emp${i}`
                    //  finalResult = {empNum : [{
                    //      'Presonal Info': MangsArray[i],
                    //      'The Salary Info': MangsArray[i+1],
                    //      'The Last Holiday Info': MangsArray[i+2],
                    //  }]};
                    // console.log(MangsArray[0], MangsArray[1]);
                    
                    i+=1;
            }else if(oneMangr.typeOfEmp === "tf"){
                console.log("one full time");
                var totalOfHolidays = 
                (weekend);

                await salaryCard.findByIdAndUpdate(
                    {"_id": oneMangr.empTypeID},
                    {"contOfHolidays": totalOfHolidays,
                    "contOfWorkDays":(daysInMonth - totalOfHolidays)}
                    )
                    // console.log(oneMangr);
                     MangsArray += (oneMangr + SalCard + HoliCard);
                     
                     i+=1;
            }
            console.log(MangsArray);
        }
        console.log("finished");
        });
        res.json(MangsArray);
    // }catch(e){
    //     res.send(e);
    // }
}