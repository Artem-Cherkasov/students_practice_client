import React, { useEffect, useState } from 'react';
import styles from './StudentProfile.module.scss'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";
import { Nav } from 'react-bootstrap';
import default_photo from "../../images/default_photo.png"

const studentsURL = 'http://localhost:5000/api/students/profile/';

const StudentProfile = () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [student, setStudent] = useState({})

    useEffect(() => {
        axios.get(studentsURL + info.id_student).then(response => { setStudent(response.data) })
    }, [info.id_student]);

    for (const key in student) {
        const val = student[key];

        if (key !== "photo") {
            if (val === null || val === "") {
                student[key] = "-";
            }
        }
    }

    return (
        <div className={`${styles.profile_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.profile_header}`}>
                    <span className={`${styles.title}`}>Профиль</span>
                    <Nav className={styles.nav}>
                        <Nav.Link href='/student/edit_profile' className={styles.nav_link}>
                            <Button key={0} className={`${styles.editButton_students}`}>
                                <IconContext.Provider value={{
                                    size: '24px'
                                }}>
                                    <div>
                                        <CiEdit />
                                    </div>
                                </IconContext.Provider>
                                <span className={`${styles.addButton_text}`}>Редактировать профиль</span>
                            </Button>
                        </Nav.Link>
                    </Nav>
                </div>
                <div className={`${styles.student_info}`}>
                    <div className={`${styles.photo_wrapper}`}>
                        {student.photo === null || student.photo === "" ? (
                            <img alt="profile_photo" src={default_photo} className={`${styles.photo}`}></img>
                        ) : (
                            <img alt="profile_photo" src={student.photo} className={`${styles.photo}`}></img>
                        )}
                    </div>
                    <div className={`${styles.info_wrapper}`}>
                        <div className={`${styles.fields}`}>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>ФИО</span>
                                <span className={`${styles.item_text}`}>{student.full_name}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Год рождения</span>
                                <span className={`${styles.item_text}`}>{student.birth_year}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Группа</span>
                                <span className={`${styles.item_text}`}>{student.group}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Родной город</span>
                                <span className={`${styles.item_text}`}>{student.hometown}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Школа</span>
                                <span className={`${styles.item_text}`}>{student.school}</span>
                            </div>
                        </div>
                        <div className={`${styles.fields}`}>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Телефон</span>
                                <span className={`${styles.item_text}`}>{student.phone_number}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Электронная почта</span>
                                <span className={`${styles.item_text}`}>{student.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.grade}`}>
                    <table className={`${styles.grade_table_school}`}>
                        <tr>
                            <th>Математика</th>
                            <th>Русский язык</th>
                            <th>Физика</th>
                            <th>Информатика</th>
                        </tr>
                        <tr key={0}>
                            <td>{student.math_points}</td>
                            <td>{student.russian_points}</td>
                            <td>{student.physics_points}</td>
                            <td>{student.informatics_points}</td>
                        </tr>
                    </table>

                    <table className={`${styles.grade_table_university}`}>
                        <tr>
                            <th>Информатика и программирование</th>
                            <th>Объектно-ориентированное программирование</th>
                        </tr>
                        <tr key={0}>
                            <td>{student.iap_points}</td>
                            <td>{student.oop_points}</td>
                        </tr>
                    </table>
                </div>
                <div className={`${styles.about}`}>
                    <span className={`${styles.about_title}`}>Навыки</span>
                    <p className={`${styles.about_text}`}>
                        <tr key={0}>
                            <td>{student.skills}</td>
                        </tr>
                    </p>
                    <span className={`${styles.about_title}`}>Достижения</span>
                    <p className={`${styles.about_text}`}>
                        <tr key={0}>
                            <td>{student.achievements}</td>
                        </tr>
                    </p>
                    <span className={`${styles.about_title}`}>Желаемые практики</span>
                    <p className={`${styles.about_text}`}>
                        <tr key={0}>
                            <td>{student.desired_training}</td>
                        </tr>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;