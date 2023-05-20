import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

const fieldTypes = {
  type: String,
  required: true,
};

interface IUser {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  avatar?: string;
}

// User Schema
const UserSchema = new Schema({
  avatar: String,
  password: fieldTypes,
  lastName: fieldTypes,
  firstName: fieldTypes,
  email: { ...fieldTypes, required: true },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with existing one
UserSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Mehtod for saving new user data during sign up
UserSchema.statics.signUp = async function (props: IUser) {
  const { email, password, lastName, firstName, avatar } = props;

  // All required fields
  const reqData = { email, password, lastName, firstName };
  const userExist = await this.findOne({ email });

  // Checks if user exist before creating new user
  if (userExist) throw new Error("Email already in use");

  // Adds user avatar if its added during sign up
  const data = avatar ? { ...reqData, avatar } : reqData;

  // Create new user to db
  const user = await this.create(data);

  return user;
};

const User = model<IUser>("regUsers", UserSchema);

export default User;
