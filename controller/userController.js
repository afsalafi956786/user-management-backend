import fs from "fs";
import userModel from "../models/userSchema.js";
import { Parser } from 'json2csv';


let uploadFile;

export async function userRegister(req, res) {
  try {
    const obj = req.body;
    if (req.file && obj) {
      //image
      const { path, originalname } = req.file;
      const splitted = originalname.split(".");
      const extension = splitted[splitted.length - 1];
      const newPath = path + "." + extension;
      fs.renameSync(path, newPath);
       uploadFile = newPath;
      let regName = /^[a-zA-Z\s]+$/;
      let regMobile = /^[0-9]{10}$/;
      if (regName.test(obj.firstName)) {
        if (regMobile.test(obj.mobile)) {
          const existUser = await userModel.findOne({ email: obj.email });
          if (!existUser) {
            const useddMobileNumber = await userModel.findOne({
              mobile: obj.mobile,
            });
            if (!useddMobileNumber) {
              let user = await userModel.create({
                firstName: obj.firstName,
                lastName: obj.lastName,
                email: obj.email,
                gender: obj.gender,
                profile: uploadFile,
                mobile: obj.mobile,
                status: obj.status,
                location: obj.location,
              });

              res.json({
                status: "success",
                message: "Registraion completed",
                user,
              });
            } else {
              res.json({
                status: "failed",
                message: "This number is already taken!!",
              });
            }
          } else {
            res.json({
              status: "failed",
              message: "This Email is already registered!!",
            });
          }
        } else {
          res.json({ status: "failed", message: "Invalid Mobile Number !" });
        }
      } else {
        res.json({ status: "failed", message: "Invalid Name !" });
      }
    } else {
      res.json({ status: "failed", message: "All fields are required !" });
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function getUsers(req, res) {
  try {
    const { limit, page } = req.query;
    let pages = page - 1;
    const userDetails = await userModel
      .find()
      .skip(pages * limit)
      .limit(limit)
      .sort({ updatedAt: -1 });
    res.json(userDetails);
  } catch (error) {
    console.log(error.message);
  }
}

export async function delelteUser(req, res) {
  try {
    const userId = req.body.id;
    await userModel.findByIdAndDelete(userId);
    res.json({ status: "success", message: "deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
}

export async function getEdituser(req, res) {
  try {
    const userId = req.query.id;
    const user = await userModel.findById(userId);
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
}

export async function userSearch(req, res) {
  try {
    const search = req.query.name;
    if (search === "") {
      let searchUser = await userModel.find().sort({ updatedAt: -1 });
      res.json(searchUser);
    } else {
      let searchUser = await userModel
        .find({ firstName: { $regex: search, $options: "i" } })
        .sort({ updatedAt: -1 });
      res.json(searchUser);
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function editUser(req,res){
  try{
    let obj=req.body;
    let userId=req.params.userId;
    await userModel.findByIdAndUpdate(userId,{
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      gender: obj.gender,
      profile: uploadFile,
      mobile: obj.mobile,
      status: obj.status,
      location: obj.location,
    })
    res.json({status:'success','message':'updated successfylly'})
    

  }catch(error){
    console.log(error.message)
  }
}

export async function exportCsv(req,res){
  try{
    const data=await userModel.find({},'firstName lastName email gender  mobile status').sort({ updatedAt: -1 });

    const dataWithIndex = data.map((row, index) => {
      return {
        ID: index + 1,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        gender: row.gender,
        mobile:'+91 '+row.mobile,
        status: row.status,
      };
    });
    const fields = ['ID', 'firstName', 'lastName', 'email', 'gender', 'mobile', 'status'];

      const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(dataWithIndex);
     
    res.header('Content-Type', 'text/csv');
    res.attachment('user_data.csv');
    res.send(csv);

  }catch(error){
    console.log(error.message)
  }
}

export async function getOneUser (req,res){
  try{
     const userId=req.query.id;
     const user=await userModel.findById(userId);
     res.json(user)

  }catch(error){
    console.log(error.message)
  }
}