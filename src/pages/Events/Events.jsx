import React, { useEffect, useState } from 'react';
import styles from './Events.module.scss';
import { Container, Row } from "react-bootstrap";
import EventItem from "../../components/EventItem";
import { Navigate } from 'react-router';
import axios from "axios";
import AddEvent from '../../components/Modals/EventModals/AddEvent';
import EventsTable from './EventsTable';

const eventsURL = 'http://localhost:5000/api/events/';

const Events = () => {
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
                    <AddEvent />
                </div>
                <div className={`${styles.table_content}`}>
                    <EventsTable />
                </div>
            </div>
        </div>
    );
};

export default Events;