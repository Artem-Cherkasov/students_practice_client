import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './DeleteDocumentUpload.module.scss';
import axios from "axios";
import { CiTrash } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const documentsURL = 'http://localhost:5000/api/documentUpload/id_document_upload';

const DeleteDocumentUpload = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const deleteDocument = () => {
        axios.post(documentsURL, props.documentsToDelete).then(() => refreshPage())
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
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Вы действительно хотите удалить этот документ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={deleteDocument} className={`${styles.submit_button}`}>
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

export default DeleteDocumentUpload;
