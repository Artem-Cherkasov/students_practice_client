import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./AddEvent.module.scss";
import axios from "axios";
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/events/" //createNew

const AddEvent = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [eventFormValue, setEventFormValue] = useState({
        title: "",
        type: "",
        year: "",
        beginning_date: "",
        ending_date: "",
        description: "",
        documents_deadline: null,
        documents_info: null
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (event) => {
        axios.post(baseURL, { ...eventFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    const handleChange = (event) => {
        // if(event.target.name === "beginning_date" || event.target.name === "ending_date") {
        //     const formatDate = event.target.value.split("-")
        //     console.log(formatDate)
        //     setEventFormValue({
        //         ...eventFormValue,
        //         [event.target.name]: `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
        //     });
        // }
        // else {
        setEventFormValue({
            ...eventFormValue,
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
                    <Modal.Title className={`${styles.form_title}`}>Создать мероприятие</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlTitle">
                                <Form.Label className={`${styles.label}`}>Название</Form.Label>
                                <Form.Control required autoFocus onChange={handleChange} name="title" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlType">
                                <Form.Label className={`${styles.label}`}>Тип</Form.Label>
                                <Form.Select aria-label="Type" onChange={handleChange} name="type">
                                    <option>Выберите тип практики</option>
                                    <option value="Учебная">Учебная</option>
                                    <option value="Производственная">Производственная</option>
                                    <option value="Преддипломная">Преддипломная</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlYear">
                                <Form.Label className={`${styles.label}`} >Курс</Form.Label>
                                <Form.Select aria-label="Year" onChange={handleChange} name="year">
                                    <option>Выберите курс</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlBeginningDate">
                                <Form.Label className={`${styles.label}`}>Дата начала</Form.Label>
                                <Form.Control required type="date" onChange={handleChange} name="beginning_date" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlEndingDate">
                                <Form.Label className={`${styles.label}`}>Дата окончания</Form.Label>
                                <Form.Control required type="date" onChange={handleChange} name="ending_date" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlDescription">
                            <Form.Label className={`${styles.label}`}>Описание</Form.Label>
                            <Form.Control required as="textarea" rows={3} onChange={handleChange} name="description" />
                        </Form.Group>
                        <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlDocumentsDeadline">
                            <Form.Label className={`${styles.label}`}>Дата сдачи документов (необязательно)</Form.Label>
                            <Form.Control type="date" onChange={handleChange} name="documents_deadline" />
                        </Form.Group>
                        <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlDocumentsInfo">
                            <Form.Label className={`${styles.label}`}>Информация о сдаче документов (необязательно)</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={handleChange} name="documents_info" />
                        </Form.Group>
                        <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                            Создать
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

export default AddEvent;