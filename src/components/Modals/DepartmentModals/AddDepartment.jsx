import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./AddDepartment.module.scss";
import axios from "axios";
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/departments/" //createNew

const AddDepartment = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [departmentFormValue, setEventFormValue] = useState({
        title: "",
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (event) => {
        axios.post(baseURL, { ...departmentFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    const handleChange = (event) => {
        setEventFormValue({
            ...departmentFormValue,
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
                    <Modal.Title className={`${styles.form_title}`}>Создать кафедру</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlTitle">
                                <Form.Label className={`${styles.label}`}>Название</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="title" />
                            </Form.Group>
                        </Form.Group>
                        <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                            Добавить
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

export default AddDepartment;