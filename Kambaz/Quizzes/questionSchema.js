import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: String,
    title: String,
    type: {
      type: String,
      enum: ["MultipleChoice", "TrueFalse", "FillInBlank"],
    },
    points: Number,
    question: String,
    options: [
      {
        id: String,
        text: String,
        isCorrect: Boolean,
      },
    ],
    correctAnswer: mongoose.Schema.Types.Mixed,
    correctAnswers: [String],
    caseSensitive: Boolean,
  },
  { collection: "quizQuestions" }
);

export default questionSchema;
