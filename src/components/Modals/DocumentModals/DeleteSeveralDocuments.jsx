import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './DeleteDocument.module.scss';
import axios from "axios";
import { CiTrash } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const documentsURL = 'http://localhost:5000/api/documents/';

const DeleteSeveralDocument = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const deleteEvent = () => {
        props.documentsToDelete.map((id) => {
            axios.post(documentsURL + `${id}`).then((response) => {
                console.log(response.data);
            }).then(() => refreshPage());
        })
    }

    const refreshPage = () => {
        window.location.reload();
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
            {props.documentsToDelete.length === 0 ? (
                <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className={`${styles.modal_title}`}>Вы не выделили ни одной записи</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={handleClose} className={`${styles.submit_button}`}>
                            ОК
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) :
                (
                    <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title className={`${styles.modal_title}`}>Вы действительно хотите удалить эти документы?</Modal.Title>
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
                )
            }
        </>
    )
};

export default DeleteSeveralDocument;
