const bcryptjs = require("bcryptjs");
const userService = require("../services/user.service");


exports.register = (req,res,next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSalt(10);

    req.body.password = bcryptjs.hashSync(password,salt);

    userService.register(req.body,(error,result) => {
        if (error){
            return next (error);
        }
        return res.status(200).send({
            message:"success",
            data:result,
        })
    })
}

exports.login = (req,res,next) =>{
    const { username , password } = req.body;

    userService.login({ username,password }, (error,result) => {
        if (error){
            return next (error);
        }
        return res.status(200).send({
            message:"success",
            data:result,
        })
    })
}

exports.userProfile = (req, res,next) => {
    return  res.status(200).json({ messege:"Autahorized User!"});
}