import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import axios from "axios";
import PortalLogoBlue from "../images/PortalLogoBlue.svg";
import HomeLogo from "../images/outline-home-24px.svg";
import HelpLogo from "../images/outline-live_help-24px.svg";
import NewFolderLogo from "../images/outline-create_new_folder-24px.svg";
import SpecialFolderLogo from "../images/outline-folder_special-24px.svg";
import NotificationLogo from "../images/sharp-notifications_none-24px.svg";
import CloudLogo from "../images/outline-cloud_download-24px.svg";
import ShareLogo from "../images/outline-share-24px.svg";
import LeftLogo from "../images/sharp-keyboard_arrow_left-24px.svg";
import BaselineLogo from "../images/baseline-assessment-24px.svg";
import ShareGroupLogo from "../images/sharp-group-24px.svg";
import CircleDude from "../images/CircleDude.svg";
import SearchLogo from "../images/baseline-search-24px.svg";

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
          <Col md={{ span: 2 }}>
            <div className="mycontent-left">
              <h3>Research Hub</h3>
              <div className="control-space" />
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Item as="li">
                  <Row>
                    <Col md={{ span: 1 }}>
                      <Image src={HomeLogo} width="20" />
                    </Col>
                    <Col>
                      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    </Col>
                  </Row>
                </Nav.Item>
                <Nav.Item as="li">
                  <Row>
                    <Col md={{ span: 1 }}>
                      <Image src={NewFolderLogo} width="20" />
                    </Col>
                    <Col>
                      <Nav.Link href="/newstudy">New Study</Nav.Link>
                    </Col>
                  </Row>
                </Nav.Item>
                <Nav.Item as="li">
                  <Row>
                    <Col md={{ span: 1 }}>
                      <Image src={SpecialFolderLogo} width="20" />
                    </Col>
                    <Col>
                      <Nav.Link href="/">Group Studies</Nav.Link>
                    </Col>
                  </Row>
                </Nav.Item>
                <Nav.Item as="li">
                  <Row>
                    <Col md={{ span: 1 }}>
                      <Image src={HelpLogo} width="20" />
                    </Col>
                    <Col>
                      <Nav.Link href="/">Help</Nav.Link>
                    </Col>
                  </Row>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          {/* Left navbar */}
          <Col>
            <Row>
              <Col md={{ offset: 8 }}>
                <Image src={SearchLogo} />
                <Image src={NotificationLogo} />
                <Image src={CircleDude} />
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
                <h5 className="mt-5">
                  Does sleep deprivation impact problematic eating?
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Nav defaultActiveKey="/home" as="ul">
                      <Nav.Item as="li">
                        <Row>
                          <Col md={{ span: 1 }}>
                            <Image src={CloudLogo} width="20" />
                          </Col>
                          <Col>
                            <a href="/somefile.txt" download>
                              download
                            </a>
                            <Nav.Link href="/home">Download</Nav.Link>
                          </Col>
                        </Row>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Row>
                          <Col md={{ span: 1 }}>
                            <Image src={ShareGroupLogo} width="20" />
                          </Col>
                          <Col>
                            <Nav.Link href="/home">Share</Nav.Link>
                          </Col>
                        </Row>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Row>
                          <Col md={{ span: 1 }}>
                            <Image src={BaselineLogo} width="20" />
                          </Col>
                          <Col>
                            <Nav.Link href="/home">Customize</Nav.Link>
                          </Col>
                        </Row>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <h3 className="mb-3">Results</h3>
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
          </Col>
        </Row>
      </Container>
    );
  }
}

{
  /* <Col md={{ span: 1 }}>
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
</Col> */
}
