import React, { useEffect, useState } from 'react';
import styles from './StudentProfile.module.scss'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Modal, Nav } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { CiEdit } from 'react-icons/ci';
import { TfiUpload } from 'react-icons/tfi';
import { IconContext } from "react-icons/lib";
import ImageUploading from "react-images-uploading";
import default_photo from "../../images/default_photo.png"

const baseURL = 'http://localhost:5000/api/students/profile/';
const maxFileSize = 100000;

const EditProfile = () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [student, setStudent] = useState({})
    const [images, setImages] = useState();
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setStudent({
            ...student,
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
        axios.get(baseURL + info.id_student).then(response => { setStudent(response.data) })
    }, []);

    const handleChange = (student_to_edit) => {
        setStudent({
            ...student,
            [student_to_edit.target.name]: student_to_edit.target.value
        });
        console.log(student)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const studentToUpdateURL = baseURL + `${student.id_student}`
        axios.put(studentToUpdateURL, { ...student })
            .catch((error) => {
                console.log(error);
            });
    }

    const [validated, setValidated] = useState(false);

    const checkValidation = (student) => {
        const form = student.currentTarget;
        if (form.checkValidity() === false) {
            student.preventDefault();
            student.stopPropagation();
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
                <Form className={`${styles.edit_student_info}`} noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className={`${styles.photo_wrapper}`}>
                        {student.photo === null ? (
                            <img alt="profile_photo" src={default_photo} className={`${styles.photo}`}></img>
                        ) : (
                            <img alt="profile_photo" src={student.photo} className={`${styles.photo}`}></img>
                        )}
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
                        <Button type="submit" variant="primary" key={0} className={`${styles.saveButton_students}`} onClick={() => { handleShow('md-down') }}>
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
                                    <Nav.Link href='/student/profile' className={styles.nav_link}>
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
                                <span className={`${styles.item_text}`}>{student.full_name}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Год рождения</span>
                                <span className={`${styles.item_text}`}>{student.birth_year}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Группа</span>
                                <span className={`${styles.item_text}`}>{student.group}</span>
                            </div>
                        </Form.Group>
                        <Form.Group className={`${styles.fields}`}>
                            <Form.Group className={`${styles.item_wrapper}`}>
                                <Form.Label className={`${styles.item_title}`}>Телефон</Form.Label>
                                <Form.Control defaultValue={student.phone_number} required autoFocus onChange={handleChange} name="phone_number" />
                            </Form.Group>
                            <Form.Group className={`${styles.item_wrapper}`}>
                                <Form.Label className={`${styles.item_title}`}>Электронная почта</Form.Label>
                                <Form.Control defaultValue={student.email} required autoFocus onChange={handleChange} name="email" />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className={`${styles.about}`}>
                            <Form.Group className={`${styles.text_area}`}>
                                <Form.Label className={`${styles.item_title}`}>Навыки</Form.Label>
                                <Form.Control as="textarea" rows={3} defaultValue={student.skills} required autoFocus onChange={handleChange} name="skills" />
                            </Form.Group>
                            <Form.Group className={`${styles.text_area}`}>
                                <Form.Label className={`${styles.item_title}`}>Достижения</Form.Label>
                                <Form.Control as="textarea" rows={3} defaultValue={student.achievements} required autoFocus onChange={handleChange} name="achievements" />
                            </Form.Group>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default EditProfile;