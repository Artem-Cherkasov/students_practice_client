import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./StudentInfo.module.scss";
import axios from "axios";
import default_photo from "../../../images/default_photo.png"
import { AiOutlineUser } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";

const studentsURL = 'http://localhost:5000/api/students/profile/';

const StudentInfo = props => {
    const department = JSON.parse(localStorage.getItem("department"))
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [student, setStudent] = useState({})

    useEffect(() => {
        axios.get(studentsURL + props.student.id_student).then(response => { setStudent(response.data) })
    }, []);

    for (const key in student) {
        const val = student[key];

        if (key !== "photo") {
            if (val === null || val === "") {
                student[key] = "-";
            }
        }
    }

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <>
            <Button className={`${styles.addUserButton} ${styles.button}`} onClick={() => handleShow('md-down')}>
                <IconContext.Provider value={{
                size: '25px'
            }}>
                <div>
                    <AiOutlineUser>
                    </AiOutlineUser>
                </div>
            </IconContext.Provider>
            </Button>
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.form_title}`}>Информация о студенте</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`${styles.profile_wrapper}`}>
                        <div className={`${styles.main_content}`}>
                            <div className={`${styles.student_info}`}>
                                <div className={`${styles.photo_wrapper}`}>
                                    {student.photo === null ? (
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StudentInfo;