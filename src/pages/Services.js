import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Base from '../component/Base';

const About = () => {
  return (
    <div >
      <Base>
        <Container className="mt-5">
          <Row>
            <Col md={8}>
              <h2>About Us</h2>
              <p className="lead">
                Welcome to our amazing platform! We strive to provide a space for sharing thoughts,
                ideas, and stories. Connect with other users, explore various categories, and engage
                in meaningful conversations.
              </p>
              <p className="lead">
                Whether you're a seasoned blogger or just getting started, we're here to support your
                journey. Share your experiences, learn from others, and be a part of our vibrant community.
              </p>
            </Col>
            <Col md={4}>
              <img
                src="https://scatter.co.in/wp-content/uploads/2018/01/shutterstock_720876373.jpg"  // Replace with your image URL
                alt="About Us"
                className="img-fluid rounded-circle"
              />
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default About;
