import React, { useState, useEffect } from 'react';
import styles from './EventSubscribe.module.scss';
import axios from 'axios';
import { Modal, Button, Form } from "react-bootstrap";
import { BiListPlus } from 'react-icons/bi';
import { BiListCheck } from 'react-icons/bi';
import { IconContext } from "react-icons/lib";

const setDataURL = 'http://localhost:5000/api/trainingTypes/register';
const getDataURL = 'http://localhost:5000/api/trainingTypes/';

const EventSubscribe = props => {
    const info = JSON.parse(localStorage.getItem("user_info"))

    const [fullscreen, setFullscreen] = useState(true);
    const [showFile, setShowFile] = useState(false);
    const [records, setRecords] = useState([])
    const [recordIds, setRecordsIds] = useState([])
    const [participationFormValue, setParticipationFormValue] = useState({
        id_company: info.id_company,
        id_event: props.data.id_event,
        name: "",
        places_taken: "0",
        places_total: "0"
    });

    useEffect(() => {
        axios.get(getDataURL).then((response) => {
            setRecords(response.data);
        });
    }, []);

    useEffect(() => {
        records.map(record => {
            if (record.id_company === info.id_company) {
                recordIds.push(record.id_event)
            }
        })
        if(recordIds.indexOf(props.data.id_event) > -1) {
            setButtonState(
                <Button className={`${styles.show_downloaded}`} onClick={() => handleShow()}>
                    <IconContext.Provider value={{
                        size: '25px'
                    }}>
                        <div>
                            <BiListCheck />
                        </div>
                    </IconContext.Provider>
                </Button>
            )
        }
    }, [info.id_company, props.data.id_event, recordIds, records]);

    const [buttonState, setButtonState] = useState(
        <Button className={`${styles.show_downloaded}`} onClick={() => handleShow()}>
            <IconContext.Provider value={{
                size: '25px'
            }}>
                <div>
                    <BiListPlus />
                </div>
            </IconContext.Provider>
        </Button>
    )

    const handleClose = () => setShowFile(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShowFile(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(participationFormValue)
        axios.post(setDataURL, participationFormValue)
        refreshPage()
    }

    const handleChange = (participation) => {
        setParticipationFormValue({
            ...participationFormValue,
            [participation.target.name]: participation.target.value,
        });
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
            {buttonState}
            <Modal size="lg" show={showFile} fullscreen={fullscreen} onHide={() => setShowFile(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Запись на мероприятие</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.form}`}>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlDirection">
                                <Form.Label className={`${styles.label}`}>Направление практики</Form.Label>
                                <Form.Control required onChange={handleChange} autoFocus name="name" />
                            </Form.Group>
                            <Form.Group className={`mb-3 ${styles.input}`} controlId="createForm.ControlPlaces">
                                <Form.Label className={`${styles.label}`}>Кол-во мест</Form.Label>
                                <Form.Control required onChange={handleChange} autoFocus name="places_total" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.form_button}`}>
                            <Button type="submit" variant="primary" className={`${styles.submit_button}`}>
                                Записаться
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} className={`${styles.submit_button}`}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
};

export default EventSubscribe;