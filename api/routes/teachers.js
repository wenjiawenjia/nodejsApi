const express = require('express');
const router = express.Router();
const mysqlConnection = require('../../dbConnection');

// 1. As a teacher, I want to register one or more students to a specified teacher.
router.post('/register', (req, res, next) => {

    //     teacher: req.body.teacher,
    //     students: req.body.students
    let teacherId = [];
    mysqlConnection.query(
        "select * from teachers t where t.email =? ", [req.body.teacher],
        (err, rows, fields) => {
            if (!err) {
                // console.log(rows);
                teacherId.push(rows[0].id);
                req.body.students.forEach(t => {
                    mysqlConnection.query("insert into students (email) values (?) ", [t], (err, rows, fields) => {
                        if (!err) {
                            const studentsId = (rows.insertId);
                            // console.log(teacherId[0], studentsId)
                            if (teacherId.length > 0) {
                                mysqlConnection.query("insert into classes (teacher, student) values (?,?)", [teacherId[0], studentsId], (err, rows, fields) => {
                                    if (!err) {
                                        res.status(204).json({
                                            message: 'success',
                                        });
                                    } else {
                                        // console.log(err.sql);
                                    }
                                });
                            }



                        } else {
                            next(err);
                        }
                    });
                })

            } else {
                next(err);
            }

        });





});

// 2. As a teacher, I want to retrieve a list of students common 
// to a given list of teachers(i.e.retrieve students who are registered 
// to ALL of the given teachers).
router.get('/commonstudents', (req, res, next) => {
    const teachers = req.query.teacher;
    // console.log(teachers)
    teachers.forEach(teacher => {
        teacher.replace('%40', '@');
    });
    //TODO:
    mysqlConnection.query(
        "select s1.email from (SELECT s.* FROM ApiAssessment.teachers t inner join ApiAssessment.classes c on c.teacher = t.id inner join ApiAssessment.students s on s.id = c.student where s.isSuspended = false and t.email in (?)) s1 inner join ApiAssessment.classes c1 on c1.student = s1.id inner join ApiAssessment.teachers t1 on t1.id = c1.teacher where t1.email = ? ", [teachers[0], teachers[1]],

        (err, rows, fields) => {
            // console.log(rows);
            const temp = [];

            if (!err) {
                rows.forEach(element => {
                    temp.push(element.email);
                });

                res.status(200).json({
                    students: temp
                });
            } else {
                next(err);
            }
        });


});

// 3. As a teacher, I want to suspend a specified student.
router.post('/suspend', (req, res, next) => {
    // student: req.body.student
    mysqlConnection.query(
        "update students set isSuspended = 1 where email = ?", [req.body.student],
        (err, rows, fields) => {
            if (!err) {
                // console.log(rows);
                res.status(204).json({});
            } else {
                next(err);
            }

        })


});
// 4. As a teacher, I want to retrieve a list of students who can receive a given notification.
router.post('/retrievefornotifications', (req, res, next) => {

    mysqlConnection.query(
        "select s.email from students s inner join notifications n on s.id=n.student inner join teachers t on t.id=n.teacher where t.email=? and n.description=?", [req.body.teacher, req.body.notification], (err, rows, fields) => {
            if (!err) {
                // // console.log(rows);
                const temp = [];
                rows.forEach(x => {
                    temp.push(x.email);
                });
                res.status(200).json({
                    students: temp
                });
            } else {
                next(err);
            }

        });


});


module.exports = router;