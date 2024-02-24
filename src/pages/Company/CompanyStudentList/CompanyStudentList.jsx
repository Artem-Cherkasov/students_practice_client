import React, { useState } from 'react';
import styles from './CompanyStudentTable.module.scss'
import CompanyStudentTable from './CompanyStudentsTable';

const CompanyStudentList = () => {
    const [eventID, setEventID] = useState(0);
    const [departmentID, setDepartmentID] = useState(0)
    const [isDisabledByEvents, setDisabledByEvents] = useState(true);
    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.title}`}>Студенты</span>
                </div>
                <div className={`${styles.table_content}`}>
                    <CompanyStudentTable
                        id_event={eventID}
                        isDisabledByEvents={isDisabledByEvents}
                        setDisabledByEvents={setDisabledByEvents}
                        setEventID={setEventID}
                        setDepartmentID={setDepartmentID} />
                </div>
            </div>
        </div>
    );
};

export default CompanyStudentList;