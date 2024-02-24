import React, { useState, useEffect } from "react";
import axios from "axios";
import EditCompany from "../../components/Modals/CompanyModals/EditCompany";
import DeleteCompany from "../../components/Modals/CompanyModals/DeleteCompany";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DeleteSeveralCompanies from "../../components/Modals/CompanyModals/DeleteSeveralCompanies";
import styles from '../CompanyList/Companies.module.scss';
import TextTruncate from 'react-text-truncate';
import AddUser from "../User/AddUser";
import CompanyInfo from "./CompanyInfo";

const companiesURL = "http://localhost:5000/api/companies";

const StudentCompanyTable = () => {
    const [companies, setCompanies] = useState([]);
    const [idToDelete, setIdToDelete] = useState([])

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
            width: '150px'
        }
    }, {
        dataField: 'description',
        text: 'Описание',
        sort: true,
        headerStyle: {
            width: '300px'
        },
        formatter: (cellContent, row) => {
            return (
                <TextTruncate
                    line={3}
                    element="span"
                    truncateText="…"
                    text={`${row.description}`}
                />
            )
        },
    }, {
        dataField: 'hr_name',
        text: "Имя HR",
        sort: true,
        headerStyle: {
            width: '150px'
        }
    }, {
        dataField: 'hr_phone_number',
        text: 'Телефон HR',
        headerStyle: {
            width: '160px'
        }
    },
    {
        dataField: 'hr_email',
        text: 'E-mail HR',
        headerStyle: {
            width: '250px'
        }
    }, {
        dataField: 'companyInfo',
        text: '',
        headerStyle: {
            width: '50px'
        },
        formatter: (cellContent, row) => {
            return (
                <CompanyInfo company={row} />
            );
        }
    }
    ]

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
            <BootstrapTable
                wrapperClasses={`${styles.table}`}
                keyField='id_company'
                data={companies}
                columns={columns}
                defaultSorted={defaultSorted}
                noDataIndication="Список компаний пуст"
                bordered={false}
                pagination={paginationFactory(options)}
            />
        </div>
    )
}

export default StudentCompanyTable;