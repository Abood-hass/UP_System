const holiDate = require("../Models/holiDate");
const managers = require("../Models/employees");
const employee = require("../Models/employees");
const salaryCard = require("../Models/salaryCard");
const nodemailer = require("nodemailer");
// const template = require( './checkTemplate.html' );
// const mailgun = require("mailgun-js");
// const DOMAIN = "sandboxed5e340051c44531a773191c9e2b7717.mailgun.org";
// const mg = mailgun({apiKey: "b10f78b6aec9197a67ab76fbaaa44f26-0be3b63b-15531cb9", domain: DOMAIN});

let {casualTypeEmp, fullTimeTypeEmp} = require('../Controllers/configVariable/enumTypeValues');


exports.salCalculator = function (empBody) {
    try{
        let hourWork = empBody.hourWork;
        var wHours = 
            empBody.contOfWorkDays - empBody.contOfHolidays;
        let thePrice;
        // // console.log(thePrice);
        let finalSalary;
        let taxPercentage = (empBody.taxPercentage);

        if(empBody.typeOfEmp === fullTimeTypeEmp()){
            finalSalary = empBody.netSalary;
        }else if(empBody.typeOfEmp === casualTypeEmp()){
            thePrice = empBody.payPrice;
            finalSalary = wHours * thePrice * hourWork * taxPercentage;
        }else{// console.log("try again")
        }
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

    // // console.log(holiDateTo.getMonth(), holiDateFrom.getMonth())

    if(holiDateTo.getMonth() === holiDateFrom.getMonth()){
        

    var Difference_In_Time = holiDateTo.getTime()  - holiDateFrom.getTime() ;

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    
    // // console.log(id);
    // // console.log(holidayBody.holidayFrom);
    // // console.log(holidayBody.holidayTo);
    // // console.log(Difference_In_Days);

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

// // console.log(one);
if(one !== null){

    let theOne = await holiDate.findOneAndUpdate({"_id":id},newHoliday);
    
    // res.send(theOne);

}else{
    
    
    await holiDate(newHoliday).save();
    // console.log("hello 2");
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

exports.notifyTheEmps = async ()=>{
    const mailBody= 
    `<html>
    <style>
        body{
    background-color:#a5afae;
    margin:0;
    overflow:hidden;
  }
  .check {
    position: relative;
    
    background-color:white;
    width:970px;
    height:370px;
    border:5px solid white;
  }
  .border{
      width: 100%;
    height: 100%;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right:0;
    border:2px solid black;
  }
  .container{
    background-color:#d9fad1;
    overflow: hidden;
    margin: 3px;
    position: absolute;
    top: 0; left: 0; bottom: 0; right:0;
    border:1px solid black;
  }
  .content{
    margin:5px;
  }
  @import url(https://fonts.googleapis.com/css?family=Damion);
  @import url(https://fonts.googleapis.com/css?family=Mrs+Saint+Delafield);
  
  /* pattern from subtlepatterns.com */
  /* https://subtlepatterns.com/patterns/sneaker_mesh_fabric.png */
  
  /* font-family: 'Damion', cursive; */
  
  * {
    box-sizing:border-box;
    font-family:Helvetica;
    
  }
  .one{
    width:100%;
  }
  .title{
    width:300px;
    text-align:center;
    font-family: Helvetica;
    display:inline-block;
    margin-left:25px;
    margin-bottom:40px;
    
   
  }
  
  #bold{
    font-weight:bold;
    font-size:24px;
    text-transform:uppercase;
    letter-spacing:0.4px;
    line-height:150%;
    
  }
  
  
  .name{
    text-transform:uppercase;
    font-size:11px;
    letter-spacing:0.1px;
  }
  .number {
    font-family: "Courier New";
    font-weight: bold;
    margin-top:20px;
    font-size:20px;
   margin-left:103px;
    display:inline-block;
    position:fixed;
    letter-spacing:1px;
    
    
  }
  .following{
    display:inline-block;
    font-family: Helvetica;
    font-size:10px;
    text-transform:uppercase;
    border:1px solid;
    width:417px;
    margin-left:16px;
    margin-top:10px;
    border-collapse:collapse;
  }
  .line{
    text-align:center;
    width:415px;
    height:26px;
    font-size:8px;
    padding:12;;
    
  }
  
  .empty{
    border-top:1px solid;
    
    
  }
  input{
    font-family: Helvetica;
    color: #333;
    background-color:#d9fad1;
    text-align: center;
    border: none;
    width: auto;
    text-transform: uppercase;
  }
  input[name="reason"], input[name="reason2"]{
    width: 400px;
  }
  .two{
    width:100%;
    margin-top:16px;
    
  }
  
  .orderof {
    font-family: 'Damion', cursive;
    font-size: 1.5em;
    border-bottom: 1px solid #333;
    float: left;
    width: 75.9%;
    position: relative;
    padding-top: 0;
    padding: 0 0 0 1em;
    margin: 0px 0 2px 2em;
    line-height: 1;
    height: 32px;
    border-right: 1px solid #333;
  }
  
  .orderof:before {
    font-family: Helvetica;
    font-size: 0.5em;
    content: 'PAY';
    position: absolute;
    left: -3em;
    top: 1.3em;
    
  }
  input[name="amount"]{
    width: 300px;
    display: inline-table;
    height: 20px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    position: fixed;
    top: 158px;
    text-align: left;
  }
  
  .bd{
    text-align:right;
    text-transform:uppercase;
    font-family: Helvetica;
    font-size: 20px;
    letter-spacing: 8px;
  }
  .dollar{
    text-align:right;
    text-transform:uppercase;
    font-family: Helvetica;
    font-size: 0.5em;
    margin-left:298px;
    position:fixed;
    top:162px;
  }
  
  
  .info{
  border-collapse: collapse;
    margin-left:11px;
    text-align: center;
    text-transform: uppercase;
    font-family: Helvetica;
    font-size: 10px;
    border:1px solid #333;
    display:inline-table;
    width:80%;
  }
  
  input[name="date"]{
    font-size: 13px;
    width: 56px;
  }
  input[name="name"]{
    width: 200px;
    font-size: 17px;
  }
  input[name="num"]{
    width: 50px;
    font-size: 13px;
  }
  input[name="description"]{
    width: 200px;
    font-size: 14px;
  }
  input[name="discount"]{
    width: 50px;
    font-size: 13px;
  }
  .row{
   
  }
  .chart{
  border:1px solid #333;
  font-weight:normal;
  }
  #discount{
    border-left:1px dashed;
  
  }
  .blank{
    height: 40px;
    border:1px solid #333;
    font-size:14px;
    
  }
  .short{
    width:79px;
  }
  .long{
    width:300px;
    font-size:18px;
  }
  .des{
    font-size: 15px;
  }
  .amount{
    text-align:center;
    width:144px;
    text-align: center;
  text-transform: uppercase;
  font-family: Helvetica;
  font-size: 11px;
  margin-right: 30px;
  float: right;
  display: inline;
  position: absolute;
  right: -7px;
  top: 144px;
  
  }
  .sign{
    font-family: Helvetica;
    font-size: 15px;
    padding-right: 10px;
    position: fixed;
    display: inline;
    right: 620px;
    top: 209px;
  }
  p{
    text-transform:uppercase;
    font-family: Helvetica;
    font-size: 11px;
    letter-spacing: 0.5px;
    display: inline;
    padding-left: 25px;
    text-align: center;
  }
  .box{
    
    border:1px solid #333;
    width:120px;
    height:30px;
    float:right;
    clear:both;
    margin-top:20px;
  }
  
  .whole{
    border-right:1px dashed #333;
    height:28px;
    width:84px;
    margin-top:0.7px;
  }
  input[name="whole"]{
    text-align: right;
    width: 72px;
    right: 544px;
    top: 204px;
    font-size: 18px;;
  }
   input[name="cent"]{
    text-align: right;
    width: 23px;
    display: inline;
    font-size: 18px;
    position: absolute;
    margin-left: 12px;;
  }
  .cent{
    
  }
  .num {
    font-family: 'Damion', cursive;
    font-size: 1.5em;
    float: left;
    border: 2px solid #aaa;
    position: relative;
    margin: 0 0 0 2em;
    padding: 0 0.5em;
    line-height: 0.9em;
  }
  
  .num:before {
    font-family: Helvetica;
    content: '$';
    font-weight: bold;
    position: absolute;
    left: 1em;
  }
  
  .dollars {
    font-family: 'Damion', cursive;
    font-size: 1.5em;
    border-bottom: 1px solid #666;
    width: 84%;
    float: left;
    padding: 0 0 0 4em;
    position: relative;
  }
  
  .dollars:after {
    font-family: Helvetica;
    font-size: 0.5em;
    content: 'DOLLARS';
    position: absolute;
    right: -5em;
    top: 1.7em;
  }
  .add{
    width:267px;
    margin-left:80px;
    margin-top:5px;
  
  }
  
  .lines{
    border-bottom:1px solid #333;
    height:25px;
    font-size:13px;
    text-align:center;
    padding:0;
    margin:0;
  
  }
  input[name="address"], input[name="citystate"]{
    font-size: 13px;
    width: 260px;
    text-transform: uppercase;
    padding: 0;
    margin: 0;
  
  }
  .bank{
    font-size: 9px;
    text-align: center;
    font-family: Helvetica;
    height: 25px;
    padding-top: 10px;
    letter-spacing: 0.5px;
  }
  .signature{
    margin: 0 10px 30px 0.7em;
    width: 40%;
    padding-bottom: -13px;
    right: 10;
    float: right;;
  }
  .sig {
    font-family: 'Mrs Saint Delafield', cursive;
    font-size: 2em;
    
    border-bottom: 1px solid #333;
    line-height: 0.9em;
    
  }
  .mp{
    text-align: right;
    font-size: 8px;
    font-weight: bold;
    letter-spacing: -8;
  }
  
    </style>

<div class="check">
    <div class="border">
      <div class="container">
        <div class="content">
          <div class="one">
          <div class="title">
          <div id="bold">OWNERS NAME </div>
          <div class="name">COMPANY NAME <br>COMPANY ADDRESS<br>  CITY, STATE ZIP</div>
            </div>
            <table class="following">
              <tr>
                <td class="line">This check is in payment of the following</td>
              <tr><td class="empty line"><input type="text" name="reason" placeholder="INSERT_MEMO" size="13"></td>
              <tr><td class="empty line"><input type="text" name="reason2" size="13"></td>
              
            </table>
          
          <div class="number">0000</div>
          </div>
          
    
    
     
      <div class="orderof"><input type="text" placeholder="INSERT_AMOUNT"  name="amount" size="15"><span class="dollar"><span class="bd">*********************</span>dollars</span></div>
  <table class="info">
      <thead>
      <tr>
      
      <th class="chart">date</th>
      <th class="chart">to the order of</th>
      <th class="chart">check no.</th>
      <th class="chart">description</th>
      <th class="chart" id="discount">discount</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      
  <td class="blank short"><input type="text" PLACEHOLDER="  /  /  " name="date" size="15"></td>
      <td class="blank long"><input type="text" PLACEHOLDER="INSERT_NAME" name="name" size="15"></td>
      <td class="blank short"><input type="text" PLACEHOLDER="0000" name="num" size="15"></td>
      <td class="blank long des"><input type="text" PLACEHOLDER="INSERT_MEMO" name="description" size="15"></td>
      <td class="short" id="discount"><input type="text" PLACEHOLDER="INSERT" name="discount" size="15"></td>
      </tr>
      </tbody>
      </tr>
      </tbody>
  </table>
  
      <div class="amount">
        <span class="amounts"><p>check</p> <p>amount</p></span>
        <div class="sign">
        $</div>
        <div class="box">
          <div class="whole"><input type="text" name="whole" placeholder="0000" size="13"><input type="text" placeholder="00" name="cent" size="13"></div>
          <div class="cent"></div>
          </div>
          </div>
      <table class="add">
          <td class="lines"><input type="text" PLACEHOLDER="INSERT_ADDRESS" name="address" size="13"></td>
          <tr>
          <td class="lines"><input type="text" PLACEHOLDER="CITY, STATE ZIP" name="citystate" size="13"></td>
          <tr>
          <td class="bank">Bank Name, N.A.</td>
      </table>
      <table class="signature">
          <td class="sig"></td>
          <tr>
          <td class="mp"></td>
      </table>
  
  
  
      </div>
   
    
        </div>
      </div>
        </div>
    </div>
  </div>
  </html>`;

    
  // create reusable transporter object using the default SMTP transport
//   const data = {
// 	from: "Mailgun Sandbox <postmaster@sandboxed5e340051c44531a773191c9e2b7717.mailgun.org>",
// 	to: "hayhtam14@gmail.com",
// 	subject: "Hello",
// 	text: mailBody
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });

var transporter = nodemailer.createTransport({
    host: "respect-temperature@xerhdpbd.mailosaur.net",
    port: 2525,
    auth: {
      user: "xerhdpbd@mailosaur.net",
      pass: "HlItceEBNsgpP22x"
    }
  });

  let info = await transporter.sendMail({
    from: '"UP System"<abood211957@outlook.com>', // sender address
    to: '"abood2119hass" <abood2119hass@gmail.com>', // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: mailBody, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.calculatorNetSalary = async (theOneEmpID) =>{
    
    const nowDate = new Date(Date.now());
    const payMonth = nowDate.getMonth() - 1; 
    const payYear = nowDate.getFullYear() - 1; 
    const weekend = this.counterOfSatdaysAndFridays( new Date(payYear),  new Date(payMonth))
    const oneMangr = await managers.findOne({"emp_ID": theOneEmpID});
    // console.log ("EMP: "+oneMangr)
// MangsArray.push(allManagers);
// allManagers.map( async (oneMangr) => {
    // // console.log(casualTypeEmp())
    let SalCard = await salaryCard.findOne({"_id": oneMangr.empTypeID});;
    if(oneMangr.typeOfEmp === casualTypeEmp()){
        
    let HoliCard = await holiDate.findOne({"_id": oneMangr.holiDateID});
    
    const HDateFrom = new Date(HoliCard.holiDateFrom);
    const HDateTo = new Date(HoliCard.holiDateTo);
    if(HDateFrom.getMonth() === payMonth && HoliCard.requestStatus === "accepted"){
        // console.log("check here");
        var Difference_In_Days=0;
        if(oneMangr.empTypeID == casualTypeEmp()){
            // console.log("one casual here") 
        var daysInMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate();

        var Difference_In_Time = HDateTo.getTime()  - HDateFrom.getTime() ;

         Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        }else if(oneMangr.typeOfEmp === fullTimeTypeEmp()){
            // console.log("one full time");
            var totalOfHolidays = 
            (weekend);
    
            await salaryCard.findByIdAndUpdate(
                {"_id": oneMangr.empTypeID},
                {"contOfHolidays": totalOfHolidays,
                "contOfWorkDays":(daysInMonth - totalOfHolidays)}
                )
                // // console.log(oneMangr);
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
            console.log(oneMangr);
            //  var empNum = `emp${i}`
            //  finalResult = {empNum : [{
            //      'Presonal Info': MangsArray[i],
            //      'The Salary Info': MangsArray[i+1],
            //      'The Last Holiday Info': MangsArray[i+2],
            //  }]};
            // // console.log(MangsArray[0], MangsArray[1]);
            
            // i+=1;
    }
// console.log("finished");
// });
return oneMangr;

}