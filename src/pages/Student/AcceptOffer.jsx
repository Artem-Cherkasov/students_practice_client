import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './OfferActions.module.scss';
import axios from "axios";
import { RxCheck } from 'react-icons/rx';
import { IconContext } from "react-icons/lib";

const offersURL = 'http://localhost:5000/api/offers/accept/';
const trainingTypeURL = 'http://localhost:5000/api/trainingTypes/getOneTrainingType/';
const changePlacesTypeURL = 'http://localhost:5000/api/trainingTypes/addStudent/';

const AcceptOffer = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [acceptFormValue, setAcceptFormValue] = useState({
        accepted: null
    });
    const [trainingType, setTrainingType] = useState();

    const handleClose = () => {
        setShow(false);
        setTrainingType()
    };
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const confirmAccept = () => {
        setAcceptFormValue({
            ...acceptFormValue,
            accepted: true
        });
        axios.get(trainingTypeURL + props.offer.id_training_type).then(response => setTrainingType(response.data))
        handleShow('md-down')
    }

    const acceptOffer = () => {
        axios.put(changePlacesTypeURL + props.offer.id_training_type, {places_taken: trainingType.places_taken + 1})
        axios.put(offersURL + props.offer.id_company_chose_student, {...acceptFormValue})
        refreshPage()
    }

    return (
        <>
            <Button className={`${styles.accept_button} ${styles.button}`} onClick={confirmAccept}>
                <IconContext.Provider value={{
                    size: '35px',
                }}>
                    <div>
                        <RxCheck />
                    </div>
                </IconContext.Provider>
            </Button>
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => {
                setShow(false);
                setTrainingType()
            }}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Принять приглашение?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={acceptOffer} className={`${styles.submit_button}`}>
                        Да
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Отменить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default AcceptOffer;
