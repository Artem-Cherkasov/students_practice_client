import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../Student/DocumentUploadTable.module.scss'
import EditDocument from "../../components/Modals/DocumentModals/EditDocument";
import DeleteDocumentUpload from '../../components/Modals/DocumentModals/DeleteDocumentUpload'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DeleteSeveralDocument from "../../components/Modals/DocumentModals/DeleteSeveralDocuments";
import TextTruncate from 'react-text-truncate';

const documentsURL = 'http://localhost:5000/api/documentUpload/';

const StudentDocumentsTable = () => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [documents, setDocuments] = useState([])
    const [idToDelete, setIdToDelete] = useState([])

    useEffect(() => {
        axios.get(documentsURL + info.id_student).then(response => {
            setDocuments(response.data)
        })
    }, []);

    
    const columns = [{
        dataField: 'name',
        text: 'Название',
        sort: true
    }, {
        dataField: 'delete',
        text: '',
        formatter: (cellContent, row) => {
            return (
                <DeleteDocumentUpload id_document_upload={row.id_document_upload} documentsToDelete={idToDelete} />
            );
        },
    }
    ]

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                idToDelete.push(row.id_document_upload)
            }
            else {
                setIdToDelete(idToDelete.filter(item => item !== row.id_document_upload));
            }
            if (isSelect === false) {
                idToDelete.pop(row.id_document_upload)
            }
        },

        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map((row) => {
                    idToDelete.push(row.id_document_upload)
                    console.log(idToDelete)
                })
            }
            else {
                rows.map((row) => {
                    setIdToDelete(idToDelete.filter(item => item !== row.id_document_upload));
                })
            }
            if (isSelect === false) {
                rows.map((row) => {
                    idToDelete.pop(row.id_document_upload)
                    console.log(idToDelete)
                })
                setIdToDelete([])
            }
        }
    };

    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
    }];

    const pageButtonRenderer = ({
        page,
        active,
        disable,
        title,
        onPageChange
    }) => {
        const handleClick = (e) => {
            e.preventDefault();
            onPageChange(page);
        };
        const activeStyle = {};
        activeStyle.height = '38px';
        activeStyle.width = '38px';
        activeStyle.marginRight = '1px'
        activeStyle.textDecoration = 'none';
        activeStyle.borderRadius = '5px'
        activeStyle.border = '1px solid #16456D'
        if (active) {
            activeStyle.backgroundColor = '#16456D';
            activeStyle.color = 'white';
        } else {
            activeStyle.backgroundColor = 'white';
            activeStyle.color = '#16456D';
        }
        if (typeof page === 'string') {
            activeStyle.backgroundColor = 'white';
            activeStyle.color = '#16456D';
        }
        return (
            <li className="page-item">
                <button onClick={handleClick} style={activeStyle}>{page}</button>
            </li>
        );
    };

    const options = {
        pageButtonRenderer,
        sizePerPageList: [{
            text: '10', value: 10
        }, {
            text: 'All', value: documents.length
        }]
    }

    return (
        <div className={`${styles.table_main}`}>
            <BootstrapTable
                wrapperClasses={`${styles.table}`}
                keyField='id_document_upload'
                data={documents}
                selectRow = {selectRow}
                columns={columns}
                defaultSorted={defaultSorted}
                noDataIndication="Вы пока не загружали файлы"
                bordered={false}
                pagination={paginationFactory(options)}
            />
        </div>
    )
}

export default StudentDocumentsTable;