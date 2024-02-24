import React, { useEffect, useState } from 'react';
import styles from '../CompanyList/Companies.module.scss';
import axios from "axios";
import AddCompany from "../../components/Modals/CompanyModals/AddCompany";
import StudentCompanyTable from './StudentCompanyTable';

const companiesURL = 'http://localhost:5000/api/companies/';

const StudentCompanyList = () => {
    const [companies, setCompanies] = useState();

    useEffect(() => {
        axios.get(companiesURL).then((response) => {
            setCompanies(response.data);
        });
    }, []);

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Компании</span>
                </div>
                <div className={`${styles.table_content}`}>
                    <StudentCompanyTable />
                </div>
            </div>
        </div>
    );
};

export default StudentCompanyList;