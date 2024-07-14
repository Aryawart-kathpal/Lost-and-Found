const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Token = require('../models/Token');
const crypto = require('crypto');
const CustomError = require('../errors');

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async(accessToken,refreshToken,profile,done) =>{
        const existingUser = await User.findOne({googleId:profile.id});
        if(existingUser){
            const existingToken = await Token.findOne({user:user._id});
            const {isValid} = existingToken;
            if(!isValid){
                throw new CustomError.UnauthenticatedError('Unable to Login');
            }
            return done(null,existingUser);
        }

        const user = await User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            googleId:profile.id
        });

        refreshToken=crypto.randomBytes(40).toString('hex');
        const userAgent = req.headers['user-agent'];
        const ip=req.ip;
        const userToken = {refreshToken,ip,userAgent,user:user._id};
    
        await Token.create(userToken);
        done(null,user);
    }
));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
});