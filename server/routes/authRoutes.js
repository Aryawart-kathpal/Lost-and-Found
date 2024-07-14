const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication');

const {login,register,resetPassword,verifyEmail,forgotPassword,logout} = require('../controllers/authController');
const passport = require('passport');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const Token  = require('../models/Token');
const CustomError = require('../errors');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/verify-email').get(verifyEmail);
router.route('/logout').delete(authenticateUser,logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google',{
    failureRedirect : '/login'}),
    async (req,res)=>{

        const token = await Token.findOne({user:req.user._id});

        if(!token){
            throw new CustomError.BadRequestError('There was some error in google auth...');
        }

        const refreshToken = token.refreshToken;
        const tokenUser = createTokenUser(req.user);
        attachCookiesToResponse({res,user:tokenUser,refreshToken});
        res.redirect('/');//??
}) 
// check for failure redirect correctly, is correct in integrated, but may cause error in testing on different ports


module.exports = router;