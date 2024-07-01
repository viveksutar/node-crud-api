import mongoose,{Schema} from 'mongoose'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const adminSchema = Schema({
    fullName:{
        type:String,
        required:true,
        index:true,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token: {
      type: String,
    },
});

adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

  adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        username: this.username,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };

  const Admin = mongoose.model('Admin',adminSchema);
  export default Admin;