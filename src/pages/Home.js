import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Base from '../component/Base';

function Home() {

  return (
    <>
      <Base>
        <Container className='mt-3'>
          <Row>
            <Col md={6} className='pt-5'>
              <h1>Welcome to this Blog Platform</h1>
              <p className="lead">
                Discover a world of engaging and diverse content. From insightful articles to captivating
                stories, find blogs that cater to your interests. Connect with a community of writers and
                readers who share your passion.
              </p>
              <hr></hr>
              <br></br>
              <p className="lead">
                Start your journey of exploration now!</p>
            </Col>
            <Col md={6}>
              {/* You can add images, banners, or any other visual elements here */}
              <img
                src="https://indiacsr.in/wp-content/uploads/2023/06/Blogging-Future-in-India.jpg"
                alt="Illustrative Image"
                style={{ width: '110%', height: '500px' }}
              />
            </Col>
          </Row>
        </Container>
      </Base>
    </>
  );
}

export default Home;
