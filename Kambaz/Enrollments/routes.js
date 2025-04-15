import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    app.post("/api/enrollments/:courseId/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.send(status);
    });
    
    app.delete("/api/enrollments/:courseId/:userId", async (req, res) => {
        const { courseId, userId } = req.params;
        const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        res.send(status);
    });
}