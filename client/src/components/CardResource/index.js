import React from "react";
// import { Card, CardText, CardBody, CardHeader }  from "reactstrap";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle, CardText } from "react-bootstrap"

const CardResource = ({resource, imgWidth}) =>{

  return (
    <Link className="mainCard" to={`/articles/${resource._id}`} key={resource._id}>
      <Card outline color='dark'>
        <Card.Body>
        <Card.Title>{resource.name}</Card.Title>
          <Card.Img variant="top" src={resource.images.length ? resource.images[0].fileURL : "/images/favicon-16x16.png"} style={{width:imgWidth}} alt = {resource.name} />
          <Card.Text>{resource.shortDescription}</Card.Text>
          <Card.Text>Created: {resource.dateCreated} by {resource.displayName}</Card.Text>
          <br></br>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CardResource;