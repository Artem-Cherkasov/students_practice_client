import React, { useEffect, useState } from 'react';
import styles from './CompanyProfile.module.scss'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Modal, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { CiEdit } from 'react-icons/ci';
import { TfiUpload } from 'react-icons/tfi';
import { IconContext } from "react-icons/lib";
import ImageUploading from "react-images-uploading";

const baseURL = 'http://localhost:5000/api/companies/profile/';
// const maxFileSize = 100000;

const EditCompanyProfile = () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [company, setCompany] = useState({})
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    useEffect(() => {
        axios.get(baseURL + info.id_company).then(response => { setCompany(response.data) })
    }, []);

    const handleChange = (company_to_edit) => {
        setCompany({
            ...company,
            [company_to_edit.target.name]: company_to_edit.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const companyToUpdateURL = baseURL + `${company.id_company}`
        axios.put(companyToUpdateURL, { ...company })
            .catch((error) => {
                console.log(error);
            });
    }

    const [validated, setValidated] = useState(false);

    const checkValidation = (company) => {
        const form = company.currentTarget;
        if (form.checkValidity() === false) {
            company.preventDefault();
            company.stopPropagation();
        }

        setValidated(true);
    };

    const clearInput = (e) => {
        e.target.value = "";
    }

    return (
        <div className={`${styles.profile_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.profile_header}`}>
                    <span className={`${styles.title}`}>Редактирование профиля</span>
                </div>
                <Form className={`${styles.edit_employee_info}`} noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className={`${styles.photo_wrapper}`}>
                        <Button type="submit" variant="primary" key={0} className={`${styles.saveButton_employees}`} onClick={() => { handleShow('md-down') }}>
                            <IconContext.Provider value={{
                                size: '24px'
                            }}>
                                <div>
                                    <CiEdit />
                                </div>
                            </IconContext.Provider>
                            <span className={`${styles.addButton_text}`}>Сохранить</span>
                        </Button>
                        <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title className={`${styles.modal_title}`}>Профиль изменен</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Nav className={styles.nav}>
                                    <Nav.Link href='/company/profile' className={styles.nav_link}>
                                        <Button className={`${styles.submit_button}`}>
                                            Ок
                                        </Button>
                                    </Nav.Link>
                                </Nav>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <Form.Group className={`${styles.info_wrapper}`}>
                        <Form.Group className={`${styles.fields}`}>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Название</span>
                                <span className={`${styles.item_text}`}>{company.name}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Имя HR'а</span>
                                <span className={`${styles.item_text}`}>{company.hr_name}</span>
                            </div>
                        </Form.Group>
                        <Form.Group className={`${styles.fields}`}>
                            <Form.Group className={`${styles.item_wrapper}`}>
                                <Form.Label className={`${styles.item_title}`}>Телефон</Form.Label>
                                <Form.Control defaultValue={company.hr_phone_number} required autoFocus onChange={handleChange} name="hr_phone_number" />
                            </Form.Group>
                            <Form.Group className={`${styles.item_wrapper}`}>
                                <Form.Label className={`${styles.item_title}`}>Электронная почта</Form.Label>
                                <Form.Control defaultValue={company.hr_email} required autoFocus onChange={handleChange} name="hr_email" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.about}`}>
                            <Form.Group className={`${styles.text_area}`}>
                                <Form.Label className={`${styles.item_title}`}>Описание</Form.Label>
                                <Form.Control as="textarea" rows={3} defaultValue={company.description} required autoFocus onChange={handleChange} name="description" />
                            </Form.Group>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default EditCompanyProfile;