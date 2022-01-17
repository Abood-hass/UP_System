
    const employee = require( "./../../Models/employees");
    // exports.show =   ()=> {
      console.log("here");


    let allemployee =employee.find({});
    console.log(typeof allemployee)
    for (var i = 0; i < allemployee.length; i++){
      console.log("index: " + i);
      var obj = allemployee[i];
        for (var key in obj){
          var value = obj[key];
          console.log(key + ": " + value);
  }
    }
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