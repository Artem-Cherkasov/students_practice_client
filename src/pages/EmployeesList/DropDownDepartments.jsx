import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../StudentList/DropDown.module.scss'
import axios from 'axios';

const departmentsURL = "http://localhost:5000/api/departments/";
const employeeURL = "http://localhost:5000/api/employees/";
const selectText = "Выбрать";

const DropDownDepartments = props => {
    const [departments, setDepartments] = useState([]);
    const [currentTitle, setCurrentTitle] = useState(selectText)

    useEffect(() => {
        axios.get(departmentsURL).then((response) => {
            setDepartments(response.data);
        });
    }, []);

    const selectDepartment = (department) => {
        setCurrentTitle(department.title)
        props.setDepartmentID(department.id_department)
        axios.get(employeeURL).then((response) => {
            props.setEmployees(response.data.filter((student) => {
                return ((student.id_department === department.id_department) && (student.id_event === props.id_event))
            }))
        });
        props.setDisabledByEvents(false)
    }

    const selectDefault = () => {
        props.setDisabledByEvents(true)
        props.setDepartmentID(null)
        setCurrentTitle(selectText)
        props.setEmployees([])
    }

    return (
        <Dropdown className={`${styles.dropdown}`}>
            <Dropdown.Toggle variant="success" id="dropdown-basic-button" className={`${styles.dropdown_toggle}`}>
                {currentTitle}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={selectDefault}>{selectText}</Dropdown.Item>
                {departments.map((department, index) =>
                    <Dropdown.Item key={department.id_department} onClick={() => selectDepartment(department)}>
                        {department.title}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDownDepartments;