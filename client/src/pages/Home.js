//comments
import React from 'react';
import { Row, Col} from 'reactstrap';
// import { Header } from "./components/Header";
// import { Nav } from "./components/Nav";
import Resource from "../components/Resource";
import Search from '../components/Search';

const Home = () => {
    return (
        <div className="container">
            {/* <Header>
            <Nav></Nav>
            </Header> */}
            <Row xs={1} md={2}>
                <Col><h3>Welcome to<br></br>
                    TeachMeTo.</h3> 
                    <h4>The place to learn.</h4> 
                </Col>
            </Row>
            <Row>
                <Search></Search>
            </Row>
            <Row>
            <Resource></Resource>
            </Row>
        </div>
    );
};
    export default Home; 