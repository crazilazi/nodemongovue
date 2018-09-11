import { Document, Model, model, PaginateModel, Schema } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate";
import { IUser } from "../interface/user";

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    validate: {
      validator: (v: string) => {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
      },
      message: (props: any) => "Email is not valid!",
    },
    required: [true, "Email is required"],
  },
  firstName: {
    type: String,
    validate: [
      {
        validator: (v: string) => {
          return !/[^a-zA-Z0-9 ]/.test(v);
        }, msg: "First Name should not contain any special char.",
      },
      {
        validator: (v: string) => {
          return v.trim().length > 0;
        }, msg: "First Name is required, Please enter atleast one char.",
      },
    ],
    required: [true, "First Name is required."],
  },
  lastName: {
    type: String,
    validate: {
      validator: (v: string) => {
        return !/[^a-zA-Z0-9 ]/.test(v);
      },
      message: (props: any) => "Last Name should not contain any special char.",
    },
    // required: [true, "lastName is required"],
  },
  age: {
    type: Number, default: 25, validate: {
      validator: (v: number) => {
        return v >= 10 && v <= 60;
      },
      message: (props: any) => "Age should be between 10 and 60.",
    },
    // required: [true, "Age is required"],
  },
  doj: {
    type: Date, validate: {
      validator: (v: Date) => {
        return !(new Date(v.toDateString()) < new Date(new Date().toDateString()));
      },
      message: (props: any) => "DOJ can not be earlier than today.",
    },
  },
});

UserSchema.methods.fullName = function (): string {
  return (this.firstName.trim() + " " + this.lastName.trim());
};
UserSchema.plugin(mongoosePaginate);
// tslint:disable-next-line:class-name
// tslint:disable-next-line:interface-name
interface CareUser<T extends Document> extends PaginateModel<T> { }
export const careUser: CareUser<IUserModel> = model<IUserModel>("careUser", UserSchema);
