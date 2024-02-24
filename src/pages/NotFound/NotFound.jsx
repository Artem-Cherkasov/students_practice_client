import React from 'react';
import styles from './NotFound.module.scss'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate()

    const getBack = () => {
        localStorage.clear()
        navigate("/auth/auth_form")
    }

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Что-то пошло не так...</span>
                </div>
            </div>
            <div className={`${styles.button_wrapper}`}>
                <Button className={`${styles.back}`} onClick={getBack}>Главная</Button>
            </div>
        </div>
    );
};

export default NotFound;