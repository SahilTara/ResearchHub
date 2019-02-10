import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import axios from "axios";
import PortalLogoBlue from "../images/PortalLogoBlue.svg";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
const data = [
  { name: "Feb-1", pv: 2400 },
  { name: "Feb-2", pv: 1398 },
  { name: "Feb-3", pv: 9800 },
  { name: "Feb-4", pv: 3908 },
  { name: "Feb-5", pv: 4800 },
  { name: "Feb-6", pv: 3800 },
  { name: "Feb-6", pv: 4300 }
];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // fetch("https://research-hub-cs.azurewebsites.net/api/researchPosting/all", {
  //   mode: "cors"
  // })
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(myJson) {
  //     console.log(JSON.stringify(myJson));
  //   });

  componentDidMount() {
    console.log("Mounted!!!!!!!!!");
    axios
      .get("https://research-hub-cs.azurewebsites.net/api/researchPosting/all")
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Does sleep deprivation impact problematic eating?</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 1 }}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Item as="li">
                <Row>
                  <Col md={{ span: 1 }}>
                    <Image src={PortalLogoBlue} width="20" />
                  </Col>
                  <Col>
                    <Nav.Link href="/home">Active</Nav.Link>
                  </Col>
                </Row>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Item as="li">
                  <Row>
                    <Col md={{ span: 1 }}>
                      <Image src={PortalLogoBlue} width="20" />
                    </Col>
                    <Col>
                      <Nav.Link href="/home">Active</Nav.Link>
                    </Col>
                  </Row>
                </Nav.Item>
                <Nav.Item as="li">
                  <Row>
                    <Col md={{ span: 1 }}>
                      <Image src={PortalLogoBlue} width="20" />
                    </Col>
                    <Col>
                      <Nav.Link href="/home">Active</Nav.Link>
                    </Col>
                  </Row>
                </Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Row>
              <Col>
                <Nav defaultActiveKey="/home" as="ul">
                  <Nav.Item as="li">
                    <Row>
                      <Col md={{ span: 1 }}>
                        <Image src={PortalLogoBlue} width="20" />
                      </Col>
                      <Col>
                        <Nav.Link href="/home">Active</Nav.Link>
                      </Col>
                    </Row>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Row>
                      <Col md={{ span: 1 }}>
                        <Image src={PortalLogoBlue} width="20" />
                      </Col>
                      <Col>
                        <Nav.Link href="/home">Active</Nav.Link>
                      </Col>
                    </Row>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Row>
                      <Col md={{ span: 1 }}>
                        <Image src={PortalLogoBlue} width="20" />
                      </Col>
                      <Col>
                        <Nav.Link href="/home">Active</Nav.Link>
                      </Col>
                    </Row>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col>
                <LineChart
                  width={600}
                  height={300}
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
