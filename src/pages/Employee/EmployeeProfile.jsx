import React, { useEffect, useState } from 'react';
import styles from './EmployeeProfile.module.scss'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";
import { Nav } from 'react-bootstrap';
import default_photo from "../../images/default_photo.png"

const employeesURL = 'http://localhost:5000/api/employees/profile/';

const EmployeeProfile = () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        axios.get(employeesURL + info.id_employee).then(response => { setEmployee(response.data) })
    }, []);

    for (const key in employee) {
        const val = employee[key];

        if (key !== "photo") {
            if (val === null || val === "") {
                employee[key] = "-";
            }
        }
    }

    return (
        <div className={`${styles.profile_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.profile_header}`}>
                    <span className={`${styles.title}`}>Профиль</span>
                    <Nav className={styles.nav}>
                        <Nav.Link href='/employee/edit_profile' className={styles.nav_link}>
                            <Button key={0} className={`${styles.editButton_students}`}>
                                <IconContext.Provider value={{
                                    size: '24px'
                                }}>
                                    <div>
                                        <CiEdit />
                                    </div>
                                </IconContext.Provider>
                                <span className={`${styles.addButton_text}`}>Редактировать профиль</span>
                            </Button>
                        </Nav.Link>
                    </Nav>
                </div>
                <div className={`${styles.employee_info}`}>
                    <div className={`${styles.photo_wrapper}`}>
                    {employee.photo === null ? (
                            <img alt="profile_photo" src={default_photo} className={`${styles.photo}`}></img>
                        ) : (
                            <img alt="profile_photo" src={employee.photo} className={`${styles.photo}`}></img>
                        )}
                    </div>
                    <div className={`${styles.info_wrapper}`}>
                        <div className={`${styles.fields}`}>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>ФИО</span>
                                <span className={`${styles.item_text}`}>{employee.full_name}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Год рождения</span>
                                <span className={`${styles.item_text}`}>{employee.birth_year}</span>
                            </div>
                        </div>
                        <div className={`${styles.fields}`}>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Телефон</span>
                                <span className={`${styles.item_text}`}>{employee.phone_number}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Электронная почта</span>
                                <span className={`${styles.item_text}`}>{employee.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;