import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "../Auth/Auth.module.scss";
import axios from "axios";

const eventsURL = "http://localhost:5000/api/events/"
const usersURL = "http://localhost:5000/api/users/"
const studentsURL = "http://localhost:5000/api/students/"
const employeesURL = "http://localhost:5000/api/employees/"
const companiesURL = "http://localhost:5000/api/companies/"
const departmentsURL = "http://localhost:5000/api/departments/"
const adminsURL = "http://localhost:5000/api/admins/"

const Auth = () => {
    const [logins, setLogins] = useState([]);
    const [errorMessage, setErrorMessage] = useState()
    const [disabled, setDisabled] = useState(true)
    const [departments, setDepartments] = useState([])
    const [events, setEvents] = useState([])
    const [userFormValue, setUserFormValue] = useState({
        login: "",
        pwd_hash: ""
    });

    const navigate = useNavigate()

    const handleChange = (user) => {
        setUserFormValue({
            ...userFormValue,
            [user.target.name]: user.target.value,
        });
    }

    useEffect(() => {
        axios.get(departmentsURL).then((response) => {
            setDepartments(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(eventsURL).then((response) => {
            setEvents(response.data);
        });
    }, []);

    useEffect(() => {
        if (!(userFormValue.login.length === 0 || userFormValue.pwd_hash === 0)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [userFormValue]);

    const checkUser = (e) => {
        e.preventDefault()
        axios.get(usersURL).then((response) => {
            const logins = response.data.map(res => res.login);
            setLogins(logins);
            const currentUser = response.data.find(item => item.login === userFormValue.login)

            if (logins.indexOf(userFormValue.login) > -1) {
                if (currentUser.pwd_hash === userFormValue.pwd_hash) {
                    switch (currentUser.role) {
                        case "student":
                            axios.get(studentsURL).then(response => {
                                const currentStudent = response.data.find(item => item.login === userFormValue.login)
                                if(currentStudent === undefined) {
                                    setErrorMessage(
                                        <div className={`${styles.error_message}`}>
                                            <span>Ошибка! Пользователь не найден</span>
                                        </div>
                                    )
                                }
                                console.log(currentStudent)
                                localStorage.setItem("user_info", JSON.stringify({
                                    id_student: currentStudent.id_student,
                                    name: currentStudent.name,
                                    id_department: currentStudent.id_department
                                }))
                                localStorage.setItem("role", "student")
                                const currentDepartment = departments.find(item => item.id_department === currentStudent.id_department)
                                localStorage.setItem("department", JSON.stringify({
                                    id_department: currentDepartment.id_department,
                                    title: currentDepartment.title
                                }))
                                const currentEvent = events.find(item => item.id_event === currentStudent.id_event)
                                localStorage.setItem("event", JSON.stringify({
                                    id_event: currentEvent.id_event,
                                    title: currentEvent.title
                                }))
                                navigate("/student/profile")
                            })
                            break;
                        case "employee":
                            axios.get(employeesURL).then(response => {
                                const currentEmployee = response.data.find(item => item.login === userFormValue.login)
                                localStorage.setItem("user_info", JSON.stringify({
                                    id_employee: currentEmployee.id_employee,
                                    name: currentEmployee.name,
                                    id_department: currentEmployee.id_department
                                }))
                                localStorage.setItem("role", "employee")
                                const currentDepartment = departments.find(item => item.id_department === currentEmployee.id_department)
                                localStorage.setItem("department", JSON.stringify({
                                    id_department: currentDepartment.id_department,
                                    title: currentDepartment.title
                                }))
                                navigate("/employee/profile");
                            })
                            break;
                        case "company":
                            axios.get(companiesURL).then(response => {
                                const currentCompany = response.data.find(item => item.login === userFormValue.login)
                                localStorage.setItem("user_info", JSON.stringify({
                                    id_company: currentCompany.id_company,
                                    name: currentCompany.name,
                                }))
                                localStorage.setItem("role", "company")
                                navigate("/company/profile");
                            })
                            break;
                        case "admin":
                            axios.get(adminsURL).then(response => {
                                const currentAdmin = response.data.find(item => item.login === userFormValue.login)
                                localStorage.setItem("user_info", JSON.stringify({
                                    id_admin: currentAdmin.id_admin,
                                    name: currentAdmin.name,
                                }))
                                localStorage.setItem("role", "admin")
                                navigate("/admin/profile");
                            })
                            break;
                        default:
                            setErrorMessage(
                                <div className={`${styles.error_message}`}>
                                    <span>Произошла ошибка.</span>
                                </div>
                            )
                            break;
                    }

                    // switch (currentUser.role) {
                    //     case "employee":
                    //         navigate("/employee/events");
                    //         window.location.reload()
                    //         break;
                    //     case "student":
                    //         navigate("/student/profile")
                    //         window.location.reload()
                    //         break;
                    //     case "admin":
                    //         navigate("/admin/employees")
                    //         window.location.reload()
                    //         break;
                    //     default:
                    //         setErrorMessage(
                    //             <div className={`${styles.error_message}`}>
                    //                 <span>Произошла ошибка</span>
                    //             </div>
                    //         )
                    // }
                }
                else {
                    setErrorMessage(
                        <div className={`${styles.error_message}`}>
                            <span>Неверный пароль</span>
                        </div>
                    )
                }
            }
            else {
                setErrorMessage(
                    <div className={`${styles.error_message}`}>
                        <span>Пользователь не найден</span>
                    </div>
                )
            }
        });
    }

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Авторизация</span>
                </div>
                <div className={`${styles.form_wrapper}`}>
                    <Form className={`${styles.form}`} onSubmit={checkUser}>
                        <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlTitle">
                            <Form.Label className={`${styles.label}`}>Логин</Form.Label>
                            <Form.Control onClick={() => setErrorMessage()} required autoFocus name="login" onChange={handleChange} placeholder='Введите логин' />
                        </Form.Group>
                        <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlTitle">
                            <Form.Label className={`${styles.label}`}>Пароль</Form.Label>
                            <Form.Control onClick={() => setErrorMessage()} type="password" required autoFocus name="pwd_hash" onChange={handleChange} placeholder='Введите пароль' />
                        </Form.Group>
                        <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                            Войти
                        </Button>
                    </Form>
                    {errorMessage}
                </div>
            </div>
        </div>
    );
};

export default Auth;