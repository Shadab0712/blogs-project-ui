import React, { useEffect, useState } from 'react'
import CustomNavbar from '../component/CustomNavbar'
import { useParams, Link } from 'react-router-dom'
import { Card, CardBody, Container, Row, Col, CardText, Input, Button } from 'reactstrap'
import { toast } from "react-toastify";
import { loadPostById } from '../services/api-service';
import { createComment } from '../services/api-service';
import { isLoggedIn } from '../auth';
import { BASE_URL } from '../api/helper';

function PostPage() {

    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState({
        content: ''
    })

    useEffect(() => {
        loadPostById(postId).then(data => {
            console.log(data)
            setPost(data);
        }).catch(error => {
            console.log(error)
            toast.error("Error in fetching post !!")
        })

    }, [])

    function printDate(numbers) {
        return new Date(numbers).toLocaleDateString()
    }

    function submitComment() {

        if (!isLoggedIn()) {
            toast.error("Need to login first")
            return
        }

        if (comment.content.trim() === '') {
            return
        }

        createComment(comment, post?.postId)
            .then(data => {
                console.log(data)
                toast.success("Comment Added...")
                setComment({
                    comments: [...post.comments, data.data]
                })
            }).catch(error => {
                console.error("Error creating comment:", error);
                console.log(error)
            })
    }


    return (

        <div>
            <CustomNavbar />
            <Container className='mt-4'>
                <Link to='/'>Home</Link>
                <Row>
                    <Col md={{
                        size: 12
                    }}>
                        <Card className='mt-3'>
                            <CardBody>
                                <CardText>  Posted By   <b>{post?.user?.name}</b> on <b> {printDate(post?.addedDate)} </b>
                                </CardText>
                                <CardText>
                                    <span className='text-muted'>
                                        {post?.category?.categoryTitle}
                                    </span>
                                </CardText>

                                <CardText className='mt-3'>
                                    <h3>
                                        {post?.title}
                                    </h3>
                                </CardText>
                                <div className='image-container mt-4' style={{ maxWidth: '50%' }}>
                                    <img className='img-fluid' src={BASE_URL + '/post/image/' + post?.imageName} alt='' />
                                </div>
                                <CardText className='mt-3' dangerouslySetInnerHTML={{ __html: post?.content }}>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col md={{
                        size: 9,
                        offset: 1
                    }}>
                        <h3>Comments({post ? post.comments.length : 0})</h3>
                        {post?.comments && post.comments.map((comment, index) => (
                            <Card className='mt-2 border-0' key={index}>
                                <CardBody>
                                    <CardText>
                                        <h3>{comment?.content}</h3>
                                    </CardText>
                                </CardBody>
                            </Card>
                        ))}
                        <Card className='mt-4 border-0'>
                            <CardBody>
                                <Input
                                    type='textarea'
                                    placeholder='Enter Comment here'
                                    // value={comment.comment}
                                    onChange={(event) =>
                                        setComment({ content: event.target.value })}
                                >
                                </Input>
                                <Button onClick={submitComment} className='mt-2' color='primary'>Submit</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default PostPage
