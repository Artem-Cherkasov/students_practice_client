import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import styles from './CompanyEventList.module.scss';
import EventSubscribe from "./EventSubscribe/EventSubscribe";

const eventsURL = "http://localhost:5000/api/events/";

const CompanyEventTable = () => {
    const [events, setEvents] = useState([]);
    const [idToDelete, setIdToDelete] = useState([])

    useEffect(() => {
        axios.get(eventsURL).then((response) => {
            setEvents(response.data);
        });
    }, []);

    const columns = [{
        dataField: 'title',
        text: 'Название',
        sort: true,
        headerStyle: {
            width: '300px'
        }
    }, {
        dataField: 'year',
        text: 'Курс',
        sort: true,
        headerStyle: {
            width: '100px'
        }
    }, {
        dataField: 'beginning_date',
        text: 'Дата начала',
        sort: true,
        headerStyle: {
            width: '170px'
        }
    }, {
        dataField: 'ending_date',
        text: 'Дата окончания',
        sort: true,
        headerStyle: {
            width: '170px'
        }
    }, {
        dataField: 'edit',
        text: '',
        formatter: (cellContent, row) => {
            return (
                <EventSubscribe data={row} id={row.id_event} />
            );
        },
    }]

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                idToDelete.push(row.id_event)
            }
            else {
                setIdToDelete(idToDelete.filter(item => item !== row.id_event));
            }
            if (isSelect === false) {
                idToDelete.pop(row.id_event)
            }
        },

        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map((row) => {
                    idToDelete.push(row.id_event)
                    console.log(idToDelete)
                })
            }
            else {
                rows.map((row) => {
                    setIdToDelete(idToDelete.filter(item => item !== row.id_event));
                })
            }
            if (isSelect === false) {
                rows.map((row) => {
                    idToDelete.pop(row.id_event)
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
            text: 'All', value: events.length
        }]
    }

    return (
        <div className={`${styles.table_main}`}>
            <BootstrapTable
                wrapperClasses={`${styles.table}`}
                keyField='id_event'
                data={events}
                columns={columns}
                selectRow={selectRow}
                defaultSorted={defaultSorted}
                noDataIndication="Список мероприятий пуст"
                bordered={false}
                pagination={paginationFactory(options)}
            />
        </div>
    )
}

export default CompanyEventTable;