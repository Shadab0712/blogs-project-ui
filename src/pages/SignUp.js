import React, { useState, useEffect } from 'react'
import { Container, Card, CardHeader, CardBody, FormGroup } from 'reactstrap'
import { Row, Col, Label, Input, Form, Button } from 'reactstrap'
import axios from 'axios';
import user_api_url from '../api/helper';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Base from '../component/Base';


function SignUp() {

    useEffect(() => {
        document.title = 'Register | Blogs.com'
    }, []);

    const [data, setData] = useState({});

    const navigate = useNavigate();

    function loginHandler() {
        navigate("/login");
    }

    function submitHandler(event) {
        event.preventDefault();
        console.log(data);
        signup(data);
    }

    function signup(data) {
        axios.post(`${user_api_url}/signup`, data).then(
            (response) => {
                console.log(response);
                toast.success("User Registered successfully", {
                    position: 'bottom-center'
                });

            },
            (error) => {
                console.log(error);
                toast.error("Error Occured while Signup", {
                    position: 'bottom-center'
                });
            });
        navigate('/login')
    };

    return (
        <>
            <Base>
                <Container>
                    <Row className='mt-4'>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card color='dark' outline='true'>
                                <CardHeader>
                                    <h2>Please Register</h2>
                                </CardHeader>
                                <CardBody >
                                    <Form onSubmit={submitHandler}>
                                        <FormGroup>
                                            <Label style={{ fontWeight: 'bold' }} for="name">Enter Name</Label>
                                            <Input
                                                type='text'
                                                placeholder='Enter name here'
                                                id='name'
                                                onChange={(event) => {
                                                    setData({ ...data, name: event.target.value })
                                                }}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label style={{ fontWeight: 'bold' }} for="username">Enter Username</Label>
                                            <Input
                                                type='username'
                                                placeholder='Enter email here'
                                                id='username'
                                                onChange={(event) => {
                                                    setData({ ...data, username: event.target.value })
                                                }}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label style={{ fontWeight: 'bold' }} for="password">Enter Password</Label>
                                            <Input
                                                type='password'
                                                placeholder='Enter password here'
                                                id='password'
                                                onChange={(event) => {
                                                    setData({ ...data, password: event.target.value })
                                                }}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label style={{ fontWeight: 'bold' }} for="mobileNumber">Enter Mobile Number</Label>
                                            <Input
                                                type='mobileNumber'
                                                placeholder='Enter mobile number here'
                                                id='mobileNumber'
                                                onChange={(event) => {
                                                    setData({ ...data, mobileNumber: event.target.value })
                                                }}
                                            />
                                        </FormGroup>

                                        <Container className='text-center'>
                                            <Button type='submit' outline color='success'>Register</Button>
                                            <Button outline color='warning' type='reset' className='ms-2'>Reset</Button>
                                            <Button type='submit' outline color='success' className='ms-2'
                                                onClick={loginHandler} >LogIn</Button>
                                        </Container>

                                    </Form>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Base>
        </>
    )
}

export default SignUp
