import React, {useEffect, useState} from 'react';
import styles from './Departments.module.scss';
import axios from "axios";
import DepartmentsTable from './DepartmentsTable';
import AddDepartment from '../../components/Modals/DepartmentModals/AddDepartment';

const departmentsURL = 'http://localhost:5000/api/departments/';

const Events = () => {
    const [departments, setDepartments] = useState();

    useEffect(() => {
        axios.get(departmentsURL).then((response) => {
            setDepartments(response.data);
        });
    }, []);

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Кафедры</span>
                    <AddDepartment />
                </div>
                    <div className={`${styles.table_content}`}>
                        <DepartmentsTable />
                    </div>
            </div>
        </div>
    );
};

export default Events;