import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from './AddUser.module.scss';
import axios from "axios";
import { FaUserPlus } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";

const getUsersURL = "http://localhost:5000/api/users";
const postUsersURL = "http://localhost:5000/api/users/createUser";

const AddUser = props => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const [logins, setLogins] = useState([])
    const [userFormValue, setUserFormValue] = useState({
        login: "",
        pwd_hash: "",
        role: "",
    });

    useEffect(() => {
        axios.get(getUsersURL).then((response) => {
            setUsers(response.data);
        });
    }, []);

    useEffect(() => {
        users.map(user => {
            logins.push(user.login)
        })
        if(logins.indexOf(props.info.login) > -1) {
            setUserState(
                <Button className={`${styles.addUserButton} ${styles.button}`} disabled={true}>
                    <IconContext.Provider value={{
                        size: '25px'
                    }}>
                        <div>
                            <FaUserCheck />
                        </div>
                    </IconContext.Provider>
                </Button>
            )
        }
    }, [logins, props.info.login, users]);

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
        setUserFormValue({
            ...userFormValue,
            login: props.info.login,
            pwd_hash: "",
            role: props.role,
        });
    }

    const [userState, setUserState] = useState(
        <Button className={`${styles.addUserButton} ${styles.button}`} onClick={addUser}>
            <IconContext.Provider value={{
                size: '25px'
            }}>
                <div>
                    <FaUserPlus />
                </div>
            </IconContext.Provider>
        </Button>
    )

    const createUser = () => {
        axios.post(postUsersURL, { ...userFormValue })
            .catch((error) => {
                console.log(error);
            });
        setUserState(
            <Button className={`${styles.addUserButton} ${styles.button}`} disabled={true}>
                <IconContext.Provider value={{
                    size: '25px'
                }}>
                    <div>
                        <FaUserCheck />
                    </div>
                </IconContext.Provider>
            </Button>
        )

        handleClose()

        successHandleShow()
    }

    return (
        <>
            {userState}
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Вы действительно добавить пользователя?</Modal.Title>
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
            <Modal size="lg" show={showSuccess} fullscreen={fullscreen} onHide={() => setShowSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Пользователи добавлены</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={successHandleClose} className={`${styles.submit_button}`}>
                        ОК
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default AddUser;
