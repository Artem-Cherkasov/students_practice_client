import React, { useEffect, useState } from 'react';
import styles from './CompanyProfile.module.scss'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { CiEdit } from 'react-icons/ci';
import { IconContext } from "react-icons/lib";
import { Nav } from 'react-bootstrap';

const companiesURL = 'http://localhost:5000/api/companies/profile/';

const CompanyProfile = () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [company, setCompany] = useState({})

    useEffect(() => {
        axios.get(companiesURL + info.id_company).then(response => { setCompany(response.data) })
    }, []);

    for (const key in company) {
        const val = company[key];

        if (val === null || val === "") {
            company[key] = "-";
        }
    }

    return (
        <div className={`${styles.profile_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.profile_header}`}>
                    <span className={`${styles.title}`}>Профиль</span>
                    <Nav className={styles.nav}>
                        <Nav.Link href='/company/edit_profile' className={styles.nav_link}>
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
                    {/* <div className={`${styles.photo_wrapper}`}>
                        <img alt="profile_photo" src={employee.photo} className={`${styles.photo}`}></img>
                    </div> */}
                    <div className={`${styles.info_wrapper}`}>
                        <div className={`${styles.fields}`}>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Название</span>
                                <span className={`${styles.item_text}`}>{company.name}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Имя HR'а</span>
                                <span className={`${styles.item_text}`}>{company.hr_name}</span>
                            </div>
                        </div>
                        <div className={`${styles.fields}`}>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Телефон</span>
                                <span className={`${styles.item_text}`}>{company.hr_phone_number}</span>
                            </div>
                            <div className={`${styles.item_wrapper}`}>
                                <span className={`${styles.item_title}`}>Электронная почта</span>
                                <span className={`${styles.item_text}`}>{company.hr_email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;