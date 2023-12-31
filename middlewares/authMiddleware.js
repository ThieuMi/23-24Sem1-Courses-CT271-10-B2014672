const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandle = require("express-async-handler");

const authMiddleware = asyncHandle(async (req, res, next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split("")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded);
            }
        } catch(error) {
            throw new Error('Not Authorized token expired, Please Login again')
        }
    } else {
        throw new Error("There is no token attched to header");
    }
});module.exports = {authMiddleware};