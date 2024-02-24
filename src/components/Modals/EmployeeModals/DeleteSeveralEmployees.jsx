import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './DeleteEmployee.module.scss';
import axios from "axios";
import { CiTrash } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";

const employeesURL = 'http://localhost:5000/api/employees/id_employee';

const DeleteSeveralEmployee = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        console.log(props.studentsToDelete)
        setFullscreen(breakpoint);
        setShow(true);
    }

    const deleteStudent = () => {
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
            {props.employeesToDelete.length === 0 ? (
                <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className={`${styles.modal_title}`}>Вы не выделили ни одной записи</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={handleClose}className={`${styles.submit_button}`}>
                            ОК
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) :
                (
                    <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title className={`${styles.modal_title}`}>Вы действительно хотите удалить эти записи о сотрудниках?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button onClick={deleteStudent} className={`${styles.submit_button}`}>
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

export default DeleteSeveralEmployee;
