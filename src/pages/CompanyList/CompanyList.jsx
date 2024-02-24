import React, { useEffect, useState } from 'react';
import styles from './Companies.module.scss';
import { Row } from "react-bootstrap";
import axios from "axios";
import AddCompany from "../../components/Modals/CompanyModals/AddCompany";
import CompaniesTable from './CompanyTable';

const companiesURL = 'http://localhost:5000/api/companies/';

const Events = () => {
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
                    <AddCompany />
                </div>
                <div className={`${styles.table_content}`}>
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
};

export default Events;