import { v4 as uuidv4 } from "uuid";
import quizModel from "./model.js";
import questionModel from "./questionModel.js";
import quizAttemptModel from "./quizAttemptModel.js";

export function createQuiz(quiz) {
  const newQuiz = {
    ...quiz,
    _id: uuidv4(),
    questions: [],
  };
  return quizModel.create(newQuiz);
}

export function findQuizzesForCourse(courseId) {
  return quizModel.find({ course: courseId });
}

export function findQuizById(quizId) {
  return quizModel.findOne({ _id: quizId });
}

export function updateQuiz(quizId, quiz) {
  return quizModel.updateOne({ _id: quizId }, { $set: quiz });
}

export function deleteQuiz(quizId) {
  quizModel.deleteMany({ quiz: quizId }).then(() => {
    return quizModel.deleteOne({ _id: quizId });
  });
}

export function publishQuiz(quizId, publishState) {
  return quizModel.updateOne(
    { _id: quizId },
    { $set: { published: publishState } }
  );
}

// export async function createQuestion(question) {
//   const newQuestion = {
//     ...question,
//     _id: uuidv4(),
//   };

//   return questionModel.create(newQuestion).then((createdQuestion) => {
//     return quizModel
//       .updateOne(
//         { _id: question.quizId },
//         { $push: { questions: { _id: createdQuestion._id } } }
//       )
//       .then(() => {
//         return createdQuestion;
//       });
//   });
// }

export function createQuestion(question) {
  console.log("Creating question:", question);
  const newQuestion = {
    ...question,
    _id: uuidv4(),
  };

  return questionModel
    .create(newQuestion)
    .then((result) => {
      console.log("Question created:", result);
      return result;
    })
    .catch((err) => {
      console.error("Error creating question:", err);
      throw err;
    });
}

export async function findQuestionsForQuiz(quizId) {
  const questions = await questionModel.find();
  return questions.filter((question) => question.quizId === quizId);
}

export async function updateQuestion(questionId, questionUpdates) {
  return questionModel.updateOne(
    { _id: questionId },
    { $set: questionUpdates }
  );
}

export async function deleteQuestion(questionId) {
  return questionModel.findOne({ _id: questionId }).then((question) => {
    if (!question) return null;

    return quizModel
      .updateOne({ _id: question.quizId }, { $pull: { questions: questionId } })
      .then(() => {
        return questionModel.deleteOne({ _id: questionId });
      });
  });
}

export async function submitQuizAttempt(quizId, attempt) {
  const attemptNumber = await quizAttemptModel
    .find({ quizId: quizId, userId: attempt.userId })
    .then((attempts) => {
      return attempts.length + 1;
    });
  console.log("submitting attempt dao", attempt);

  // Create a new quiz attempt document
  const newAttempt = {
    _id: attempt._id || uuidv4(),
    quizId: quizId,
    userId: attempt.userId,
    attemptNumber: attemptNumber,
    score: attempt.score,
    totalPoints: attempt.totalPoints,
    startTime: attempt.startTime,
    endTime: attempt.endTime,
    answers: attempt.answers,
  };

  // Create and save the new attempt
  return quizAttemptModel.create(newAttempt).then(() => {
    // Return all attempts for this quiz and user if needed
    return quizAttemptModel.find({
      quizId: quizId,
      userId: attempt.userId,
    });
  });
}

export async function findQuizAttempts(quizId, userId) {
  return quizAttemptModel.find({ quizId: quizId, userId: userId });
}

export async function findQuizAttempt(quizId, userId, attemptId) {
  return quizAttemptModel.findOne({
    _id: attemptId,
    quizId: quizId,
    userId: userId,
  });
}
