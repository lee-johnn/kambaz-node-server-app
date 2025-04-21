import mongoose from "mongoose";
import quizAttemptSchema from "./quizAttemptSchema.js";
const model = mongoose.model("QuizAttemptModel", quizAttemptSchema);
export default model;
