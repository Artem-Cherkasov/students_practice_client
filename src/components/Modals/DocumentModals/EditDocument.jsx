import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./EditDocument.module.scss";
import axios from "axios";
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/documents/" //createNew

const EditDocument = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [documentFormValue, setDocumentFormValue] = useState({
        name: props.document.name,
        type: props.document.type,
        template_file: props.document.template_file,
        sample_file: props.document.sample_file
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (event) => {
        const documentToUpdateURL = baseURL + `${props.id}`
        axios.put(documentToUpdateURL, { ...documentFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    const handleChange = (event) => {
        console.log(event)
        setDocumentFormValue({
            ...documentFormValue,
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
                    <Modal.Title className={`${styles.form_title}`}>Изменить документ практики</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlName">
                                <Form.Label className={`${styles.label}`}>Название</Form.Label>
                                <Form.Control required autoFocus defaultValue={props.document.name} onChange={handleChange} name="name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlTemplateFile">
                                <Form.Label className={`${styles.label}`}>Шаблон файла</Form.Label>
                                <Form.Control required autoFocus defaultValue={props.document.template_file} placeholder='Вставьте ссылку на файл' onChange={handleChange} name="template_file" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlSampleFile">
                                <Form.Label className={`${styles.label}`}>Пример файла</Form.Label>
                                <Form.Control required autoFocus defaultValue={props.document.sample_file} placeholder='Вставьте ссылку на файл' onChange={handleChange} name="sample_file" />
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

export default EditDocument;