import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./CompanyInfo.module.scss";
import axios from "axios";
import { AiOutlineUser } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";
import { ModalBody } from 'react-bootstrap';

const companiesURL = 'http://localhost:5000/api/companies/profile/';

const CompanyInfo = props => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [company, setCompany] = useState({})

    useEffect(() => {
        axios.get(companiesURL + props.company.id_company).then(response => { setCompany(response.data) })
    }, []);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <>
            <Button className={`${styles.addUserButton} ${styles.button}`} onClick={() => handleShow('md-down')}>
                <IconContext.Provider value={{
                    size: '25px'
                }}>
                    <div>
                        <AiOutlineUser>
                        </AiOutlineUser>
                    </div>
                </IconContext.Provider>
            </Button>
            <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.form_title}`}>Информация о компании</Modal.Title>
                </Modal.Header> 
                <Modal.Body>
                    <div className={`${styles.profile_wrapper}`}>
                        <div className={`${styles.main_content}`}>
                            <div className={`${styles.student_info}`}>
                                <div className={`${styles.info_wrapper}`}>
                                    <div className={`${styles.fields}`}>
                                        <div className={`${styles.item_wrapper}`}>
                                            <span className={`${styles.item_title}`}>Название</span>
                                            <span className={`${styles.item_text}`}>{company.name}</span>
                                        </div>
                                        <div className={`${styles.item_wrapper}`}>
                                            <span className={`${styles.item_title}`}>Телефон HR-a</span>
                                            <span className={`${styles.item_text}`}>{company.hr_phone_number}</span>
                                        </div>
                                        <div className={`${styles.item_wrapper}`}>
                                            <span className={`${styles.item_title}`}>E-mail HR-a</span>
                                            <span className={`${styles.item_text}`}>{company.hr_email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.about}`}>
                                <span className={`${styles.about_title}`}>Описание</span>
                                <span className={`${styles.about_text}`}>{company.description}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>       
            </Modal>
            
        </>
    );
}

export default CompanyInfo;