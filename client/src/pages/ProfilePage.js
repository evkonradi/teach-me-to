import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../utils/queries";
import { Col, Row, Container } from "reactstrap";
import Resource from "../components/Resource";
import { Redirect, useParams, Link } from "react-router-dom";
import { Box } from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";
import Auth from "../utils/auth";
import CardResource from "../components/CardResource";
import { UPDATE_USER } from "../utils/mutations";


const ProfilePage = (props) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });
  const [updateUser] = useMutation(UPDATE_USER);

  const [userState, setUserState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    wallet: "",
    password: "",
  })

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    console.log("Login failed");
    return <Redirect to="/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <h1>Sign up | log in <span role="img" aria-label="Sign up | log in">🙂</span></h1>;
  }


  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setUserState({
      ...userState,
      [name]: value,
    });
    try {
      updateUser({ variables: { userParam, ...userState } })
    }
    catch(e){
      console.error(e);
    }
  };

  const isResourceFree = (cost) => {
    if ((Math.round(parseFloat(cost)*100)/100) === 0)
      return true;
    else
      return false;
  }

  return (
    <main>
      <div>
        <Container className="cardTextAlign">
        <Box h="40px" bg="transparent"></Box>
          <Box bg="#5C6B73" w="100%" p={4} color="#C2DFE3">
                <h3>Welcome Back, {`${user.firstName}`}!</h3>
              </Box>
              
            <Box className="profileLeft" minWidth="30%">
                <p className="profileField">Username</p> <span className="smallBox" contentEditable="true" onChange={handleChange} name={userState.username}>{`${user.username}`}</span>
                
                <p className="profileField">First Name</p> <span className="smallBox" contentEditable="true" onChange={handleChange} value={userState.firstName}>{`${user.firstName}`}</span>
                <p className="profileField">Last Name</p> <span className="smallBox" contentEditable="true" onChange={handleChange} value={userState.lastName}>{`${user.lastName}`}</span>
                <p className="profileField">Email</p> <span className="smallBox" contentEditable="true" onChange={handleChange} value={userState.email}>{`${user.email}`}</span>
                <p className="profileField">Wallet</p> ${`${user.wallet.toFixed(2)}`}<br></br><br></br>

                <Link className="statement" to="/statement/">See Statement</Link><br></br><br></br>
                <Box className="newPostBtn" >
                  <a className="plainA" href="/resource">Create New Post</a>
                </Box>
                <br></br>
            </Box>
            <Box minWidth="70%">
             
              <h4>My Contributions</h4>
              {user.resources.map((resource) => (
                  <Box>
                    <CardResource
                      resource={resource} useClass="card-img-size-search"
                    ></CardResource>
                    <span className="profileFreeOrPaid">
                      COST: {isResourceFree(resource.cost) ? (`FREE`) : (`$${resource.cost}` )}
                    </span>
                    <Link className="plain" to={`/resource/${resource._id}`}>
                      <Button className="edit">EDIT</Button>
                    </Link>
                    <br></br><br></br><br></br>
                  </Box>
                ))}

              {!user.resources.length ? <span className="profileFreeOrPaid">You have not contributed any resources yet.</span> : null }

              <h4>My Purchased resources</h4>
              {user.paidResources.map((resource) => (
                  <Box>
                    <CardResource
                      resource={resource} useClass="card-img-size-search"
                    ></CardResource>
                    <br></br><br></br><br></br>
                  </Box>
                ))}
              
              {!user.paidResources.length ? <span className="profileFreeOrPaid">You have not purchased any resources yet.</span> : null }

            </Box>
          <Row>
            <Col>
              <hr className="dividerProfile"></hr>
            </Col>
          </Row>
            <Col className="cardTextAlign">
              <p class="recentlyAddP">see what others are contributing</p>
            </Col>
          <Row>
            <Col className="cardTextAlign">
              <Resource></Resource>
            </Col>
          </Row>
          <br></br><br></br><br></br>
        </Container>
        <br />
      </div>
    </main>
  );
};

export default ProfilePage;
