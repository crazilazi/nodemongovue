import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "../interface/user";

export interface IUserModel extends IUser, Document {
    fullName(): string;
  }

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    age: {type: Number, default: 25 },
});

UserSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
  };

export let careUser: Model<IUserModel> = model<IUserModel>("careUser", UserSchema);
