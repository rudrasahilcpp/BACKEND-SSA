import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

export const verifyToken = async (req , res , next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(401).json({message : 'no token provided'})
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)

        req.user = user;
        console.log(req.user)
        next();
    }catch(error){
        res.status(401).json({message : 'token invalid'});
    }


}