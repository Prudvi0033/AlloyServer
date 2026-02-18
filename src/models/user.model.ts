import mongoose, { Schema, models, model } from "mongoose";

export interface UserInterface {
  username: string;
  password: string;
}

const userSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.index({ username: 1 }, { unique: true });

const User =
  models.User || model<UserInterface>("User", userSchema);

export default User;
