// import React from 'react';
// import { Container, Row, Col } from "react-bootstrap";
// import styles from './EventItem.module.scss';
// import axios from 'axios';
// import ConfirmWindow from './Modals/ConfirmWindow';
// import EditEvent from './Modals/EditEvent';

// const eventsURL = 'http://u6ele66.beget.tech/api/events/';

// const EventItem = (props) => {
//     const deleteEvent = () => {
//         axios.post(eventsURL + `${props.id}`).then((response) => {
//             (response.data);
//         })
//     }

//     return (
//         <div>
//             <div className={`${styles.eventItem}`}>
//                 <Container>
//                     <Row>
//                         <div className={`${styles.eventTitle} ${styles.elementMargin}`}>
//                             <h2>{props.event.title}</h2>
//                             {/* <span className={`${styles.creationDate}`}>от {(props.event.createdAt).split('T')[0] + " в " + ((props.event.createdAt).split('T')[1]).split('.')[0]}</span> */}
//                         </div>
//                     </Row>
//                     <Row>
//                         <div className={`${styles.elementMargin} ${styles.eventStats}`}>
//                             <Col>
//                                 <div>
//                                     <span className={`${styles.statTitle}`}>Начало: </span>
//                                     <span className={`${styles.statValue}`}>{props.event.beginning_date}</span>
//                                 </div>
//                                 <div>
//                                     <span className={`${styles.statTitle}`}>Конец: </span>
//                                     <span className={`${styles.statValue}`}>{props.event.ending_date}</span>
//                                 </div>
//                             </Col>
//                             <Col xs={8}>
//                                 <div>
//                                     <span className={`${styles.statTitle}`}>Тип: </span>
//                                     <span className={`${styles.statValue}`}>{props.event.type}</span>
//                                 </div>
//                                 <div>
//                                     <span className={`${styles.statTitle}`}>Курс: </span>
//                                     <span className={`${styles.statValue}`}>{props.event.year}</span>
//                                 </div>
//                             </Col>
//                         </div>
//                     </Row>
//                     <Row>
//                         <p className={`${styles.elementMargin} ${styles.description}`}>
//                             {props.event.description}
//                         </p>
//                     </Row>
//                     <Row>
//                         <div className={`${styles.buttons} ${styles.elementMargin}`}>
//                             <EditEvent data={props} id={props.id}/>
//                             <ConfirmWindow eventToDelete={deleteEvent}/>
//                         </div>
//                     </Row>
//                 </Container>
//             </div>
//         </div>
//     );
// };

// export default EventItem;