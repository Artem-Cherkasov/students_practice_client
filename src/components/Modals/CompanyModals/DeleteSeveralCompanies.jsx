import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './DeleteCompany.module.scss';
import axios from "axios";
import { CiTrash } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const companiesURL = 'http://localhost:5000/api/companies/id_company';

const DeleteSeveralEvent = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const deleteCompany = () => {
        axios.post(companiesURL, props.companiesToDelete).then(() => refreshPage())
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
            {props.companiesToDelete.length === 0 ? (
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
                            <Modal.Title className={`${styles.modal_title}`}>Вы действительно хотите удалить эти компании?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button onClick={deleteCompany} className={`${styles.submit_button}`}>
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

export default DeleteSeveralEvent;
