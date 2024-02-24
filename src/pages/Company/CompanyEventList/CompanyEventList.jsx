import React, { useEffect, useState } from 'react';
import styles from './CompanyEventList.module.scss';
import axios from "axios";
import EventsTable from './CompanyEventTable';

const eventsURL = 'http://localhost:5000/api/events/';

const CompanyEventList = () => {
    const [events, setEvents] = useState();

    useEffect(() => {
        axios.get(eventsURL).then((response) => {
            setEvents(response.data);
        });
    }, []);

    return (
        <div className={`${styles.students_wrapper}`}>
            <div className={`${styles.main_content}`}>
                <div className={`${styles.students_header}`}>
                    <span className={`${styles.header_title}`}>Мероприятия</span>
                </div>
                <div className={`${styles.table_content}`}>
                    <EventsTable />
                </div>
            </div>
        </div>
    );
};

export default CompanyEventList;