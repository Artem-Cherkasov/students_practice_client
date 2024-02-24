import React, { useState, useEffect } from 'react';
import styles from '../Documents/DocumentList.module.scss';
import StudentDocumentsTable from './StudentDocumentsTable';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { TfiDownload } from 'react-icons/tfi';
import { IconContext } from "react-icons/lib";
const FileDownload = require('js-file-download');

const uploadURL = 'http://localhost:5000/api/documentUpload/upload';
const setFilesURL = 'http://localhost:5000/api/documentUpload/';
const downloadURL = 'http://localhost:5000/api/documentDownload/';

const StudentDocuments= () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [showFile, setShowFile] = useState(false);
    const [file, setFile] = useState()
    const [disabled, setDisabled] = useState(true)
    const [downloaded, setDownloaded] = useState([])

    useEffect(() => {
        axios.get(setFilesURL + info.id_student).then(response => {
            setDownloaded(response.data)
        })
    }, []);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleCloseFile = () => setShowFile(false);
    function handleShowFile(breakpoint) {
        setFullscreen(breakpoint);
        setShowFile(true);
    }

    const handleChangeFile = (e) => {
        setFile(e.target.files[0])
        setDisabled(false)
    }

    const uploadFile = () => {
        let formData = new FormData()
        formData.append("file", file)
        formData.append("id_student", info.id_student)
        axios.post(uploadURL, formData).then(() => {
            handleShow();
            setDisabled(true)
        })
    }

    const downloadFile = (name) => {
        axios.get(downloadURL + name, {
            responseType: 'blob',
        }).then((response) => {
            FileDownload(response.data, `${name}`);
        });
    }

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Загруженные</span>
                    <div className={`${styles.uploads}`}>
                        <Form.Control type="file" onChange={handleChangeFile} className={`${styles.upload_file}`} />
                        <Button key={0} disabled={disabled} onClick={uploadFile} className={`${styles.upload_button}`}>Загрузить</Button>
                    </div>
                </div>
                <div className={`${styles.table_content}`}>
                    <StudentDocumentsTable />
                </div>
                <Modal size="lg" show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className={`${styles.modal_title}`}>Файл отправлен!</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={refreshPage} className={`${styles.submit_button}`}>
                            ОК
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default StudentDocuments;