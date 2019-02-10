import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class NewStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(event) {
    event.preventDefault();
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

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
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Title..." />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
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
