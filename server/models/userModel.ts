import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

const fieldTypes = {
  type: String,
  required: true,
};

interface IUser {
  email: string;
  avatar?: string;
  password: string;
  lastName: string;
  firstName: string;
}

// User Schema
const UserSchema = new Schema(
  {
    avatar: String,
    password: fieldTypes,
    lastName: fieldTypes,
    firstName: fieldTypes,
    email: { ...fieldTypes, required: true },
  },
  { timestamps: true }
);

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

interface IUserModel extends IUser {
  signUp: (props: IUser) => Promise<any>;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const User = model<IUserModel>("regUsers", UserSchema);

export default User;
