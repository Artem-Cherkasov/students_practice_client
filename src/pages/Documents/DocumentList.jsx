import React, {useEffect, useState} from 'react';
import styles from './DocumentList.module.scss';
import {Container, Row} from "react-bootstrap";
import EventItem from "../../components/EventItem";
import axios from "axios";
import AddDocument from '../../components/Modals/DocumentModals/AddDocument';
import DocumentsTable from './DocumentsTable';

const documentsURL = 'http://localhost:5000/api/documents/';

const DocumentList = () => {
    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Документы</span>
                    <AddDocument />
                </div>
                    <div className={`${styles.table_content}`}>
                        <DocumentsTable />
                    </div>
            </div>
        </div>
    );
};

export default DocumentList;