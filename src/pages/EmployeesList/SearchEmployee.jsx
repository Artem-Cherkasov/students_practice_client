import React, {useState} from "react";
import styles from './SearchEmployee.module.scss'
import { Button, Form } from "react-bootstrap";
import { BsSearch } from 'react-icons/bs';
import { IconContext } from "react-icons/lib";
import axios from 'axios';

const employeesURL = "http://localhost:5000/api/employees/";

const SearchEmployee = props => {
    const [searchValue, setSearchValue] = useState("")

    const search = (event) => {
        axios.get(employeesURL + searchValue).then((response) => {
            props.setEmployees(response.data);
        });
        event.preventDefault();
    }

    const handleChange = (employee) => {
        setSearchValue(employee.target.value)
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

export default SearchEmployee;