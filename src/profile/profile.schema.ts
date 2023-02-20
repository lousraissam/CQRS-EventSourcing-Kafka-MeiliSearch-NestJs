import { Document, Schema } from "mongoose";

const ProfileSchema = new Schema({
    id: { type: String, index: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    location: { type: String },
    skills: [{ type: [String] }],
    educationLevel: { type: String },
    yearsOfExperence: { type: String },
    state: { type: String , default: "new" },
  });
  
  
  interface ProfileDocument extends Document {
    id: string
    firstName: string
    lastName: string
    email: string
    location: string
    skills: string[]
    educationLevel: string
    yearsOfExperence : string
    state: string
  }
  
  export { ProfileSchema, ProfileDocument };
  