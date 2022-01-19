
    // exports.show =   ()=> {
      // console.log("here");

     function showAllInTable () {

      const employee = require( "./../../Models/employees");
      let allemployee =employee.find({});
      return allemployee;
  //   let allemployee =employee.find({});
  //   console.log(typeof allemployee)

  //   // let result = '<table id="tableID" summary="This table shows how to create responsive tables using RWD-Table-Patterns functionality"  class="table table-bordered table-hover" ><tr><th>Name</th><th>Academic ID</th><th data-priority="1">Email</th><th data-priority="2">Phone Number</th><th data-priority="3">Employment type</th></tr>';

  //     let tableCont = [];
  //   for (var i = 0; i < allemployee.length; i++){
  //     var obj = allemployee[i];
        
  //       for (let el in obj) {
  //         tableCont.push(Key)
  //       }
  //   }

  //   var table = document.createElement('table');

  //   var tr = table.insertRow(-1);

  //   for (var i = 0; i < tableCont.length; i++) {
  //     var th = document.createElement("th");      // TABLE HEADER.
  //     th.innerHTML = tableCont[i];
  //     tr.appendChild(th);
  // }
  
  // for (var i = 0; i < allemployee.length; i++) {

  //     tr = table.insertRow(-1);

  //     for (var j = 0; j < col.length; j++) {
  //         var tabCell = tr.insertCell(-1);
  //         tabCell.innerHTML = allemployee[i][col[j]];
  //     }
  // }  

  //       var divContainer = document.getElementById("showData");
  //       divContainer.innerHTML = "";
  //       divContainer.appendChild(table);
  //       res.send(table) ;

  //   // result += '</table>';

  //   // let obj = { 1: 'one', 2: 'two', 3: 'three' }

    }

  //   for (var i = 0; i < allemployee.length; i++){
  //     console.log("index: " + i);
  //     var obj = allemployee[i];
  //       for (var key in obj){
  //         var value = obj[key];
  //         console.log(key + ": " + value);
  // }
  //   }
  //   allemployee.feach(function(element){
  //      console.log(element);
  //     $('#tableID').append('<tr><th>' + element['emp_ID'] + '</th><tr>'+ element['Fname']
  //                          + '<tr><th>' + element['phoneNumber_1'] + '</th><tr>'+ element['typeOfEmp'] 
  //                          + '<tr><th>' + element['email'] + '</th><tr>'+ element['Lname']   + '</th><tr>');
  // });

    //   let template_table_body = {};
    //     // MangsArray.push(allemployee);
    //     let type;
    //     allemployee.map( async (oneEmp) => {
    //         if(oneEmp.typeOfEmp === "casualTypeEmp"){
    //         type = "Manager"
    //     }else if(oneEmp.typeOfEmp === "fullTimeTypeEmp"){
    //         type = "Acadimic"
    //     }
    // //     template_table_body += {
            
    // // "<>": "tr", "html": [
    // //     {"<>": "td", "html": oneEmp},
    // //     {"<>": "td", "html": oneEmp.emp_ID},
    // //     {"<>": "td", "html": oneEmp.Fname + oneEmp.Lname},
    // //     {"<>": "td", "html": oneEmp.phoneNumber_1},
    // //     {"<>": "td", "html": type}
    // //      ]
    // //     }
    //   });
    //   // template_table_body = 
    //   // <tr>
    //   // <td>Argentina</td>
    //   // <td>Australia</td>
    //   // <td>English 79%, native and other languages</td>
    //   // <td>23,630,169</td>
    //   // <td>7,739,983</td>
    //   //  </tr>;
    //   console.log("hi")
    //   // document.getElementById("here").innerHTML=template_table_body;
      // return '';
    // }
    // module.exports.show = show;