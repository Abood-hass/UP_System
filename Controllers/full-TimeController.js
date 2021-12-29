const employee = require("../Models/employee");
const fullTimeEmp = require("../Models/fullTimeEmp");


exports.create = async (req, res) => {
    await employee(req.body).save();
    res.send(req.body);
}

exports.getOne = async (req, res) => {
    const fname = req.body.Fname;
    const lname = req.body.Lname;
    const theOne = await employee.find({"Fname":fname, "Lname": lname})
    res.send(theOne);
}
exports.getAll = async (req, res, next) => {
    const all = await employee.find({})
    res.send(all);
}
exports.update = async (req, res) => {
    const id = req.body.acad_ID;
    const theOne = await employee.findOneAndUpdate({"acad_ID":id},req.body);
    res.send(theOne);
}
exports.delete = async (req, res) => {
    const id = req.body.acad_ID;
    const theOldOne = await employee.findOne({"acad_ID":id});
        //
        const acad_ID = theOldOne.acad_ID;
        const Fname = theOldOne.Fname;
        const Lname = theOldOne.Lname;
        const dob = theOldOne.dob;
        const doh = theOldOne.doh;
        //
    const theNewOne = {"acad_ID": acad_ID,
                        "Fname": Fname,
                        "Lname": Lname,
                        "dob": dob,
                        "doh": doh
                        };
    await archiveEmps(theNewOne).save();
    await employee.findOneAndDelete({"acad_ID":id});
    res.send(theNewOne);
}
exports.Return = async (req, res) => {
    const id = req.body.acad_ID;
    const theOldOne = await archiveEmps.findOne({"acad_ID":id});
        //
        const Fname = theOldOne.Fname;
        const Lname = theOldOne.Lname;
        const dob = theOldOne.dob;
        const doh = theOldOne.doh;
        //
    const theNewOne = {"acad_ID": acad_ID,
                        "Fname": Fname,
                        "Lname": Lname,
                        "dob": dob,
                        "doh": doh
                        };
    await employee(theNewOne).save();
    await archiveEmps.findOneAndDelete({"acad_ID":id});
    res.send(theNewOne);
}