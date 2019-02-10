import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class NewStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(event) {
    axios
      .post("https://research-hub-cs.azurewebsites.net/api/researchPosting/a", {
        author: "this.state.author",
        organization: "this.state.organization",
        projectDescription: "this.state.projectDescription",
        projectName: "this.state.projectName"
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    console.log(this.state.author);
    console.log(this.state.organization);
    console.log(this.state.projectDescription);
    console.log(this.state.projectName);

    event.preventDefault();
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  // author: "yees",
  // organization: "Microsoft",
  // projectDescription: "Yeeee",
  // projectName: "My yee life"

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>New Study</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.onNewPost}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  name="author"
                  onChange={this.handleChange}
                  placeholder="Author"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  name="organization"
                  onChange={this.handleChange}
                  placeholder="Organization"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="projectName"
                  onChange={this.handleChange}
                  placeholder="Title..."
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder="Description..."
                  name="projectDescription"
                  onChange={this.handleChange}
                  as="textarea"
                  rows="3"
                />
              </Form.Group>
              <Button variant="outline-secondary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
