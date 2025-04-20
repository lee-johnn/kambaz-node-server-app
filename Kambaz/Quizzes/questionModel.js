import mongoose from "mongoose";
import questionSchema from "./questionSchema.js";
const model = mongoose.model("QuestionModel", questionSchema);
export default model;
