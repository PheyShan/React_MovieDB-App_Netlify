import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const MovieNavBar = (props) => {
    const { SearchBox, setSearchValue, searchForMovie } = props;

    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/home">MovieDB App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {
                            props.arr.map((genre, index) =>
                                <Nav.Link href="#" name={genre} onClick={(e) => props.getMovieData(e.target.name)} key={index} className="link">{genre}</Nav.Link>
                            )
                        }
                    </Nav>
                    <>
                        <SearchBox
                            setSearchValue={setSearchValue}
                            searchForMovie={searchForMovie} />
                    </>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MovieNavBar;