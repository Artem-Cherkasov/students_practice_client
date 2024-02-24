import React, { useState, useEffect } from "react";
import styles from './EmployeeTable.module.scss'
import EditEmployee from "../../components/Modals/EmployeeModals/EditEmployee";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddUser from "../User/AddUser";
import AddSeveralUsers from "../User/AddSeveralUsers";
import DeleteEmployee from "../../components/Modals/EmployeeModals/DeleteEmployee";
import SearchEmployee from "./SearchEmployee";
import DropDownDepartments from "./DropDownDepartments";
import DeleteSeveralEmployee from "../../components/Modals/EmployeeModals/DeleteSeveralEmployees";
import axios from 'axios';

const employeesURL = "http://localhost:5000/api/employees/";

const EmployeeTable = props => {
    const [employees, setEmployees] = useState([]);
    const [idToDelete, setIdToDelete] = useState([])
    const [chosenEmployees, setChosenStudents] = useState([])
    const [buttons, setButtons] = useState([])

    useEffect(() => {
        axios.get(employeesURL).then((response) => {
            setEmployees(response.data);
        });
    }, []);

    console.log(employees)

    const columns = [{
        dataField: 'id_employee',
        text: '№',
        sort: true,
        headerStyle: {
            width: '20px'
        }
    }, {
        dataField: 'full_name',
        text: 'ФИО',
        sort: true,
        headerStyle: {
            width: '650px'
        }
    }, {
        dataField: 'delete',
        text: '',
        headerStyle: {
            width: '40px'
        },
        formatter: (cellContent, row) => {
            return (
                <DeleteEmployee employeesToDelete={idToDelete} />
            );
        },
    }, {
        dataField: 'edit',
        text: '',
        headerStyle: {
            width: '50px'
        },
        formatter: (cellContent, row) => {
            return (
                <EditEmployee student={row} id={row.id_employee} />
            );
        },
    }, {
        dataField: 'addUser',
        text: '',
        headerStyle: {
            width: '50px'
        },
        formatter: (cellContent, row) => {
            return (
                <AddUser student={row} info={row} role={"employee"} />
            );
        },
    }]

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        selectColumnStyle: {
            width: '20px'
        },
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                idToDelete.push(row.id_employee)
                chosenEmployees.push(row)
            }
            else {
                setIdToDelete(idToDelete.filter(item => item !== row.id_employee));
            }
            if (isSelect === false) {
                idToDelete.pop(row.id_employee)
                chosenEmployees.pop(row)
            }
        },

        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map((row) => {
                    idToDelete.push(row.id_employee)
                    chosenEmployees.push(row)
                    console.log(chosenEmployees)
                })
            }
            else {
                rows.map((row) => {
                    setIdToDelete(idToDelete.filter(item => item !== row.id_employee));
                })
            }
            if (isSelect === false) {
                rows.map((row) => {
                    idToDelete.pop(row.id_employee)
                    chosenEmployees.pop(row)
                })
                setIdToDelete([])
            }
        }
    };

    const defaultSorted = [{
        dataField: 'surname',
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
            text: 'All', value: employees.length
        }]
    }

    return (
        <div className={`${styles.table_main}`}>
            <div className={`${styles.table_buttons}`}>
                <div className={`${styles.event_choice}`}>
                    <DeleteSeveralEmployee employeesToDelete={idToDelete} />
                    <DropDownDepartments setDisabledByEvents={props.setDisabledByEvents} setEmployees={setEmployees} setDepartmentID={props.setDepartmentID}/>
                </div>
                <div className={`${styles.students_search}`}>
                    <SearchEmployee setEmployees={setEmployees} />
                    <AddSeveralUsers chosenStudents={chosenEmployees} isDisabledByEvents={props.isDisabledByEvents} role={"employee"}/>
                </div>
            </div>
            <hr />
            <BootstrapTable
                wrapperClasses={`${styles.table}`}
                keyField='id_employee'
                data={employees}
                columns={columns}
                selectRow={selectRow}
                defaultSorted={defaultSorted}
                noDataIndication="Список сотрудников пуст"
                bordered={false}
                pagination={paginationFactory(options)}
            />
        </div>
    )
}

export default EmployeeTable;