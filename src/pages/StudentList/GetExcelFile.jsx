import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './GetExcelFile.module.scss';
import Button from 'react-bootstrap/esm/Button';
import { AiOutlineDownload } from 'react-icons/ai';
import { IconContext } from "react-icons/lib";
const FileDownload = require('js-file-download');

const studentsURL = "http://localhost:5000/api/students/getExcel/";

const GetExcel = props => {

    const getFile = () => {
        axios.get(studentsURL + props.id_event, {
            responseType: 'blob',
        }).then((response) => {
            FileDownload(response.data, `students.xlsx`)
        })
    }

    return (
        <Button onClick={getFile} className={`${styles.download_button}`} disabled={props.isDisabledByEvents}>
            <IconContext.Provider value={{
                size: '25px'
            }}>
                <div>
                    <AiOutlineDownload />
                </div>
            </IconContext.Provider>
        </Button>
    );
};

export default GetExcel;
