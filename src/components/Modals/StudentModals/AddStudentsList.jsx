import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as XLSX from 'xlsx';
import styles from "./AddStudent.module.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";

const baseURL = "http://localhost:5000/api/students/" //createNew
const updateURL = "http://localhost:5000/api/students/profile/"
const departmentsURL = "http://localhost:5000/api/departments/"

const AddStudentsList = props => {
    const department = JSON.parse(localStorage.getItem("department"))
    const [studentsData, setData] = useState([])
    const [fullscreen, setFullscreen] = useState(true);
    const [logins, setLogins] = useState([])
    const [students, setStudents] = useState([]);
    const [show, setShow] = useState(false);
    const [departments, setDepartments] = useState([]);
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

    const refreshPage = () => {
        window.location.reload();
    }

    async function getData() {
        const response = await axios.get(baseURL)
        return response.data
    }

    console.log(props.id_event)

    const readUploadFile = (e) => {

        let id_event = props.id_event;

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
                        data[i]['id_event'] = props.id_event 
                        const studentToUpdateURL = updateURL + `${data[i]['id_student']}`
                        axios.put(studentToUpdateURL, data[i])
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }

                newJson.map((student) => {
                    const email = student['E-mail']
                    students.push({
                        login: email,
                        surname: student['Фамилия'],
                        name: student['Имя'],
                        patronymic: student['Отчество'],
                        full_name: `${student['Фамилия']} ${student['Имя']} ${student['Отчество']}`,
                        birth_year: student['Дата рождения'],
                        group: student['Группа'],
                        phone_number: student['Телефон'],
                        email: email,
                        photo: "",
                        hometown: student['Родной город'],
                        school: student['Школа'],
                        math_points: student['Математика'],
                        russian_points: student['Русский язык'],
                        physics_points: student['Физика'],
                        informatics_points: student['Информатика'],
                        iap_points: student['ИИП'],
                        oop_points: student['ООП'],
                        skills: student['Умения'],
                        achievements: student['Достижения'],
                        desired_training: student['Желаемые практики'],
                        id_event: props.id_event,
                        id_department: department.id_department
                    })
                })

                axios.post(baseURL, students).then(() => refreshPage())
            })
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }

    return (
        <Form.Group>
            <Form.Control disabled={props.disabled} type="file" accept='.xls, .xlsx' className={`me-2 mb-2 ${styles.addButton_list}`} onChange={readUploadFile} />
        </Form.Group>
    );
}

export default AddStudentsList;
