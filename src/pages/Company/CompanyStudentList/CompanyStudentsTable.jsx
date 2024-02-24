import React, { useState } from "react";
import styles from './CompanyStudentTable.module.scss'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DropDownEvents from './DropDownEvents';
import SendOffer from "./SendOffer";
import StudentInfo from "./StudentInfo";
import AcceptedStudent from "../../../components/Modals/StudentModals/AcceptedStudent";

const CompanyStudentTable = props => {
    const [students, setStudents] = useState([]);
    const [idToDelete, setIdToDelete] = useState([])
    const [chosenStudents, setChosenStudents] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [eventTitle, setEventTitle] = useState("")

    const columns = [{
        dataField: 'id_student',
        text: '№',
        sort: true,
        headerStyle: {
            width: '100px'
        }
    }, {
        dataField: 'full_name',
        text: 'ФИО',
        sort: true,
        headerStyle: {
            width: '350px'
        }
    }, {
        dataField: 'iap_points',
        text: 'ИИП',
        sort: true,
        headerStyle: {
            width: '100px'
        }
    }, {
        dataField: 'oop_points',
        text: 'ООП',
        sort: true,
        headerStyle: {
            width: '100px'
        }
    }, {
        dataField: 'accepted',
        text: 'Согласие',
        sort: true,
        headerStyle: {
            width: '100px'
        }, 
        formatter: (cellContent, row) => {
            return (
                <AcceptedStudent student={row} id={row.id_student} />
            );
        }
    }, {
        dataField: 'files',
        text: '',
        headerStyle: {
            width: '50px'
        },
        formatter: (cellContent, row) => {
            return (
                <SendOffer eventTitle={eventTitle} student={row} id={row.id_student} />
            );
        },
    }, {
        dataField: 'Info',
        text: '',
        headerStyle: {
            width: '50px'
        },
        formatter: (cellContent, row) => {
            return (
                <StudentInfo student={row} />
            );
        }
    }]

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        selectColumnStyle: {
            width: '20px'
        },
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                idToDelete.push(row.id_student)
                chosenStudents.push(row)
            }
            else {
                setIdToDelete(idToDelete.filter(item => item !== row.id_student));
            }
            if (isSelect === false) {
                idToDelete.pop(row.id_student)
                chosenStudents.pop(row)
            }
        },

        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map((row) => {
                    idToDelete.push(row.id_student)
                    chosenStudents.push(row)
                })
            }
            else {
                rows.map((row) => {
                    setIdToDelete(idToDelete.filter(item => item !== row.id_student));
                })
            }
            if (isSelect === false) {
                rows.map((row) => {
                    idToDelete.pop(row.id_student)
                    chosenStudents.pop(row)
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
            text: 'All', value: students.length
        }]
    }

    return (
        <div className={`${styles.table_main}`}>
            <div className={`${styles.table_buttons}`}>
                <div className={`${styles.event_choice}`}>
                    <DropDownEvents
                        setEventTitle={setEventTitle}
                        setShowTable={setShowTable}
                        setDisabledByEvents={props.setDisabledByEvents}
                        setStudents={setStudents}
                        setEventID={props.setEventID}
                    />
                </div>
            </div>
            <hr />
            {showTable ? (
                <BootstrapTable
                    wrapperClasses={`${styles.table}`}
                    keyField='id_student'
                    data={students}
                    columns={columns}
                    selectRow={selectRow}
                    defaultSorted={defaultSorted}
                    noDataIndication="Список студентов пуст"
                    bordered={false}
                    pagination={paginationFactory(options)}
                />
            ) : (
                <>
                    <span className={`${styles.empty_events}`}>Вы не учавствуете ни в одной практике.</span>
                    <span className={`${styles.empty_events_recommendation}`}>
                        Пожалуйста, подайте заявку на участие во вкладке "Мероприятия".
                    </span>
                </>
            )}
        </div>
    )
}

export default CompanyStudentTable;