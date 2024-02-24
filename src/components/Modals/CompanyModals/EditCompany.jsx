import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./EditCompany.module.scss";
import axios from "axios";
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/companies/" //createNew

const EditWindow = props => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [companyFormValue, setCompanyFormValue] = useState({
        login: props.company.login,
        name: props.company.name,
        description: "",
        hr_name: props.company.hr_name,
        hr_phone_number: props.company.hr_phone_number,
        hr_email: props.company.hr_email
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (company) => {
        const companyToUpdateURL = baseURL + `${props.company.id}`
        axios.put(companyToUpdateURL, { ...setCompanyFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        company.preventDefault();
    }

    const handleChange = (event) => {
        setCompanyFormValue({
            ...companyFormValue,
            [event.target.name]: event.target.value
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
            <Button className={`${styles.redactButton} ${styles.button}`} onClick={() => { handleShow('md-down') }}>
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
                    <Modal.Title className={`${styles.form_title}`}>Изменить данные компании</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlName">
                                <Form.Label className={`${styles.label}`}>Название</Form.Label>
                                <Form.Control defaultValue={props.company.name} required autoFocus onChange={handleChange} name="name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlHRName">
                                <Form.Label className={`${styles.label}`}>Имя HR</Form.Label>
                                <Form.Control defaultValue={props.company.hr_name} required autoFocus onChange={handleChange} name="hr_name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlHRPhoneNumber">
                                <Form.Label className={`${styles.label}`}>Телефон HR</Form.Label>
                                <Form.Control defaultValue={props.company.hr_phone_number} required autoFocus onChange={handleChange} name="hr_phone_number" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlHREmail">
                                <Form.Label className={`${styles.label}`}>E-mail HR</Form.Label>
                                <Form.Control defaultValue={props.company.hr_email} required autoFocus onChange={handleChange} name="hr_email" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlDescription">
                                <Form.Label className={`${styles.label}`}>Описание</Form.Label>
                                <Form.Control defaultValue={props.company.description} required as="textarea" rows={3} onChange={handleChange} name="description" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form_button}`}>
                            <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                                Изменить
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

export default EditWindow;