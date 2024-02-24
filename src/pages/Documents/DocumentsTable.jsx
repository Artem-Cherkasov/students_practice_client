import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './DocumentList.module.scss'
import EditDocument from "../../components/Modals/DocumentModals/EditDocument";
import DeleteDocument from "../../components/Modals/DocumentModals/DeleteDocument";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DeleteSeveralDocument from "../../components/Modals/DocumentModals/DeleteSeveralDocuments";
import TextTruncate from 'react-text-truncate';

const documentsURL = "http://localhost:5000/api/documents/";

const DocumentsTable = () => {
    const [documents, setDocuments] = useState([]);
    const [idToDelete, setIdToDelete] = useState([])

    useEffect(() => {
        axios.get(documentsURL).then((response) => {
            setDocuments(response.data);
        });
    }, []);

    const columns = [{
        dataField: 'name',
        text: 'Название',
        sort: true
    }, {
        dataField: 'template_file',
        text: 'Шаблон',
        sort: true,
        headerStyle: {
            width: '300px'
        },
        formatter: (cell, row, rowIndex, extraData) => (
            <a href={row.template_file} target="_blank" rel="noopener noreferrer">{row.template_file}</a>
        )
    }, {
        dataField: 'sample_file',
        text: 'Пример',
        sort: true,
        headerStyle: {
            width: '300px'
        },
        formatter: (cell, row, rowIndex, extraData) => (
            <a href={row.sample_file} target="_blank" rel="noopener noreferrer">{row.sample_file}</a>
        )
    }, {
        dataField: 'delete',
        text: '',
        formatter: (cellContent, row) => {
            return (
                <DeleteDocument id_document={row.id_document} documentsToDelete={idToDelete} />
            );
        },
    }, {
        dataField: 'edit',
        text: '',
        formatter: (cellContent, row) => {
            return (
                <EditDocument document={row} id={row.id_document} />
            );
        },
    }
    ]

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                idToDelete.push(row.id_document)
            }
            else {
                setIdToDelete(idToDelete.filter(item => item !== row.id_document));
            }
            if (isSelect === false) {
                idToDelete.pop(row.id_document)
            }
        },

        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map((row) => {
                    idToDelete.push(row.id_document)
                    console.log(idToDelete)
                })
            }
            else {
                rows.map((row) => {
                    setIdToDelete(idToDelete.filter(item => item !== row.id_document));
                })
            }
            if (isSelect === false) {
                rows.map((row) => {
                    idToDelete.pop(row.id_document)
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
            <DeleteSeveralDocument documentsToDelete={idToDelete} />
            <BootstrapTable
                wrapperClasses={`${styles.table}`}
                keyField='id_document'
                data={documents}
                columns={columns}
                selectRow={selectRow}
                defaultSorted={defaultSorted}
                noDataIndication="Список документов пуст"
                bordered={false}
                pagination={paginationFactory(options)}
            />
        </div>
    )
}

export default DocumentsTable;