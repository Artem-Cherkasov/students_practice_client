import React, {useState} from "react";
import styles from './SearchStudent.module.scss'
import { Button, Form } from "react-bootstrap";
import { BsSearch } from 'react-icons/bs';
import { IconContext } from "react-icons/lib";
import axios from 'axios';

const searchStudentsURL = "http://localhost:5000/api/students/";

const SearchStudent = props => {
    const [searchValue, setSearchValue] = useState("")

    const search = (event) => {
        axios.get(searchStudentsURL + searchValue).then((response) => {
            props.setStudents(response.data);
        });
        event.preventDefault();
    }

    const handleChange = (student) => {
        setSearchValue(student.target.value)
    }

    return (
        <Form noValidate onSubmit={search} className={`${styles.form}`}>
            <Form.Group className={`${styles.search}`}>
                <Form.Control required autoFocus placeholder="Поиск..." onChange={handleChange} className={`${styles.search_input}`} />
                <Button type="submit" variant="primary" className={`${styles.searchButton}`}>
                    <IconContext.Provider value={{
                        size: '20px'
                    }}>
                        <div>
                            <BsSearch />
                        </div>
                    </IconContext.Provider>
                </Button>
            </Form.Group>
        </Form>
    )
}

export default SearchStudent;