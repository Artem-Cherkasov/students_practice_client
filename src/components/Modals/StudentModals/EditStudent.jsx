import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./EditStudent.module.scss";
import axios from "axios";
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/students/profile/" //createNew
const eventsURL = "http://localhost:5000/api/events/";

const EditStudent = props => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [fullName, setFullName] = useState("")
    const [studentFormValue, setStudentFormValue] = useState({
        login: props.student.login,
        surname: props.student.surname,
        name: props.student.name,
        patronymic: props.student.patronymic,
        full_name: props.student.full_name,
        birth_year: props.student.birth_year,
        group: props.student.group,
        phone_number: props.student.phone_number,
        email: props.student.email,
        photo: props.student.photo,
        hometown: props.student.hometown,
        school: props.student.school,
        math_points: props.student.math_points,
        russian_points: props.student.russian_points,
        physics_points: props.student.physics_points,
        informatics_points: props.student.informatics_points,
        iap_points: props.student.iap_points,
        oop_points: props.student.oop_points,
        skills: props.student.skills,
        achievements: props.student.achievements,
        desired_training: props.student.desired_training,
        id_event: props.student.id_event,
        id_department: props.student.id_department
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (student) => {
        const studentToUpdateURL = baseURL + `${props.student.id_student}`
        axios.put(studentToUpdateURL, { ...studentFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        student.preventDefault();
    }

    const handleChange = (student) => {
        let full_name = ""
        switch (student.target.name) {
            case "surname":
                full_name = `${student.target.value} ${studentFormValue.name} ${studentFormValue.patronymic}`
                break;
            case "name":
                full_name = `${studentFormValue.surname} ${student.target.value} ${studentFormValue.patronymic}`
                break;
            case "patronymic":
                full_name = `${studentFormValue.surname} ${studentFormValue.name} ${student.target.value}`
                break;
            default:
                full_name = `${props.student.surname} ${props.student.name} ${props.student.patronymic}`
                break
        }
        setStudentFormValue({
            ...studentFormValue,
            [student.target.name]: student.target.value,
            full_name: full_name
        });
        setFullName(`${studentFormValue.surname} ${studentFormValue.name} ${studentFormValue.patronymic}`)
    }

    const [validated, setValidated] = useState(false);

    const checkValidation = (student) => {
        const form = student.currentTarget;
        if (form.checkValidity() === false) {
            student.preventDefault();
            student.stopPropagation();
        }

        setValidated(true);
    };

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <>
            <Button key={0} className={`${styles.editButton}`} onClick={() => handleShow('md-down')}>
                <IconContext.Provider value={{
                    size: '23px'
                }}>
                    <div>
                        <CiEdit />
                    </div>
                </IconContext.Provider>
            </Button>
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.form_title}`}>Редактировать данные студента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlSurname">
                                <Form.Label className={`${styles.label}`}>Фамилия</Form.Label>
                                <Form.Control defaultValue={props.student.surname} required autoFocus onChange={handleChange} name="surname" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlName">
                                <Form.Label className={`${styles.label}`}>Имя</Form.Label>
                                <Form.Control defaultValue={props.student.name} required autoFocus onChange={handleChange} name="name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPatronymic">
                                <Form.Label className={`${styles.label}`}>Отчество</Form.Label>
                                <Form.Control defaultValue={props.student.patronymic} required autoFocus onChange={handleChange} name="patronymic" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlBirthDate">
                                <Form.Label className={`${styles.label}`}>Дата рождения</Form.Label>
                                <Form.Control defaultValue={props.student.birth_year} required type="date" onChange={handleChange} name="birth_year" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlGroup">
                                <Form.Label className={`${styles.label}`}>Группа</Form.Label>
                                <Form.Control defaultValue={props.student.group} required autoFocus onChange={handleChange} name="group" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPhoneNumber">
                                <Form.Label className={`${styles.label}`}>Телефон</Form.Label>
                                <Form.Control defaultValue={props.student.phone_number} required autoFocus onChange={handleChange} name="phone_number" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlEmail">
                                <Form.Label className={`${styles.label}`}>E-mail</Form.Label>
                                <Form.Control defaultValue={props.student.email} required autoFocus onChange={handleChange} name="email" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlHometown">
                                <Form.Label className={`${styles.label}`}>Родной город</Form.Label>
                                <Form.Control defaultValue={props.student.hometown} required autoFocus onChange={handleChange} name="hometown" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlSchool">
                                <Form.Label className={`${styles.label}`}>Школа</Form.Label>
                                <Form.Control defaultValue={props.student.school} required autoFocus onChange={handleChange} name="school" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlMathPoints">
                                <Form.Label className={`${styles.label}`}>Математика</Form.Label>
                                <Form.Control defaultValue={props.student.math_points} required autoFocus onChange={handleChange} name="math_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlRussianPoints">
                                <Form.Label className={`${styles.label}`}>Русский язык</Form.Label>
                                <Form.Control defaultValue={props.student.russian_points} required autoFocus onChange={handleChange} name="russian_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPhysicsPoints">
                                <Form.Label className={`${styles.label}`}>Физика</Form.Label>
                                <Form.Control defaultValue={props.student.physics_points} required autoFocus onChange={handleChange} name="physics_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlInformaticsPoints">
                                <Form.Label className={`${styles.label}`}>Информатика</Form.Label>
                                <Form.Control defaultValue={props.student.informatics_points} required autoFocus onChange={handleChange} name="informatics_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlIapPoints">
                                <Form.Label className={`${styles.label}`}>ИИП</Form.Label>
                                <Form.Control defaultValue={props.student.iap_points} required autoFocus onChange={handleChange} name="iap_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlOopPoints">
                                <Form.Label className={`${styles.label}`}>ООП</Form.Label>
                                <Form.Control defaultValue={props.student.oop_points} required autoFocus onChange={handleChange} name="oop_points" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form_areas}`}>
                            <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlSkills">
                                <Form.Label className={`${styles.label}`}>Умения</Form.Label>
                                <Form.Control as="textarea" defaultValue={props.student.skills} rows={3} required autoFocus onChange={handleChange} name="skills" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlAchievments">
                                <Form.Label className={`${styles.label}`}>Достижения</Form.Label>
                                <Form.Control as="textarea" defaultValue={props.student.achievements} rows={3} required autoFocus onChange={handleChange} name="achievements" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlDesiredTraining">
                                <Form.Label className={`${styles.label}`}>Желаемые практики</Form.Label>
                                <Form.Control as="textarea" defaultValue={props.student.desired_training} rows={3} required autoFocus onChange={handleChange} name="desired_training" />
                            </Form.Group>
                        </Form.Group>
                        <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                            Сохранить
                        </Button>
                    </Form>
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

export default EditStudent;