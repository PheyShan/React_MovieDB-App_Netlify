import React from 'react';
import { Form, Button } from 'react-bootstrap';


const SearchBox = (props) => {
    return (
        <Form className="d-flex justify-content-end search-form" onSubmit={props.searchForMovie}>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 form-control"
                aria-label="Search"
                value={props.value}
                onChange={(e) => props.setSearchValue(e.target.value)}
            />
            <Button variant="secondary" type="submit">Search</Button>
        </Form>
    );
};

export default SearchBox;