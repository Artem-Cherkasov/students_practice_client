import React, { useState, useEffect } from 'react';
import styles from './Uploads.module.scss';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { TfiDownload } from 'react-icons/tfi';
import { TfiFiles } from 'react-icons/tfi';
import { IconContext } from "react-icons/lib";
const FileDownload = require('js-file-download');

const setFilesURL = 'http://localhost:5000/api/documentUpload/';
const downloadURL = 'http://localhost:5000/api/documentDownload/';

const Uploads = props => {
    const [fullscreen, setFullscreen] = useState(true);
    const [showFile, setShowFile] = useState(false);
    const [downloaded, setDownloaded] = useState([])

    useEffect(() => {
        axios.get(setFilesURL + props.student.id_student).then(response => {
            setDownloaded(response.data)
        })
    }, []);

    const handleCloseFile = () => setShowFile(false);
    function handleShowFile(breakpoint) {
        setFullscreen(breakpoint);
        setShowFile(true);
    }

    const downloadFile = (name) => {
        axios.get(downloadURL + name, {
            responseType: 'blob',
        }).then((response) => {
            FileDownload(response.data, `${name}`);
        });
    }

    return (
        <>
            <Button className={`${styles.show_downloaded}`} onClick={() => handleShowFile()}>
                <IconContext.Provider value={{
                    size: '20px'
                }}>
                    <div>
                        <TfiFiles />
                    </div>
                </IconContext.Provider>
            </Button>
            <Modal size="lg" show={showFile} fullscreen={fullscreen} onHide={() => setShowFile(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.modal_title}`}>Загруженные файлы студента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {downloaded.length === 0 ? "Студент пока не загружал файлы." :
                        (
                            downloaded.map((file, index) =>
                                <div key={index} className={`${styles.about_file}`}>
                                    <span className={`${styles.file_title}`}>{`${index + 1}. ${file.name}`}</span>
                                    <Button className={`${styles.download_button}`} onClick={() => downloadFile(file.name)}>
                                        <IconContext.Provider value={{
                                            size: '20px'
                                        }}>
                                            <div>
                                                <TfiDownload />
                                            </div>
                                        </IconContext.Provider>
                                    </Button>
                                </div>
                            )
                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseFile} className={`${styles.submit_button}`}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Uploads;