import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
       type:String,
       required:true,
       unique:true 
    },
    phone:String,
    role:{
        type:String,
        enums:["Admin","User"],
        default:"User"
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:true
    },
    isVerfied:{
        type:Boolean,
        default:false
    }


  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", schema);

export default UserModel;