import React, { useState, useEffect } from "react";
import styles from './Offers.module.scss'
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AcceptOffer from "./AcceptOffer";
import DenyOffer from "./DenyOffer";
import Places from "./Places"

const offersURL = "http://localhost:5000/api/offers/getAllByStudentID/";
const acceptedOfferURL = "http://localhost:5000/api/offers/getAcceptedByStudentID/";

const OffersTable = props => {
    const info = JSON.parse(localStorage.getItem("user_info"))
    const [offers, setOffers] = useState([]);
    const [acceptedOffer, setAcceptedOffers] = useState();

    useEffect(() => {
        axios.get(offersURL + info.id_student).then((response) => {
            setOffers(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(acceptedOfferURL + info.id_student).then((response) => {
            setAcceptedOffers(response.data[0]);
        });
    }, []);

    console.log(acceptedOffer)

    const columns = [{
        dataField: 'id_company_chose_student',
        text: '№',
        sort: true,
        headerStyle: {
            width: '50px'
        }
    }, {
        dataField: 'company_name',
        text: 'Компания',
        sort: true,
        headerStyle: {
            width: '200px'
        },
    }, {
        dataField: 'event_title',
        text: 'Мероприятие',
        sort: true,
        headerStyle: {
            width: '250px'
        }
    }, {
        dataField: 'type_of_development',
        text: 'Направление',
        sort: true,
        headerStyle: {
            width: '250px'
        }
    }, {
        dataField: 'places',
        text: 'Кол-во мест',
        sort: true,
        headerStyle: {
            width: '250px'
        },
        formatter: (cellContent, row) => {
            return (
                <Places offer={row} />
            );
        },
    }, {
        dataField: 'denyOffer',
        text: '',
        headerStyle: {
            width: '50px'
        },
        formatter: (cellContent, row) => {
            return (
                <DenyOffer offer={row} />
            );
        },
    }, {
        dataField: 'acceptOffer',
        text: '',
        headerStyle: {
            width: '50px'
        },
        formatter: (cellContent, row) => {
            return (
                <AcceptOffer offer={row} />
            );
        },
    }]

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
            text: 'All', value: offers.length
        }]
    }

    return (
        <div className={`${styles.table_main}`}>
            {acceptedOffer === undefined ? (
                <BootstrapTable
                    wrapperClasses={`${styles.table}`}
                    keyField='id_company_chose_student'
                    data={offers}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    noDataIndication="Список предложений пуст"
                    bordered={false}
                    pagination={paginationFactory(options)}
                />) : (
                <span className={`${styles.accepted_title}`}>
                    {`Вы приняли приглашение на практику от компании `}
                    <span className={`${styles.accepted_title_bold}`}>{`${acceptedOffer.company_name}`}</span>
                    {` на направление `}
                    <span className={`${styles.accepted_title_bold}`}>{`${acceptedOffer.type_of_development}`}</span>
                </span>
            )
            }
        </div>
    )
}

export default OffersTable;