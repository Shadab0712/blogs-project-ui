import React, { useContext, useEffect, useState } from 'react'
import { CardText, CardBody, Card, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { getCurrentUserDetails, isLoggedIn } from '../auth'

function Post({ post = { id: -1, title: "This is default post title", content: "This is default post content" }, deletePost }) {

    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)

    useEffect(() => {
        setUser(getCurrentUserDetails())
        setLogin(isLoggedIn())
    }, [])


    return (
        <Card className='shadow mb-3'>
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 60) }}>
                </CardText>
                <div>
                    <Link className='btn btn-secondary' to={'/posts/' + post.postId}>Read More</Link>
                    {isLoggedIn() && (user && user?.id === post?.user?.id) && (
                        <Button color='danger' className='ms-2' onClick={() => deletePost(post)}>
                            Delete Post
                        </Button>
                    )}
                    {isLoggedIn() && (user && user?.id === post?.user?.id) && (
                        <Button color='warning' className='ms-2'
                            tag={Link} to={`/user/update-blog/${post.postId}`}>
                            Update
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}

export default Post
