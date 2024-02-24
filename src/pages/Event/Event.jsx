import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import styles from './Event.module.scss';
import {useParams} from "react-router-dom";
import axios from "axios";

const eventsURL = 'http://localhost:5000/api/events/';

const Event = () => {
    const [event, setEvent] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        axios.get(eventsURL + id).then((response) => {
            setEvent(response.data);
            console.log(response.data);
            console.log(event);
        });
    }, []);

    return event ? (
        <div>
            <div className={`${styles.eventItem}`}>
                <Container>
                    <Row>
                        <div className={`${styles.eventTitle} ${styles.elementMargin}`}>
                            <h2>{event.title}</h2>
                            <span className={`${styles.creationDate}`}>от {event.createdAt}</span>
                        </div>
                    </Row>
                    <Row>
                        <div className={`${styles.elementMargin} ${styles.eventStats}`}>
                            <Col>
                                <div>
                                    <span className={`${styles.statTitle}`}>Начало: </span>
                                    <span className={`${styles.statValue}`}>{event.beginning_date}</span>
                                </div>
                                <div>
                                    <span className={`${styles.statTitle}`}>Конец: </span>
                                    <span className={`${styles.statValue}`}>{event.ending_date}</span>
                                </div>
                            </Col>
                            <Col xs={8}>
                                <div>
                                    <span className={`${styles.statTitle}`}>Тип: </span>
                                    <span className={`${styles.statValue}`}>{event.type}</span>
                                </div>
                                <div>
                                    <span className={`${styles.statTitle}`}>Курс: </span>
                                    <span className={`${styles.statValue}`}>{event.year}</span>
                                </div>
                            </Col>
                        </div>
                    </Row>
                    <Row>
                        <p className={`${styles.elementMargin} ${styles.description}`}>
                            {event.description}
                        </p>
                    </Row>
                    <Row>
                        <div className={`${styles.buttons} ${styles.elementMargin}`}>
                            <a href='#/' className={`${styles.redactButton} ${styles.button}`}>
                                Редактировать
                            </a>
                            <a href='#/' className={`${styles.deleteButton} ${styles.button}`}>
                                Удалить
                            </a>
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    ) :
        (<div>
            <h1>Такого мероприятия не существует</h1>
        </div>)
};

export default Event;