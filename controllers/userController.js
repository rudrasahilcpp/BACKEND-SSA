import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userRegister = async (req , res) => {
    try{
        const {name , email , phone , password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const newUser = new User({
            name,
            email ,
            phone ,
            password: hashedPassword
        });
    
        await newUser.save();
        res.status(200).json({message : 'registration completed'})
    }catch(error){
        res.status(500).json({message : "could not register"});
    }
}


export const userLogin = async (req , res) => {
    try{
        const {email , password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            res.status(404).json({message : "could not find user"})
        };

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            res.status(401).json({message : "invalid password"});
        }

        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '24h'});
        
        res.status(200).json({message : "login successfull" , token});
        console.log("succesfull")
    }catch(error){
        res.status(500).json({message : "could not login"});
        console.log("unsuccesful")
    }
}

export const getUserProfile = async (req, res) => {
    try {
        // req.user.id is set by the auth middleware
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Failed to retrieve user profile" });
    }
};
