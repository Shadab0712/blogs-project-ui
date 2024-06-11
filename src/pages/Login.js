import React, { useState, useEffect, useContext } from 'react'
import { Card, CardBody, CardHeader, Container, FormGroup, Row, Col, Form, Label, Input, Button, } from 'reactstrap'
import axios from 'axios';
import user_api_url from '../api/helper';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../auth';
import Base from '../component/Base';
import userContext from '../context/userContext';

function Login() {

    const userContxtData = useContext(userContext);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Login | Blogs.com'
    }, []);

    const [loginDetails, setLoginDetails] = useState({});

    function signupHandler() {
        navigate('/signup');
    }

    function loginHandler(event) {
        event.preventDefault();
        login(loginDetails);
        console.log(loginDetails);
    };

    function login(loginDetails) {
        axios.post(`${user_api_url}/login`, loginDetails)
            .then((response) => {
                const { data } = response;
                doLogin(data, () => {
                    console.log('Login details saved to local storage');
                    userContxtData?.setUser({
                        data: data.user,
                        login: true
                    });
                    navigate('/user/dashboard');
                });
                localStorage.setItem('token - ', data.token);
                const expiration = new Date();
                expiration.setHours(expiration.getHours() + 1);
                localStorage.setItem('expiration', expiration.toISOString());
                console.log("User login: " + data.token);
                toast.success("User Logged in successfully !")
            }).catch(error => {
                console.log(error)
                toast.error("Something went wrong on server!")
            })
    };

    return (
        <>
            <Base>
                <Container>
                    <Row className='mt-4'>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card color='dark' outline='true'>
                                <CardHeader>
                                    <h2>Please Login</h2>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={loginHandler}>
                                        <FormGroup>
                                            <Label style={{ fontWeight: 'bold' }} for="email">Enter Username</Label>
                                            <Input
                                                type='username'
                                                placeholder='Enter email here'
                                                id='username'
                                                onChange={(event) => {
                                                    setLoginDetails({ ...loginDetails, username: event.target.value })
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
                                                    setLoginDetails({ ...loginDetails, password: event.target.value })
                                                }}
                                            />
                                        </FormGroup>
                                        <Container className='text-center'>
                                            <Button outline color='success'>Login</Button>
                                            <Button outline color='warning' type='reset' className='ms-2'>Reset</Button>
                                            <Button type='submit' outline color='success ms-2'
                                                onClick={signupHandler}>Signup</Button>
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

export default Login
