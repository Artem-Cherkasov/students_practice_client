import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './AddSeveralUsers.module.scss';
import axios from "axios";
import { FaUsers } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";

const existingUsersUrl = "http://localhost:5000/api/users";
const usersURL = "http://localhost:5000/api/users/createUsers";

const AddSeveralUsers = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const [logins, setLogins] = useState([])
    const [userFormValue, setUserFormValue] = useState([]);

    useEffect(() => {
        axios.get(existingUsersUrl).then((response) => {
            setUsers(response.data);
        });
    }, []);

    useEffect(() => {
        users.map(user => {
            logins.push(user.login)
        })
    }, [logins, users]);

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

    const addUser = () => {
        handleShow('md-down')
        props.chosenStudents.map(student => {
            if (logins.indexOf(student.login) > -1) {
                userFormValue.login = ""
                return userFormValue
            }
            else {
                userFormValue.push({
                    login: student.login,
                    pwd_hash: "",
                    role: props.role
                })
            }
        })
    }

    // const [userState, setUserState] = useState(
    //     <Button disabled={props.isDisabledByEvents} className={`${styles.addUserButton} ${styles.button}`} onClick={addUser}>
    //         <IconContext.Provider value={{
    //             size: '25px'
    //         }}>
    //             <div>
    //                 <FaUsers />
    //             </div>
    //         </IconContext.Provider>
    //     </Button>
    // )

    const createUser = () => {
        axios.post(usersURL, userFormValue)

        handleClose()

        successHandleShow()

        // setUserState(
        //     <Button className={`${styles.addUserButton} ${styles.button}`} disabled={true}>
        //         <IconContext.Provider value={{
        //             size: '25px'
        //         }}>
        //             <div>
        //                 <FaUserCheck />
        //             </div>
        //         </IconContext.Provider>
        //     </Button>
        // )
    }

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <>
            {/* {userState} */}
            <Button disabled={props.isDisabledByEvents} className={`${styles.addUserButton} ${styles.button}`} onClick={addUser}>
                <IconContext.Provider value={{
                    size: '25px'
                }}>
                    <div>
                        <FaUsers />
                    </div>
                </IconContext.Provider>
            </Button>
            {props.chosenStudents.length === 0 ? (
                <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className={`${styles.modal_title}`}>Вы не выбрали ни одного пользователя</Modal.Title>
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
                            <Modal.Title className={`${styles.modal_title}`}>Вы действительно хотите добавить пользователей?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button onClick={createUser} className={`${styles.submit_button}`}>
                                Да
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Отменить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
            <Modal size="lg" show={showSuccess} fullscreen={fullscreen} onHide={() => setShowSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Пользователи добавлены</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={refreshPage} className={`${styles.submit_button}`}>
                        ОК
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default AddSeveralUsers;
