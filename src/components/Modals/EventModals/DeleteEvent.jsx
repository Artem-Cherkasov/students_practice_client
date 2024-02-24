import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './DeleteEvent.module.scss';
import axios from "axios";
import { CiTrash } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const eventsURL = 'http://localhost:5000/api/events/id_event';

const DeleteEvent = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const deleteEvent = () => {
        axios.post(eventsURL, props.eventsToDelete).then(() => refreshPage())
    }

    return (
        <>
            <Button className={`${styles.deleteButton} ${styles.button}`} onClick={() => { handleShow('md-down') }}>
                <IconContext.Provider value={{
                    size: '25px'
                }}>
                    <div>
                        <CiTrash />
                    </div>
                </IconContext.Provider>
            </Button>
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Вы действительно хотите удалить эту запись мероприятия?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={deleteEvent} className={`${styles.submit_button}`}>
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

export default DeleteEvent;
