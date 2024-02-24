import React, { useEffect, useState } from 'react';
import styles from './EmployeeProfile.module.scss'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Modal, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { CiEdit } from 'react-icons/ci';
import { TfiUpload } from 'react-icons/tfi';
import { IconContext } from "react-icons/lib";
import ImageUploading from "react-images-uploading";

const baseURL = 'http://localhost:5000/api/employees/profile/';
const maxFileSize = 100000;

const EditEmployeeProfile = () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [employee, setEmployee] = useState({})
    const [images, setImages] = useState();
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setEmployee({
            ...employee,
            photo: imageList[0].data_url
        });
    };

    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    useEffect(() => {
        axios.get(baseURL + info.id_employee).then(response => { setEmployee(response.data) })
    }, []);

    const handleChange = (employee_to_edit) => {
        setEmployee({
            ...employee,
            [employee_to_edit.target.name]: employee_to_edit.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const employeeToUpdateURL = baseURL + `${employee.id_employee}`
        axios.put(employeeToUpdateURL, { ...employee })
            .catch((error) => {
                console.log(error);
            });
    }

    const [validated, setValidated] = useState(false);

    const checkValidation = (employee) => {
        const form = employee.currentTarget;
        if (form.checkValidity() === false) {
            employee.preventDefault();
            employee.stopPropagation();
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
                        <img alt="profile_photo" src={employee.photo} className={`${styles.photo}`}></img>
                        <ImageUploading
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["jpg", "png", "jpeg"]}
                            maxFileSize={maxFileSize}
                        >
                            {({
                                onImageUpdate,
                                isDragging,
                                dragProps,
                                errors
                            }) => (
                                <div className={`${styles.upload_image}`}>
                                    <Button
                                        className={`${styles.addButton_photo}`}
                                        onClick={onImageUpdate}
                                        {...dragProps}
                                    >
                                        <IconContext.Provider value={{
                                            size: '20px'
                                        }}>
                                            <div>
                                                <TfiUpload />
                                            </div>
                                        </IconContext.Provider>
                                        <span className={`${styles.addButton_text}`}>Загрузить фото</span>
                                    </Button>
                                    {errors && <div className={`${styles.error_message_wrapper}`}>
                                        {errors.acceptType && "Недопустимый тип файла"}
                                        {errors.maxFileSize && "Файл слишком большой"}
                                    </div>}
                                </div>
                            )}
                        </ImageUploading>
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
                                    <Nav.Link href='/employee/profile' className={styles.nav_link}>
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
                                <span className={`${styles.item_title}`}>ФИО</span>
                                <span className={`${styles.item_text}`}>{employee.full_name}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Год рождения</span>
                                <span className={`${styles.item_text}`}>{employee.birth_year}</span>
                            </div>
                        </Form.Group>
                        <Form.Group className={`${styles.fields}`}>
                            <Form.Group className={`${styles.item_wrapper}`}>
                                <Form.Label className={`${styles.item_title}`}>Телефон</Form.Label>
                                <Form.Control defaultValue={employee.phone_number} required autoFocus onChange={handleChange} name="phone_number" />
                            </Form.Group>
                            <Form.Group className={`${styles.item_wrapper}`}>
                                <Form.Label className={`${styles.item_title}`}>Электронная почта</Form.Label>
                                <Form.Control defaultValue={employee.email} required autoFocus onChange={handleChange} name="email" />
                            </Form.Group>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default EditEmployeeProfile;