import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./AddStudent.module.scss";
import axios from "axios";
import AddStudentsList from './AddStudentsList';
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/students/" //createNew
const updateURL = "http://localhost:5000/api/students/profile/"
const departmentsURL = "http://localhost:5000/api/departments/"

const AddStudent = props => {
    const department = JSON.parse(localStorage.getItem("department"))
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [students, setStudents] = useState([])
    const [logins, setLogins] = useState([])
    const [departments, setDepartments] = useState([])
    const [fullName, setFullName] = useState("")
    const [studentFormValue, setStudentFormValue] = useState({
        login: "",
        name: "",
        surname: "",
        patronymic: "",
        full_name: fullName,
        birth_year: null,
        group: "",
        phone_number: null,
        email: null,
        photo: null,
        hometown: null,
        school: null,
        math_points: null,
        russian_points: null,
        physics_points: null,
        informatics_points: null,
        iap_points: "",
        oop_points: null,
        skills: null,
        achievements: null,
        desired_training: null,
        id_event: null,
        id_department: department.id_department,
        id_user: null
    });

    useEffect(() => {
        axios.get(departmentsURL).then((response) => {
            setDepartments(response.data);
        });
    }, []);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setStudentFormValue({ ...studentFormValue, id_event: props.id_event })
        setFullscreen(breakpoint);
        setShow(true);
    }

    async function getData() {
        const response = await axios.get(baseURL)
        return response.data
    }

    const handleSubmit = (event) => {
        students.push(studentFormValue)
        getData().then((data) => {
            data.map((record, index) => {
                setLogins(logins.push(record.login))
            })

            const hasLogin = logins.some(item => {
                return JSON.stringify(item) === JSON.stringify(studentFormValue.email)
            })

            if (hasLogin) {
                data = data.filter(item => item.email === studentFormValue.email)
                data[0].id_event = props.id_event
                const studentToUpdateURL = updateURL + `${data[0]['id_student']}`
                axios.put(studentToUpdateURL, data[0]).then(() => refreshPage())
                            .catch((error) => {
                                console.log(error);
                            });
            } else {
                axios.post(baseURL, students).then(() => refreshPage())
            }
        })
        event.preventDefault();
    }

    const handleChange = (student) => {
        setStudentFormValue({
            ...studentFormValue,
            [student.target.name]: student.target.value,
            login: studentFormValue.email,
            full_name: fullName
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
            <Button key={0} disabled={props.isDisabledByEvents} className={`${styles.addButton_students}`} onClick={() => handleShow('md-down')}>
                <IconContext.Provider value={{
                    size: '24px'
                }}>
                    <div>
                        <AiOutlinePlus />
                    </div>
                </IconContext.Provider>
                <span className={`${styles.addButton_text}`}>Добавить студента</span>
            </Button>
            <AddStudentsList disabled={props.isDisabledByEvents} id_event={props.id_event} id_department={props.id_department} />
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.form_title}`}>Добавить студента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className={`${styles.form}`}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlSurname">
                                <Form.Label className={`${styles.label}`}>Фамилия</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="surname" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlName">
                                <Form.Label className={`${styles.label}`}>Имя</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPatronymic">
                                <Form.Label className={`${styles.label}`}>Отчество</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="patronymic" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlBirthDate">
                                <Form.Label className={`${styles.label}`}>Дата рождения</Form.Label>
                                <Form.Control required type="date" onChange={handleChange} name="birth_year" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlGroup">
                                <Form.Label className={`${styles.label}`}>Группа</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="group" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPhoneNumber">
                                <Form.Label className={`${styles.label}`}>Телефон</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="phone_number" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlEmail">
                                <Form.Label className={`${styles.label}`}>E-mail</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="email" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlHometown">
                                <Form.Label className={`${styles.label}`}>Родной город</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="hometown" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlSchool">
                                <Form.Label className={`${styles.label}`}>Школа</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="school" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlMathPoints">
                                <Form.Label className={`${styles.label}`}>Математика</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="math_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlRussianPoints">
                                <Form.Label className={`${styles.label}`}>Русский язык</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="russian_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPhysicsPoints">
                                <Form.Label className={`${styles.label}`}>Физика</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="physics_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlInformaticsPoints">
                                <Form.Label className={`${styles.label}`}>Информатика</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="informatics_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlIapPoints">
                                <Form.Label className={`${styles.label}`}>ИИП</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="iap_points" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlOopPoints">
                                <Form.Label className={`${styles.label}`}>ООП</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="oop_points" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form_areas}`}>
                            <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlSkills">
                                <Form.Label className={`${styles.label}`}>Умения</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={handleChange} name="skills" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlAchievments">
                                <Form.Label className={`${styles.label}`}>Достижения</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={handleChange} name="achievements" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlDesiredTraining">
                                <Form.Label className={`${styles.label}`}>Желаемые практики</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={handleChange} name="desired_training" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form_button}`}>
                            <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                                Создать
                            </Button>
                        </Form.Group>
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

export default AddStudent;
