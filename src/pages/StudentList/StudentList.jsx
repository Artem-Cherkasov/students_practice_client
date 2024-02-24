import React, { useState } from 'react';
import AddStudent from '../../components/Modals/StudentModals/AddStudent'
import StudentTable from './StudentsTable';
import styles from './StudentTable.module.scss'

const StudentList = () => {
    const [eventID, setEventID] = useState(0);
    const [departmentID, setDepartmentID] = useState(0)
    const [isDisabledByEvents, setDisabledByEvents] = useState(true);
    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.title}`}>Студенты</span>
                    <div className={`${styles.addButtons}`}>
                        <AddStudent
                            isDisabledByEvents={isDisabledByEvents}
                            setDisabledByEvents={setDisabledByEvents}
                            id_event={eventID}
                            id_department={departmentID} />
                    </div>
                </div>
                <div className={`${styles.table_content}`}>
                    <StudentTable
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

export default StudentList;