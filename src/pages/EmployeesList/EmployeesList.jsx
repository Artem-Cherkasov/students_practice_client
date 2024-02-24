import React, { useState } from 'react';
import styles from './EmployeeTable.module.scss'
import AddEmployee from '../../components/Modals/EmployeeModals/AddEmployee';
import EmployeeTable from './EmployeesTable';

const EmployeeList = () => {
    const [departmentID, setDepartmentID] = useState(0)
    const [isDisabledByEvents, setDisabledByEvents] = useState(true);

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.title}`}>Сотрудники</span>
                    <div className={`${styles.addButtons}`}>
                        <AddEmployee
                            isDisabledByEvents={isDisabledByEvents}
                            setDisabledByEvents={setDisabledByEvents}
                            id_department={departmentID} />
                    </div>
                </div>
                <div className={`${styles.table_content}`}>
                    <EmployeeTable
                        isDisabledByEvents={isDisabledByEvents}
                        setDisabledByEvents={setDisabledByEvents}
                        setDepartmentID={setDepartmentID} />
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;