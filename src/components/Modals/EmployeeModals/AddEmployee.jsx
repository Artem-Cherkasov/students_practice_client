import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./AddEmployee.module.scss";
import axios from "axios";
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";
import AddEmployeesList from './AddEmployeesList';

const baseURL = "http://localhost:5000/api/employees/"; //createNew
const updateURL = "http://localhost:5000/api/employees/profile/";
const departmentsURL = "http://localhost:5000/api/departments/";
const getUsersURL = "http://localhost:5000/api/users";


const AddEmployee = props => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [employees, setEmployees] = useState([])
    const [logins, setLogins] = useState([])
    const [departments, setDepartments] = useState([])
    const [users, setUsers] = useState([])
    const [fullName, setFullName] = useState("")
    const [employeeFormValue, setEmployeeFormValue] = useState({
        login: "",
        name: "",
        surname: "",
        patronymic: "",
        full_name: fullName,
        birth_year: null,
        phone_number: null,
        email: null,
        id_department: null,
        id_user: null
    }
    );

    useEffect(() => {
        axios.get(departmentsURL).then((response) => {
            setDepartments(response.data);
        });
    }, []);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setEmployeeFormValue({ ...employeeFormValue, id_event: props.id_event })
        setFullscreen(breakpoint);
        setShow(true);
    }

    async function getData() {
        const response = await axios.get(baseURL)
        return response.data
    }

    const handleSubmit = (event) => {
        employees.push(employeeFormValue)
        getData().then((data) => {
            data.map((record, index) => {
                setLogins(logins.push(record.login))
            })

            const hasLogin = logins.some(item => {
                return JSON.stringify(item) === JSON.stringify(employeeFormValue.email)
            })

            if (hasLogin) {
                data = data.filter(item => item.email === employeeFormValue.email)
                data[0].id_department = props.id_department
                const employeeToUpdateURL = updateURL + `${data[0]['id_employee']}`
                axios.put(employeeToUpdateURL, data[0]).then(() => refreshPage())
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                axios.post(baseURL, employees).then(() => refreshPage())
            }
        })
        event.preventDefault();
    }

    const handleChange = (employee) => {
        setEmployeeFormValue({
            ...employeeFormValue,
            [employee.target.name]: employee.target.value,
            login: employeeFormValue.email,
            full_name: fullName,
            id_department : props.id_department,
        });
        setFullName(`${employeeFormValue.surname} ${employeeFormValue.name} ${employeeFormValue.patronymic}`)
    }

    const [validated, setValidated] = useState(false);

    const checkValidation = (employee) => {
        const form = employee.currentTarget;
        if (form.checkValidity() === false) {
            employee.preventDefault();
            employee.stopPropagation();
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
                <span className={`${styles.addButton_text}`}>Добавить сотрудника</span>
            </Button>
            <AddEmployeesList disabled={props.isDisabledByEvents} id_event={props.id_event} id_department={props.id_department} />
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.form_title}`}>Добавить сотрудника</Modal.Title>
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
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPhoneNumber">
                                <Form.Label className={`${styles.label}`}>Телефон</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="phone_number" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlEmail">
                                <Form.Label className={`${styles.label}`}>E-mail</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="email" />
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

export default AddEmployee;