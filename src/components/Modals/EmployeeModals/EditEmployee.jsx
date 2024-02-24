import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./EditEmployee.module.scss";
import axios from "axios";
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/employees/profile/" //createNew

const EditEmployee = props => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [fullName, setFullName] = useState("")
    const [employeeFormValue, setEmployeeFormValue] = useState({
        login: props.student.login,
        surname: props.student.surname,
        name: props.student.name,
        patronymic: props.student.patronymic,
        birth_year: props.student.birth_year,
        phone_number: props.student.phone_number,
        email: props.student.email,
        id_department: props.student.id_department,
        full_name: props.student.full_name
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (employee) => {
        const employeesToUpdateURL = baseURL + `${props.id}`
        axios.put(employeesToUpdateURL, { ...employeeFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        employee.preventDefault();
    }

    const handleChange = (employee) => {
        let full_name = ""
        switch (employee.target.name) {
            case "surname":
                full_name = `${employee.target.value} ${employeeFormValue.name} ${employeeFormValue.patronymic}`
                break;
            case "name":
                full_name = `${employeeFormValue.surname} ${employee.target.value} ${employeeFormValue.patronymic}`
                break;
            case "patronymic":
                full_name = `${employeeFormValue.surname} ${employeeFormValue.name} ${employee.target.value}`
                break;
            default:
                full_name = `${props.student.surname} ${props.student.name} ${props.student.patronymic}`
                break;
        }
        setEmployeeFormValue({
            ...employeeFormValue,
            [employee.target.name]: employee.target.value,
            full_name: full_name
        });
        setFullName(`${employeeFormValue.surname} ${employeeFormValue.name} ${employeeFormValue.patronymic}`)
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
                    <Modal.Title className={`${styles.form_title}`}>Редактировать данные сотрудника</Modal.Title>
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
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPhoneNumber">
                                <Form.Label className={`${styles.label}`}>Телефон</Form.Label>
                                <Form.Control defaultValue={props.student.phone_number} required autoFocus onChange={handleChange} name="phone_number" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlEmail">
                                <Form.Label className={`${styles.label}`}>E-mail</Form.Label>
                                <Form.Control defaultValue={props.student.email} required autoFocus onChange={handleChange} name="email" />
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

export default EditEmployee;