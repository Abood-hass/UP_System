const holiDate = require("../Models/holiDate");
const employee = require("../Models/managers");
const { holidayInserter } = require("./minorTasks");


exports.create = async (req, res) => {
    try{
        const holidayBody = req.body;
        const id = holidayBody.holiday_ID;
        console.log("hello");
        let finalHolidayResult = await holidayInserter(holidayBody,id);
        res.send(finalHolidayResult);
    //     const one = await employee.findOne({"holiDateID":id});
    //     const holiDateTo = new Date(holidayBody.holidayTo) ;
    //     const holiDateFrom = new Date(holidayBody.holidayFrom) ;

    //     // console.log(holiDateTo.getMonth(), holiDateFrom.getMonth())

    //     if(holiDateTo.getMonth() === holiDateFrom.getMonth()){
            

    //     var Difference_In_Time = holiDateTo.getTime()  - holiDateFrom.getTime() ;

    //     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        
    //     // console.log(id);
    //     // console.log(holidayBody.holidayFrom);
    //     // console.log(holidayBody.holidayTo);
    //     // console.log(Difference_In_Days);

    //     let newHoliday = 
    //     {
    //         "_id":id,
    //         "holidayFrom":holidayBody.holidayFrom,
    //         "holidayTo":holidayBody.holidayTo,
    //         "countOfHolidays":Difference_In_Days,
    //         "holidayDisc":{
    //             "holiTitle":holidayBody.holidayDisc.holiTitle,
    //             "holiBody":holidayBody.holidayDisc.holiBody
    //         },
    //         "requestStatus":"pendding"
    //     };

    // // console.log(one);
    // if(one !== null){

    //     const theOne = await holiDate.findOneAndUpdate({"_id":id},newHoliday);
    //     res.send(theOne);
    
    // }else{
        
        
    //     await holiDate(newHoliday).save();
    //     console.log("hello 2");
    //     res.send(newHoliday);
    // }
    // }else{
    //     res.send("the holiday should be in the same month");
    // }
    }catch(error){
        res.send(error);
    }
}

exports.getOne = async (req, res) => {
    const id = req.body.acad_ID;
    const theOne = await employee.findOne({"acad_ID":id})
    // console.log("hi")
    if(!(theOne === null)){
        // console.log(theOne);
        const HID = theOne.holiDateID;
        const theHoliday = await holiDate.find({"holiday_ID": HID})
        // console.log(theHoliday);
        // employee.aggregate([{ $add:['holiDateID',theHoliday]}])
        res.send({'The Employee':{theOne,holiDateID :theHoliday}});
    }else{
        
    res.send("Wrong Value");
    }
}
exports.getAll = async (req, res, next) => {
    const all = await holiDate.find({})
    res.send(all);
}
exports.update = async (req, res) => {
    const id = req.body.acad_ID;
    const theOne = await employee.findOne({"acad_ID":id})
    // console.log("hi")
    if(!(theOne === null)){
        // console.log(theOne);
        const HID = theOne.holiDateID;
        const theHoliday = await holiDate.findOne({"holiday_ID": HID})
        // console.log(theHoliday);
        // employee.aggregate([{ $add:['holiDateID',theHoliday]}])
        const theOne = await holiDate.findOneAndUpdate({"holiday_ID":HID},req.body);
        res.send({'The Employee':{theOne,holiDateID :theHoliday}});
    }else{
        
    res.send("Wrong Value");
    }
    // const theOne = await holiDate.findOneAndUpdate({"acad_ID":holiday_ID},req.body);
    // res.send(theOne);
}
exports.delete = async (req, res) => {
    const id = req.body.holiday_ID;
    
    const one = await employee.findOne({"acad_ID":id});
    // console.log(one);
    if(one === null){
        // console.log("inside2");
        res.send("WTF");
    }else{
        // console.log("inside1");
        const HID = theOne.holiDateID;
        await holiDate.findOneAndDelete({"holiday_ID":HID});
        res.send(req.body);
    }
}

exports.replayOnHolidayRequest = async (req, res) => {
    const id = req.body.Employee.emp_ID;
    let theOne = await employee.findOne({"emp_ID":id})
    // console.log("hi")
    if(!(theOne === null)){
        // console.log(theOne);
        const HID = theOne.holiDateID;
        const theHoliday = await holiDate.findOne({"holiday_ID": HID})
        // console.log(theHoliday);
        // employee.aggregate([{ $add:['holiDateID',theHoliday]}])
        theOne = await holiDate.findOneAndUpdate({"holiday_ID":HID},req.body.holiDate);
        res.send({'The Employee':{theOne,holiDateID :theHoliday}});
    }else{
        
    res.send("Wrong Value");
    }
    // const theOne = await holiDate.findOneAndUpdate({"acad_ID":holiday_ID},req.body);
    // res.send(theOne);
}