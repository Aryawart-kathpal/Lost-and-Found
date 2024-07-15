const User = require('../models/User');
const CustomError = require('../errors');
const {StatusCodes} = require('http-status-codes');
const {checkPermissions} = require('../utils');

const getAllUsers  = async(req,res)=>{
   const users = await User.find({});
   res.status(StatusCodes.OK).json({users});
}

const getSingleUser = async(req,res)=>{
    const {id} = req.params;
    const user = await User.findOne({_id:id});

    if(!user){
        throw new CustomError.NotFoundError(`No user with id : ${id}`);
    }

    checkPermissions(req.user,user._id);
    res.status(StatusCodes.OK).json({user});
}

const getCurrentUser = async(req,res)=>{
    const {userId} = req.user;
    const user =await User.findOne({_id:userId});
    res.status(StatusCodes.OK).json({user});
}

const updateUser = async(req,res)=>{
    const {name} = req.body;
    const {id} = req.params;
    const user = await User.findOne({_id:id});

    if(!user){
        throw new CustomError.NotFoundError(`No user with id : ${id}`);
    }
    
    checkPermissions(req.user,user._id);

    const updatedUser = await User.findOneAndUpdate({_id:id},{name},{new:true,runValidators:true});
    res.status(StatusCodes.OK).json({user:updatedUser,msg:"User updated Successfully"});
}

const deleteUser = async(req,res)=>{
    const {id} = req.params;
    const user = await User.findOne({_id:id});
    // console.log(user);
    if(!user){
        throw new CustomError.NotFoundError(`No user with id : ${id}`);
    }
    
    checkPermissions(req.user,user._id);

    // await user.remove(); -> In new mongoose versions it is not allowed to use the remove hook, so if I need to use the pre hook, then a pre hook to deleteOne has to be created
    await User.deleteOne({_id:id});
    
    return res.status(StatusCodes.OK).json({msg:"User deleted successfully"});
}

module.exports ={getAllUsers,getSingleUser,getCurrentUser,updateUser,deleteUser};