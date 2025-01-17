const express = require("express");

// model
const Course = require("../models/course");

// function
const {checking_login} = require('../service/auth')

const router = express.Router();


router.get('/', (req, res) => {

    var uid = req.cookies?.uid
    // console.log(uid)
    // console.log("--------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-----------------------")
    // console.log(req.user)


    var dept="";
    var temp = req.user.rollNo[0] + req.user.rollNo[1] + req.user.rollNo[2] ; 
    console.log(temp)

    if(temp=="iib" || temp == "iit"){dept="IT";}
    if(temp=="iec"){dept= "ECE";}

    if(checking_login(req,res,uid)){
      console.log(req.params.semester);
      Course.find({ department: dept, semester: req.query.semester })
        .then((foundCourses) => {
          res.json(foundCourses);
          console.log(foundCourses);
        })
        .catch((error) => {
          console.error("Error retrieving courses:", error);
          res.status(500).send("Error retrieving courses");
        });
    }
    else{
      res.status(200).json("you have not login yet")
    }
})  


module.exports = router;

