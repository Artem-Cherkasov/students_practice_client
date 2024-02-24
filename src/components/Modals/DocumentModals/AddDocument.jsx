import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./AddDocument.module.scss";
import axios from "axios";
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/documents/" //createNew

const AddDocument = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    // const [files, setFiles] = useState([])
    const [documentFormValue, setDocumentFormValue] = useState({
        name: "",
        type: "",
        template_file: "",
        sample_file: ""
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (event) => {
        axios.post(baseURL, { ...documentFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    const handleChange = (event) => {
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

    // const addFile = () => {
    //     setFiles(
    //         files => [
    //             ...files,
    //             <Form.Group className={`${styles.form_added}`}>
    //                 <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlName">
    //                     <Form.Label className={`${styles.label}`}>Название</Form.Label>
    //                     <Form.Control required autoFocus onChange={handleChange} name="name" />
    //                 </Form.Group>
    //                 <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlTemplateFile">
    //                     <Form.Label className={`${styles.label}`}>Шаблон файла</Form.Label>
    //                     <Form.Control required autoFocus onChange={handleChange} name="template_file" />
    //                 </Form.Group>
    //                 <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlsampleFile">
    //                     <Form.Label className={`${styles.label}`}>Пример файла</Form.Label>
    //                     <Form.Control required autoFocus onChange={handleChange} name="sample_file" />
    //                 </Form.Group>
    //                 <Button key={0} className={`${styles.deleteButton_file}`} onClick={deletefile}>
    //                     <div className={`${styles.close}`}></div>
    //                 </Button>
    //             </Form.Group>
    //         ]
    //     )
    // }

    // const deletefile = () => {
    //     setFiles(...files, [])
    // }

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
                    <Modal.Title className={`${styles.form_title}`}>Добавить документы практики</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Button key={0} className={`${styles.addButton_file}`} onClick={addFile}>
                        <IconContext.Provider value={{
                            size: '30px'
                        }}>
                            <div>
                                <AiOutlinePlus />
                            </div>
                        </IconContext.Provider>
                    </Button> */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlName">
                                <Form.Label className={`${styles.label}`}>Название</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlTemplateFile">
                                <Form.Label className={`${styles.label}`}>Шаблон файла</Form.Label>
                                <Form.Control required autoFocus placeholder='Вставьте ссылку на файл' onChange={handleChange} name="template_file" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlSampleFile">
                                <Form.Label className={`${styles.label}`}>Пример файла</Form.Label>
                                <Form.Control required autoFocus placeholder='Вставьте ссылку на файл' onChange={handleChange} name="sample_file" />
                            </Form.Group>
                            {/* <Button key={0} disabled={true} className={`${styles.deleteButton_file}`} onClick={deletefile}>
                                <div className={`${styles.close}`}></div>
                            </Button> */}
                            {/* {files} */}
                        </Form.Group>
                        <Form.Group className={`${styles.form_button}`}>
                            <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                                Добавить
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

export default AddDocument;