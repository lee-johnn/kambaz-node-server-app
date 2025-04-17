import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true, default: "New Quiz" },
    description: { type: String, default: "" },
    course: { type: String, required: true },
    published: { type: Boolean, default: false },

    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },

    shuffleAnswers: { type: Boolean, default: false },
    hasTimeLimit: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    allowedAttempts: { type: Number, default: 1 },

    showCorrectAnswers: { type: Boolean, default: false },
    showCorrectAnswersDate: { type: Date },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },

    dueDate: { type: Date },
    availableDate: { type: Date },
    untilDate: { type: Date },

    totalPoints: { type: Number, default: 100 },
    questions: [
      {
        _id: false,
        questionId: String,
        type: {
          type: String,
          enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
        },
        title: String,
        questionText: String,
        points: Number,
        choices: [String], // for MC
        correctChoice: String, // for MC
        correctAnswer: mongoose.Schema.Types.Mixed, // true/false or string or array
      },
    ],
  },
  { collection: "quizzes" }
);

export default quizSchema;