import React, { Component } from "react";
import NavBar from "./common/NavBar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import "./Login.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PortalLogoBlue from "../images/PortalLogoBlue.svg";
import PortalLogoWhite from "../images/PortalLogoWhite.svg";
import Image from "react-bootstrap/Image";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyD8geOVKA3HUZ4e65k_X9kyb7J9MFkw4wo",
  authDomain: "research-hub-26239.firebaseapp.com",
  databaseURL: "https://research-hub-26239.firebaseio.com",
  storageBucket: "research-hub-26239.appspot.com"
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/dashboard",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

export default class Login extends Component {
  componentDidMount() {
    document.body.className = "body-background"; // Or set the class
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 1 }}>
            <Image className="mt-3" src={PortalLogoWhite} />
          </Col>
          <Col>
            <h3 className="portal mt-4">Portal</h3>
          </Col>
        </Row>
        <div className="space-control" />
        <Row>
          <Col md={{ span: 4, offset: 4 }} className="text-center ">
            <Card>
              <Image className="my-3" src={PortalLogoBlue} />
              <Card.Body>
                <Card.Title className="mb-3">Research Hub</Card.Title>
                <Card.Subtitle className="mb-5">
                  Visualize your research results in one place.
                </Card.Subtitle>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
