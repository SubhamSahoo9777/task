import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }}) 

  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, email: this.email }, "your_secret_key", { expiresIn: "1h" });
  };

  userSchema.methods.generateToken = function () {
    return jwt.sign(
      { id: this._id, email: this.email },
      process.env.JWT_SECRET ,
      { expiresIn: "1h" }
    );
  };
  
export default mongoose.model('User', userSchema);