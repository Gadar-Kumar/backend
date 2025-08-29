import mongoose,{Schema} from "mongoose";
import {bcrypt} from 'bcrypt'

const userSchema=new Schema({
    username:{
        type:string,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true // for searching
    },

    email:{
        type:string,
        require:true,
        unique:true,
        trim:true,
        index:true
    },
    fullname:{
        type:string,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type:string,
        require:true,
    },
    coverImage:{
        type:string

    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:string,
        require:[true,"Password is required"],
    },
    refreshToken:{
        type:string,
    }
},{timestamps:true})

userSchema.pre("save",async function(next) {
    if(!this.isModified("password"))return next();

    this.password=await bcrypt.has(this.password,10)
    next()
})

userSchema.method.isPasswordCorrect=async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.method.generateAccessToken=function(){
    return jwt.sign({
       _id:this._id,
       email:this.email,
        username:this.username,
      fullname:this.fullname
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.method.generateRefreshToken=function(){
     return jwt.sign({
       
    },process.env.REFRESH_TOKEN_SECERET,{
        expiresIn:process.env.REFERESH_TOKEN_EXPIRY
    })
}


export const User=mongoose.model("User",userSchema)