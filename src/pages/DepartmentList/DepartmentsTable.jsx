import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import styles from './Departments.module.scss';
import EditDepartment from "../../components/Modals/DepartmentModals/EditDepartment";
import DeleteDepartment from "../../components/Modals/DepartmentModals/DeleteDepartment";
import DeleteSeveralDepartments from "../../components/Modals/DepartmentModals/DeleteSeveralDepartments";

const departmentsURL = "http://localhost:5000/api/departments/";

const DepartmentsTable = () => {
    const [departments, setDepartments] = useState([]);
    const [idToDelete, setIdToDelete] = useState([])

    useEffect(() => {
        axios.get(departmentsURL).then((response) => {
            setDepartments(response.data);
        });
    }, []);

    const columns = [{
        dataField: 'title',
        text: 'Название',
        sort: true,
        headerStyle: {
            width: '700px'
        }
    }, {
        dataField: 'delete',
        text: '',
        formatter: (cellContent, row) => {
            return (
                <DeleteDepartment id_event={row.id_department} departmentsToDelete={idToDelete}/>
            );
        },
    }, {dataField: 'edit',
        text: '',
        formatter: (cellContent, row) => {
            console.log(row)
            return (
                <EditDepartment data={row} id={row.id_department} />
            );
        },
    }]

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                idToDelete.push(row.id_department)
            }
            else {
                setIdToDelete(idToDelete.filter(item => item !== row.id_department));
            }
            if (isSelect === false) {
                idToDelete.pop(row.id_department)
            }
        },

        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map((row) => {
                    idToDelete.push(row.id_department)
                })
            }
            else {
                rows.map((row) => {
                    setIdToDelete(idToDelete.filter(item => item !== row.id_department));
                })
            }
            if (isSelect === false) {
                rows.map((row) => {
                    idToDelete.pop(row.id_department)
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
            text: 'All', value: departments.length
        }]
    }

    return (
        <div className={`${styles.table_main}`}>
            <DeleteSeveralDepartments departmentsToDelete={idToDelete} />
            <BootstrapTable
                wrapperClasses={`${styles.table}`}
                keyField='id_department'
                data={departments}
                columns={columns}
                selectRow={selectRow}
                defaultSorted={defaultSorted}
                noDataIndication="Список кафедр пуст"
                bordered={false}
                pagination={paginationFactory(options)}
            />
        </div>
    )
}

export default DepartmentsTable;