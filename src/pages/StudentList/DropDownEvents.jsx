import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './DropDown.module.scss'
import axios from 'axios';
import TextTruncate from 'react-text-truncate';

const eventsURL = "http://localhost:5000/api/events/";
const studentsURL = "http://localhost:5000/api/students/";
const selectText = "Выбрать";

const DropDownEvents = props => {
    const [events, setEvents] = useState([]);
    const [currentTitle, setCurrentTitle] = useState(selectText)


    useEffect(() => {
        axios.get(eventsURL).then((response) => {
            setEvents(response.data);
        });
    }, []);

    const selectEvent = (event) => {
        setCurrentTitle(event.title)
        props.setEventID(event.id_event)
        axios.get(studentsURL).then((response) => {
            props.setStudents(response.data.filter((student) => {
                return student.id_event === event.id_event
            }))
        });
        props.setDisabledByEvents(false)
    }

    const selectAllEvent = () => {
        props.setDisabledByEvents(true)
        setCurrentTitle("Все мероприятия")
        props.setEventID(null)
        axios.get(studentsURL).then((response) => {
            props.setStudents(response.data)
        });
    }

    return (
       
        <Dropdown className={`${styles.dropdown}`}>
            <Dropdown.Toggle variant="success" id="dropdown-basic-button" className={`${styles.dropdown_toggle}`}>
                <TextTruncate
                    line={3}
                    element="span"
                    truncateText="…"
                    text={`${currentTitle}`}
                />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={selectAllEvent}>Все мероприятия</Dropdown.Item>
                {events.map((event, index) =>
                    <Dropdown.Item key={event.id_event} onClick={() => selectEvent(event)}>
                        {event.title} {event.year} курс
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDownEvents;