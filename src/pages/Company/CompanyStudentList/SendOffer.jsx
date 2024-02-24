import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from './SendOffer.module.scss';
import axios from "axios";
import { RiMailAddLine } from 'react-icons/ri';
import { RiMailCheckLine } from 'react-icons/ri';
import { IconContext } from "react-icons/lib";

const getOffersURL = "http://localhost:5000/api/offers";
const postOffersURL = "http://localhost:5000/api/offers/offer";
const getTrainingTypesURL = 'http://localhost:5000/api/trainingTypes/trainingTypesByCompany/';

const SendOffer = props => {
    const info = JSON.parse(localStorage.getItem("user_info"))

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [offers, setOffers] = useState([]);
    const [trainingTypes, setTrainingTypes] = useState([]);
    const [students, setStudents] = useState([])
    const [offerFormValue, setOfferFormValue] = useState({
        id_company: info.id_company,
        company_name: info.name,
        id_student: props.student.id_student,
        id_training_type: "",
        event_title: "",
        type_of_development: "",
        accepted: null,
    });

    useEffect(() => {
        axios.get(getTrainingTypesURL + info.id_company).then((response) => {
            setTrainingTypes(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(getOffersURL).then((response) => {
            setOffers(response.data);
        });
    }, []);

    useEffect(() => {
        offers.map(offer => {
            if (offer.id_company === info.id_company) {
                students.push(offer.id_student)
            }
        })
        if (students.indexOf(props.student.id_student) > -1) {
            setOfferState(
                <Button className={`${styles.addUserButton} ${styles.button}`} disabled={true}>
                    <IconContext.Provider value={{
                        size: '25px'
                    }}>
                        <div>
                            <RiMailCheckLine />
                        </div>
                    </IconContext.Provider>
                </Button>
            )
        }
    }, [students, offers, props.student.id_student, info.id_company]);

    const handleClose = () => setShow(false);
    const handleShow = (breakpoint) => {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const successHandleClose = () => setShowSuccess(false);
    const successHandleShow = (breakpoint) => {
        setFullscreen(breakpoint);
        setShowSuccess(true);
    }

    const errHandleClose = () => setShowErr(false);
    const errHandleShow = (breakpoint) => {
        setFullscreen(breakpoint);
        setShowErr(true);
    }

    const addOffer = () => {
        handleShow('md-down')
        setOfferFormValue({
            ...offerFormValue,
            id_company: info.id_company,
            company_name: info.name,
            event_title: props.eventTitle,
            type_of_development: "",
            id_student: props.student.id_student,
            id_training_type: "",
        });
    }

    const handleChangeTrainingType = (e) => {
        trainingTypes.filter(item => item.id_training_type === e.target.value)
        setOfferFormValue({
            ...offerFormValue,
            [e.target.name]: e.target.value,
            type_of_development: trainingTypes[0].name
        });
    }
    
    const [offerState, setOfferState] = useState(
        <Button className={`${styles.addUserButton} ${styles.button}`} onClick={addOffer}>
            <IconContext.Provider value={{
                size: '25px'
            }}>
                <div>
                    <RiMailAddLine />
                </div>
            </IconContext.Provider>
        </Button>
    )

    const sendOffer = () => {
        axios.post(postOffersURL, { ...offerFormValue })
            .catch((error) => {
                console.log(error);
            });
        setOfferState(
            <Button className={`${styles.addUserButton} ${styles.button}`} disabled={true}>
                <IconContext.Provider value={{
                    size: '25px'
                }}>
                    <div>
                        <RiMailCheckLine />
                    </div>
                </IconContext.Provider>
            </Button>
        )

        handleClose()

        successHandleShow()
    }

    return (
        <>
            {offerState}
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Приглашение на практику</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select onChange={handleChangeTrainingType} name="id_training_type">
                        <option value={props.student.id_event}>Выберите направление</option>
                        {trainingTypes.map((training_type, index) => <option key={index} value={training_type.id_training_type} label={`${training_type.name} : ${training_type.places_total} мест`} />)}
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={sendOffer} className={`${styles.submit_button}`}>
                        Отправить
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Отменить
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={showSuccess} fullscreen={fullscreen} onHide={() => setShowSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Приглашение отправлено</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={successHandleClose} className={`${styles.submit_button}`}>
                        ОК
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={showErr} fullscreen={fullscreen} onHide={() => setShowErr(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Вы не учавствуете ни в одной практике</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className={`${styles.err_message}`}>Пожалуйста, отправьте заявку на участие в практике.</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={errHandleClose} className={`${styles.submit_button}`}>
                        ОК
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default SendOffer;
