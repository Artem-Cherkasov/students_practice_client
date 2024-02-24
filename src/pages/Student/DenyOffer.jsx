import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './OfferActions.module.scss';
import axios from "axios";
import { RxCross2 } from 'react-icons/rx';
import { IconContext } from "react-icons/lib";

const offersURL = 'http://localhost:5000/api/offers/accept/';

const DenyOffer = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [acceptFormValue, setAcceptFormValue] = useState({
        accepted: null
    })

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const confirmDeny = () => {
        setAcceptFormValue({
            ...acceptFormValue,
            accepted: false
        });
        handleShow('md-down')
    }

    const denyOffer = () => {
        axios.put(offersURL + props.offer.id_company_chose_student, {...acceptFormValue})
        refreshPage()
    }

    return (
        <>
            <Button className={`${styles.denyButton} ${styles.button}`} onClick={confirmDeny}>
                <IconContext.Provider value={{
                    size: '30px',
                }}>
                    <div>
                        <RxCross2 />
                    </div>
                </IconContext.Provider>
            </Button>
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Отклонить приглашение?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={denyOffer} className={`${styles.submit_button}`}>
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

export default DenyOffer;
