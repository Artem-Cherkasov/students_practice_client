import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./AddCompany.module.scss";
import axios from "axios";
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/companies/" //createNew

const AddCompany = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [companyFormValue, setCompanyFormValue] = useState({
        login: "",
        name: "",
        description: "",
        hr_name: "",
        hr_phone_number: "",
        hr_email: ""
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (event) => {
        axios.post(baseURL, { ...companyFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    const handleChange = (event) => {
        setCompanyFormValue({
            ...companyFormValue,
            [event.target.name]: event.target.value,
            login: companyFormValue.hr_email,
        });
    }

    const [validated, setValidated] = useState(false);

    const checkValidation = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <>
            <Button key={0} className={`${styles.addButton_events}`} onClick={() => handleShow('md-down')}>
                <IconContext.Provider value={{
                    size: '24px'
                }}>
                    <div>
                        <AiOutlinePlus />
                    </div>
                </IconContext.Provider>
                <span className={`${styles.addButton_text}`}>Добавить</span>
            </Button>
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.form_title}`}>Добавить компанию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlLogin">
                                <Form.Label className={`${styles.label}`}>Логин</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="login" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlName">
                                <Form.Label className={`${styles.label}`}>Название</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlHRName">
                                <Form.Label className={`${styles.label}`}>Имя HR</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="hr_name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlHRPhoneNumber">
                                <Form.Label className={`${styles.label}`}>Телефон HR</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="hr_phone_number" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlHREmail">
                                <Form.Label className={`${styles.label}`}>E-mail HR</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="hr_email" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlDescription">
                                <Form.Label className={`${styles.label}`}>Описание</Form.Label>
                                <Form.Control required as="textarea" rows={3} onChange={handleChange} name="description" />
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

export default AddCompany;