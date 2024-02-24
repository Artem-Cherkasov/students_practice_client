import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './DeleteEmployee.module.scss';
import axios from "axios";
import { CiTrash } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const employeesURL = 'http://localhost:5000/api/employees/id_employee';
const usersURL = 'http://localhost:5000/api/users';

const DeleteEmployee = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const deleteEmployee = () => {
        axios.post(employeesURL, props.employeesToDelete).then(() => refreshPage())
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
                    <Modal.Title className={`${styles.modal_title}`}>Вы действительно хотите удалить эту запись о сотруднике?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={deleteEmployee} className={`${styles.submit_button}`}>
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

export default DeleteEmployee;
