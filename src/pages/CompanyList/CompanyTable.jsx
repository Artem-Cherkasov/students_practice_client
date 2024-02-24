import React, { useState, useEffect } from "react";
import axios from "axios";
import EditCompany from "../../components/Modals/CompanyModals/EditCompany";
import DeleteCompany from "../../components/Modals/CompanyModals/DeleteCompany";
import SearchCompany from "./SearchCompany";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DeleteSeveralCompanies from "../../components/Modals/CompanyModals/DeleteSeveralCompanies";
import styles from './Companies.module.scss';
import TextTruncate from 'react-text-truncate';
import AddUser from "../User/AddUser";
import AddSeveralUsers from "../User/AddSeveralUsers";

const companiesURL = "http://localhost:5000/api/companies/";

const CompaniesTable = () => {
    const [companies, setCompanies] = useState([]);
    const [idToDelete, setIdToDelete] = useState([])
    const [chosenCompanies, setChosenCompanies] = useState([])

    useEffect(() => {
        axios.get(companiesURL).then((response) => {
            setCompanies(response.data);
        });
    }, []);

    const columns = [{
        dataField: 'name',
        text: 'Название',
        sort: true,
        headerStyle: {
            width: '200px'
        },
        style: {
            verticalAlign: "middle"
        },
    },
    // }, {
    //     dataField: 'description',
    //     text: 'Описание',
    //     sort: true,
    //     headerStyle: {
    //         width: '300px'
    //     },
    //     style: {
    //         verticalAlign: "middle"
    //     },
    //     formatter: (cellContent, row) => {
    //         return (
    //             <TextTruncate
    //                 line={3}
    //                 element="span"
    //                 truncateText="…"
    //                 text={`${row.description}`}
    //             />
    //         )
    //     },
    // }, {
    {
        dataField: 'hr_name',
        text: "Имя HR",
        sort: true,
        headerStyle: {
            width: '150px'
        },
        style: {
            verticalAlign: "middle"
        },
    }, {
        dataField: 'hr_phone_number',
        text: 'Телефон HR',
        headerStyle: {
            width: '150px'
        },
        style: {
            verticalAlign: "middle"
        }
    },
    {
        dataField: 'hr_email',
        text: 'E-mail HR',
        headerStyle: {
            width: '300px'
        },
        style: {
            verticalAlign: "middle"
        },
    }, {
        dataField: 'delete',
        text: '',
        formatter: (cellContent, row) => {
            return (
                <DeleteCompany id_company={row.id_company} companiesToDelete={idToDelete} />
            );
        },
    }, {
        dataField: 'edit',
        text: '',
        formatter: (cellContent, row) => {
            return (
                <EditCompany company={row} id={row.id_company} />
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
                <AddUser info={row} role={"company"} />
            );
        },
    }
    ]

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                idToDelete.push(row.id_company)
                chosenCompanies.push(row)
            }
            else {
                setIdToDelete(idToDelete.filter(item => item !== row.id_company));
            }
            if (isSelect === false) {
                idToDelete.pop(row.id_company)
                chosenCompanies.pop(row)
            }
        },

        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map((row) => {
                    idToDelete.push(row.id_company)
                    chosenCompanies.push(row)
                    console.log(idToDelete)
                })
            }
            else {
                rows.map((row) => {
                    setIdToDelete(idToDelete.filter(item => item !== row.id_company));
                })
            }
            if (isSelect === false) {
                rows.map((row) => {
                    idToDelete.pop(row.id_event)
                    console.log(idToDelete)
                    chosenCompanies.pop(row)
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
            text: 'All', value: companies.length
        }]
    }

    return (
        <div className={`${styles.table_main}`}>
            <div className={`${styles.table_buttons}`}>
                <div className={`${styles.company_panel}`}>
                    <DeleteSeveralCompanies companiesToDelete={idToDelete} />
                </div>
                <div className={`${styles.company_search}`}>
                    <SearchCompany setCompanies={setCompanies} />
                    <AddSeveralUsers  chosenStudents={chosenCompanies} role="company" />
                </div>
            </div>
            <BootstrapTable
                wrapperClasses={`${styles.table}`}
                keyField='id_company'
                data={companies}
                columns={columns}
                selectRow={selectRow}
                defaultSorted={defaultSorted}
                noDataIndication="Список компаний пуст"
                bordered={false}
                pagination={paginationFactory(options)}
            />
        </div>
    )
}

export default CompaniesTable;