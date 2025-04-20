import { v4 as uuidv4 } from "uuid";
import quizModel from "./model.js";
import questionModel from "./questionModel.js";

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

export function createQuestion(question) {
  const newQuestion = {
    ...question,
    _id: uuidv4(),
  };

  return quizModel.create(newQuestion).then((createdQuestion) => {
    return quizModel
      .updateOne(
        { _id: question.quiz },
        { $push: { questions: createdQuestion._id } }
      )
      .then(() => {
        return createdQuestion;
      });
  });
}

export async function findQuestionsForQuiz(quizId) {
  const questions = await questionModel.find();
  console.log(questions);
  return questions.filter((question) => question.quizId === quizId);
}

export function updateQuestion(questionId, questionUpdates) {
  return quizModel.updateOne({ _id: questionId }, { $set: questionUpdates });
}

export function deleteQuestion(questionId) {
  return quizModel.findOne({ _id: questionId }).then((question) => {
    if (!question) return null;

    return quizModel
      .updateOne({ _id: question.quiz }, { $pull: { questions: questionId } })
      .then(() => {
        return quizModel.deleteOne({ _id: questionId });
      });
  });
}
