
    var fs = require('fs');

exports.start = () => {
    console.log("hello")
    fs.readFile(__dirname+'/views/adminLoginPageSetion/loginAdminPage.html')
}