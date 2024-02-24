import React, { useEffect, useState } from 'react';
import styles from './AdminProfile.module.scss'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";
import { Nav } from 'react-bootstrap';

const adminsURL = 'http://localhost:5000/api/admins/';

const AdminProfile = () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [admin, setAdmin] = useState({})

    useEffect(() => {
        axios.get(adminsURL + info.id_admin).then(response => { setAdmin(response.data) })
    }, []);

    // for (const key in admin) {
    //     const val = admin[key];

    //     if (key !== "photo") {
    //         if (val === null || val === "") {
    //             admin[key] = "-";
    //         }
    //     }
    // }

    return (
        <div className={`${styles.profile_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.profile_header}`}>
                    <span className={`${styles.title}`}>Профиль</span>
                    {/* <Nav className={styles.nav}>
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
                    </Nav> */}
                </div>
                <div className={`${styles.employee_info}`}>
                    {/* <div className={`${styles.photo_wrapper}`}>
                    {employee.photo === null ? (
                            <img alt="profile_photo" src={default_photo} className={`${styles.photo}`}></img>
                        ) : (
                            <img alt="profile_photo" src={employee.photo} className={`${styles.photo}`}></img>
                        )}
                    </div> */}
                    <div className={`${styles.info_wrapper}`}>
                        <div className={`${styles.fields}`}>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>ФИО</span>
                                <span className={`${styles.item_text}`}>{admin.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;