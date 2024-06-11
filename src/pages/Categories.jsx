import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row, Container } from 'reactstrap';
import CategorySideMenu from '../component/CategorySideMenu';
import { loadPostByCategory, deletePostById } from '../services/api-service';
import Post from '../component/Post';
import Base from '../component/Base';
import { toast } from 'react-toastify'

function Categories() {

  const [posts, setPosts] = useState([])

  const { categoryId } = useParams()

  useEffect(() => {
    console.log(categoryId)
    loadPostByCategory(categoryId).then(data => {
      setPosts([...data])
    }).catch(error => {
      console.log(error)
      console.log("Error in loading categories")
    })
  }, [categoryId])

  function deletePost(post) {
    deletePostById(post.postId).then(data => {
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
        <Container className='mt-11'>
          <Row>
            <Col md={3} className='border'>
              <CategorySideMenu />
            </Col>
            <Col md={9}>
              <h1> Blogs Count ({posts.length}) </h1>
              {
                posts && posts.map((post, index) => {
                  return (
                    <Post key={index} post={post} deletePost={deletePost} />
                  )
                })
              }

              {posts.length <= 0 ? <h1>No active posts in this category</h1> : ''}
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  )
}

export default Categories
