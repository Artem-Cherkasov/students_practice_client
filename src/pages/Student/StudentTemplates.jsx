import React, { useState, useEffect } from 'react';
import styles from '../Documents/DocumentList.module.scss';
import StudentTemplatesTable from './StudentTemplatesTable';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { TfiDownload } from 'react-icons/tfi';
import { IconContext } from "react-icons/lib";
const FileDownload = require('js-file-download');


const StudentTemplates= () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [showFile, setShowFile] = useState(false);
    const [file, setFile] = useState()
    const [disabled, setDisabled] = useState(true)
    const [downloaded, setDownloaded] = useState([])

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Шаблоны</span>
                </div>
                <div className={`${styles.table_content}`}>
                    <StudentTemplatesTable />
                </div>
            </div>
        </div>
    );
};

export default StudentTemplates;