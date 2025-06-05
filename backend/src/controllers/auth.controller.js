import { generateToken } from "../db/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../db/cloudinary.js";

export const signup = async(req,res) => {
    const { fullName , email , password } = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        // create user , hash the password and then creat ethe token to authenticate them
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        // hash password
        const salt = await bcrypt.genSalt(10);  //just to decide the hashed password length
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });

        if(newUser){
            //generate jwt token 
            generateToken(newUser._id, res);
            // save user to db
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }else{
            return res.status(400).json({message: "User not created"});
        }
    }catch(error){
        console.log("Error in signup controller" , error.message);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const login = async(req,res) => {
    const { email , password } = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    }catch(error){
        console.log("Error in login controller" , error.message);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const logout = async(req,res) => {
    //just clear out the cookie and send a response
    try{
        res.cookie("jwt","" , {maxAge: 0})
        return res.status(200).json({message: "User logged out successfully"});
    }catch(error){
        console.log("Error in logout controller" , error.message);
        return res.status(500).json({message: "Internal server error"});
    }
};

export const updateProfile = async(req , res) => {
    try{
        const { profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "Please provide a profile picture"});
        }
        //update the user profile picture in the db
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId , { profilePic: uploadResponse.secure_url} , {new: true});

        res.status(200).json(updatedUser);

    }catch(error){
        console.log("Error in updateProfile controller" , error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = async(req , res) => {
    try{
        return res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller" , error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}