// email , password, userName,isEmailVerified
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwtT = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "password must be with 8 characters"],
    },
    userName: {
      type: String,
      required: [true, "Please enter the name!"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.jwtToken = function () {
    return jwtT.sign({id: this._id}, "13e42udeiwdhskjsdhj", {expiresIn: '3d'})
}
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password )
}

module.exports = mongoose.model("user", userSchema);
