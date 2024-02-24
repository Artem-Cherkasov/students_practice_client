import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './DropDown.module.scss'
import axios from 'axios';
import TextTruncate from 'react-text-truncate';

const eventsURL = "http://localhost:5000/api/events/getEventsByID";
const getEventsOffersURL = "http://localhost:5000/api/trainingTypes";
const studentsURL = "http://localhost:5000/api/students/";
const selectText = "Выбрать";

const DropDownEvents = props => {
    const info = JSON.parse(localStorage.getItem("user_info"))

    const [events, setEvents] = useState([]);
    const [companyInEvent, setCompanyInEvent] = useState([]);
    const [eventID, setOfferID] = useState([]);
    const [currentTitle, setCurrentTitle] = useState(selectText)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        axios.get(getEventsOffersURL).then((response) => {
            setCompanyInEvent(response.data);
            response.data.map(company => {
                if (!eventID.includes(company.id_event) && company.id_company === info.id_company) {
                    eventID.push(company.id_event)
                }
            })
            if (eventID.length === 0) {
                setDisabled(true)
                props.setShowTable(false)
            }
            else {
                setDisabled(false)
                props.setShowTable(true)
                axios.get(eventsURL, {
                    params: {
                        eventIDs: eventID
                    }
                }).then((response) => {
                    setEvents(response.data);
                });
            }
        })
    }, []);

    const selectEvent = (event) => {
        setCurrentTitle(event.title)
        props.setEventID(event.id_event)
        props.setEventTitle(event.title)
        console.log(event.title)
        axios.get(studentsURL).then((response) => {
            props.setStudents(response.data.filter((student) => {
                return student.id_event === event.id_event
            }))
        });
        props.setDisabledByEvents(false)
    }

    const selectDefault = () => {
        props.setDisabledByEvents(true)
        props.setEventID(null)
        setCurrentTitle(selectText)
        props.setStudents([])
    }

    return (
        <Dropdown className={`${styles.dropdown}`}>
            <Dropdown.Toggle variant="success" id="dropdown-basic-button" className={`${styles.dropdown_toggle}`} disabled={disabled}>
                <TextTruncate
                    line={3}
                    element="span"
                    truncateText="…"
                    text={`${currentTitle}`}
                />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={selectDefault}>{selectText}</Dropdown.Item>
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