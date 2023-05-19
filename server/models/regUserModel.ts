import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

const typeFields = {
  type: String,
  required: true,
};

interface IRegUser {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  profilePic?: string;
}

const regUserSchema = new Schema({
  profilePic: String,
  password: typeFields,
  last_name: typeFields,
  first_name: typeFields,
  email: { ...typeFields, required: true },
});

regUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

regUserSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

regUserSchema.methods.signUp = async function ({
  email,
  password,
  last_name,
  first_name,
  profilePic,
}: IRegUser) {
  const userExist = await this.findOne({ email });

  if (userExist) throw new Error("Email already in use");

  const fields = { email, password, last_name, first_name };
  const fieldsWithPics = { ...fields, profilePic };
  const validFields = profilePic ? fieldsWithPics : fields;
  const user = await this.create(validFields);

  return user;
};

const RegUser = model<IRegUser>("regUsers", regUserSchema);

export default RegUser;
