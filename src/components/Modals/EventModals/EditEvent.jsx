import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from "./EditEvent.module.scss";
import axios from "axios";
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/events/" //createNew

const EditWindow = props => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [eventFormValue, setEventFormValue] = useState({
        title: props.data.title,
        type: props.data.type,
        year: props.data.year,
        beginning_date: props.data.beginning_date,
        ending_date: props.data.ending_date,
        description: props.data.description,
        documents_deadline: props.data.documents_deadline,
        documents_info: props.data.documents_info
    });

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleSubmit = (event) => {
        const eventToUpdateURL = baseURL + `${props.id}`
        console.log(eventToUpdateURL)
        axios.put(eventToUpdateURL, { ...eventFormValue }).then(() => refreshPage())
            .catch((error) => {
                console.log(error);
            });

        event.preventDefault();
    }

    const handleChange = (event) => {
        console.log(event)
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
                    <Modal.Title className={`${styles.form_title}`}>Изменить мероприятие проведения практики</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlTitle">
                                <Form.Label className={`${styles.label}`}>Название</Form.Label>
                                <Form.Control required autoFocus defaultValue={props.data.title} onChange={handleChange} name="title" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlType">
                                <Form.Label className={`${styles.label}`}>Тип</Form.Label>
                                <Form.Select aria-label="Type" defaultValue={props.data.type} onChange={handleChange} name="type">
                                    <option>Выберите тип практики</option>
                                    <option value="Учебная">Учебная</option>
                                    <option value="Производственная">Производственная</option>
                                    <option value="Преддипломная">Преддипломная</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlYear">
                                <Form.Label className={`${styles.label}`}>Курс</Form.Label>
                                <Form.Select aria-label="Year" defaultValue={props.data.year} onChange={handleChange} name="year">
                                    <option>Выберите курс</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlBeginningDate">
                                <Form.Label className={`${styles.label}`}>Дата начала</Form.Label>
                                <Form.Control required type="date" defaultValue={props.data.beginning_date} onChange={handleChange} name="beginning_date" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlEndingDate">
                                <Form.Label className={`${styles.label}`}>Дата окончания</Form.Label>
                                <Form.Control required type="date" defaultValue={props.data.ending_date} onChange={handleChange} name="ending_date" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlDescription">
                            <Form.Label className={`${styles.label}`}>Описание</Form.Label>
                            <Form.Control required as="textarea" rows={3} defaultValue={props.data.description} onChange={handleChange} name="description" />
                        </Form.Group>
                        <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlDocumentsDeadline">
                            <Form.Label className={`${styles.label}`}>Дата сдачи документов (необязательно)</Form.Label>
                            <Form.Control type="date" defaultValue={props.data.documents_deadline} onChange={handleChange} name="documents_deadline" />
                        </Form.Group>
                        <Form.Group className={`mb-3 ${styles.area}`} controlId="createForm.ControlDocumentsInfo">
                            <Form.Label className={`${styles.label}`}>Информация о сдаче документов (необязательно)</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={props.data.documents_info} onChange={handleChange} name="documents_info" />
                        </Form.Group>
                        <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                            Изменить
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

export default EditWindow;