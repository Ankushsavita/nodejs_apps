const {Student} = require("../models");

//-------------------------------- get API - find All Students -------------------------------------------

const getData = async (req,res) => {
    try{
        const students = await Student.findAll({})
        res.send(students);
    }catch(error){
        console.log("Error");
    }
}

//---------------------------- get API - find one based on Id from All Students --------------------------

const getSingleData = async (req,res) => {
    try{
        // console.log(req.body)
        // console.log(req.params)
        // const {name, age, email} = req.body
        const student = await Student.findByPk(req.params.id);
        res.send({messege: "data retrieve successfully....", data: student});
    }catch(error){
        console.log(error);
    }
}

//----------------------------- create API - create/send All Students in database statically ------------

// const postData = async (req,res) => {
//     try{
//         const student = await Student.create({
//             name: "avinash",
//             age: 25,
//             email:'avk@gmail.com'
//         })
//         res.send({messege: 'data inserted successfully...'});
//     }catch(error){
//         console.log("Error");
//     }
// }

//----------------------------- create API - create/send All Students in database dynamically ------------

const postData = async (req,res) => {
    try{
        console.log(req.body);
        const {name, age, email} = req.body
        const student = await Student.create({
            name: name,
            age: age,
            email: email
        })
        res.send({messege: 'data inserted successfully...'});
    }catch(error){
        console.log("Error");
    }
}

//----------------------------------- update API ---------------------------------------------------------

const updateData = async (req,res) => {
    try{
        // console.log(req.body)
        // console.log(req.params)
        const {name, age, email} = req.body
        const student = await Student.update({
            name,
            age,
            email
        }, {
            where : {
                id: req.params.id
            }
        })
        res.send({messege: "data updated successfully...."});
    }catch(error){
        console.log(error);
    }
}

//------------------------------------- delete API --------------------------------------------------------

const deleteData = async (req,res) => {
    try{
        // console.log(req.body)
        // console.log(req.params)
        // const {name, age, email} = req.body
        const student = await Student.destroy({
            where : {
                id : req.params.id
            }
        })
        res.send({messege: "data deleted successfully..."})
    }catch(error){
        console.log(error);
    }
}

//----------------------------------------------------------------------------
module.exports = {getData, getSingleData, postData, updateData, deleteData};