const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minlength:[3,"Name should be atleast 3 characters long"],
    },
    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,"Email is required"],
        validator:{
            validate:validator.isEmail,
            message:"Please enter a valid email"
        },
    },
    password : {
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Password should be atleast 8 characters long"],
    },
    role:{
        type:String,
        enum:{
            values:['user','admin'],
            message:"{VALUE} is not supported",
        },
        default:'user',
    },
    googleId:{type:String},
    verificationToken:String,
    isVerified:{
        type:Boolean,
        default:false,
    },
    verified:Date,
    passwordToken : String,
    passwordTokenExpirationDate:{
        type:Date,
    },
},{timestamps:true});

userSchema.pre('save',async function(){
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

module.exports= mongoose.model('User',userSchema);