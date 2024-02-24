import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import styles from "./AddEmployee.module.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/employees/" //createNew
const updateURL = "http://localhost:5000/api/employees/"
const departmentsURL = "http://localhost:5000/api/departments/"

const AddEmployeesList = props => {
    const [studentsData, setData] = useState([])
    const [fullscreen, setFullscreen] = useState(true);
    const [logins, setLogins] = useState([])
    const [employees, setEmployees] = useState([]);
    const [show, setShow] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [departmentID, setDepartmentID] = useState(0);
    const [disabledByDepartments, setDisabledByDepartments] = useState(true);
    const [disabledByFiles, setDisabledByFiles] = useState(true);

    useEffect(() => {
        axios.get(departmentsURL).then((response) => {
            setDepartments(response.data);
        });
    }, []);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const [validated, setValidated] = useState(false);

    const checkValidation = (student) => {
        const form = student.currentTarget;
        if (form.checkValidity() === false) {
            student.preventDefault();
            student.stopPropagation();
        }

        setValidated(true);
    };

    async function getData() {
        const response = await axios.get(baseURL)
        return response.data
    }

    const readUploadFile = (e) => {
        e.preventDefault()
        console.log(e.target.files.length)
        switch (e.target.files.length) {
            case 1:
                setDisabledByFiles(false);
                break;
            case 0:
                setDisabledByFiles(true);
                break;
            default:
                break;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            getData().then((data) => {
                let newJson = []

                data.map((record, index) => {
                    setData(studentsData.push(record))
                    setLogins(logins.push(studentsData[index]['login']))
                })

                for (let i = 0; i < json.length; i++) {
                    const hasLogin = logins.some(item => {
                        return JSON.stringify(item) === JSON.stringify(json[i]['E-mail'])
                    })

                    if (!hasLogin) {
                        newJson.push(json[i])
                    } else {
                        data[i]['id_department'] = props.id_department
                        const studentToUpdateURL = updateURL + `${data[i]['id_employee']}`
                        console.log(data[i])
                        axios.put(studentToUpdateURL, data[i])
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }

                newJson.map((employee) => {
                    const email = employee['E-mail']
                    employees.push({
                        login: email,
                        surname: employee['Фамилия'],
                        name: employee['Имя'],
                        patronymic: employee['Отчество'],
                        full_name: `${employee['Фамилия']} ${employee['Имя']} ${employee['Отчество']}`,
                        birth_year: employee['Дата рождения'],
                        phone_number: employee['Телефон'],
                        email: email,
                        id_department: props.id_department
                    })
                })
                
                axios.post(baseURL, employees).then(() => refreshPage())

            })
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }

    const handleChange = (event) => {
        setDepartmentID(event.target.value);
        if (event.target.value === "Выберите кафедру") {
            setDisabledByDepartments(true);
        }
        else {
            setDisabledByDepartments(false);
        }
    }

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <Form.Group>
            <Form.Control disabled={props.disabled} type="file" accept='.xls, .xlsx' className={`me-2 mb-2 ${styles.addButton_list}`} onChange={readUploadFile} />
        </Form.Group>
    );
}

export default AddEmployeesList;