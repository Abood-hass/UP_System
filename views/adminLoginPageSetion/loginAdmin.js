// const admin = require("../../Models/admin");
const alert = require('alert');
const admin = require('../../Models/admin');


exports.loginasAdmin = async (req, res, next) => {
    
    // try {
     
        console.log('here')
    var password = req.body.password;
    var id = req.body.id;

    var theAdmin = await admin.findOne({'admin_ID': id,"password":password});
    // var theAdmin = await admin.findOne();
    // console.log(id)
    // console.log(password)

    //     console.log(theAdmin)
      
    if(theAdmin == null){

        alert("Wrong Inputs")
        return res.redirect('http://localhost:5000/Login_as_Admin');

    }else{
        return res.redirect('http://localhost:5000/manageAll');
        
    }
// } catch (err) {
//     console.log(err);
// }
}