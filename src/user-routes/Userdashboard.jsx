import React, { useEffect, useState } from 'react'
import Base from '../component/Base'
import AddPost from '../pages/AddPost'
import { Container } from 'reactstrap'
import { getCurrentUserDetails } from '../auth'
import { loadPostUserWise, deletePostById } from '../services/api-service'
import Post from '../component/Post'
import { toast } from 'react-toastify'

function Userdashboard() {

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(getCurrentUserDetails())
        setUser(getCurrentUserDetails())
        loadPostdata()
    }, [])

    function loadPostdata() {
        loadPostUserWise(getCurrentUserDetails().id).then(data => {
            console.log(data)
            setPosts([...data])
        }).catch(error => {
            console.log(error)
            console.log(" Error Occured !!  ")
        })
    }

    function deletePost(post) {
        deletePostById(post?.postId).then(data => {
            console.log(data)
            toast.success("Post deleted successfully !!")
            let newPosts = posts.filter(p => p.postId != post.postId)
            setPosts([...newPosts])
        }).catch(error => {
            console.log(error)
            toast.error("Error deleting post")
        })
    }

    return (
        <div>
            <Base>
                <Container>
                    <AddPost />
                    <h1 className='my-3'> Posts Count : ({posts.length}) </h1>
                    {
                        posts.map((post, index) => {
                            return (
                                <Post post={post} key={index} deletePost={deletePost} />
                            )
                        })
                    }
                </Container>
            </Base>
        </div>
    )
}

export default Userdashboard
