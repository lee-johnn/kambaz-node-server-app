import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: String,
    userId: String,
    attemptNumber: Number,
    score: Number,
    totalPoints: Number,
    startTime: Date,
    endTime: Date,
    answers: [
      {
        questionId: String,
        answer: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;
