import React from 'react';
import { Jumbotron, Col} from 'reactstrap';
import Resource from "../components/Resource";
import Search from '../components/Search';
import logo from "./teach_me_to_logo-01.png";
import { Link } from 'react-router-dom';
import { Box } from "@chakra-ui/core";

const Home = () => {
    return (
        <div >
            
            <Jumbotron className="hometron">
            <img className="medium" src={logo} alt="logo, teach me to" />
                    <Col className="heading"  text="center">
                    <h1 className="title">Teach Me To.</h1>
                    <h4 className="byline">What do you want to learn today?</h4>
                    </Col>
            </Jumbotron>
            
            <Col className="homesearch" sm={{size:8, offset:2}} lg={{ size:6, offset:3}}>
                <Search></Search>
            </Col>
            
            <p className="recentlyAddP">Recently Added</p>

            <Box id="col2" sm={{size:8, offset:2}} lg={{ size:6, offset:3}} className="carouselMain" >
                <Resource></Resource>
            </Box> 
            
            <Jumbotron className="whitespace" align="center">
            <Box className="copyBox" maxW="50%">
            <p className="copy"> Start creating and sharing your knowledge with others on TeachMeTo.</p> 
            <p className="copy">Add images, video, and the "written" word.</p>
            <Link className="copyLink" to="/signup">Signup |</Link>
            <Link className="copyLink" to="/login">Login</Link>
            </Box>
            </Jumbotron>
            
        </div>
    );
};
    export default Home; 