import React, { useContext, useEffect, useState, useRef } from 'react'
import Base from '../component/Base'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/userContext'
import { loadAllCategories,loadPostById, updatePost as doUpdatePost } from '../services/api-service'
import { toast } from 'react-toastify'
import { Card, CardBody, Input, Form, Label, Container, Button } from 'reactstrap'
import JoditEditor from 'jodit-react'

function UpdateBlog() {

  const editor = useRef(null)
  const [categories, setCategories] = useState([])
  const { postId } = useParams()
  const object = useContext(userContext)
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  function updatePost(event) {
    event.preventDefault()
    console.log(post)
    doUpdatePost({ ...post, category: { categoryId: post.categoryId } }, post.postId)
      .then(response => {
        console.log(response)
        toast.success("Post Updated successfully !!")
      }).catch(error => {
        console.log(error)
        toast.error("Error occured ")
      })
  }

  useEffect(() => {

    loadAllCategories().then((data) => {
      console.log(data)
      setCategories(data)
    }).catch(error => {
      console.log(error)
    })

    loadPostById(postId).then(data => {
      setPost({ ...data, categoryId: data.category.categoryId })
    }).catch(error => {
      console.log(error)
      toast.error("Error in loading ")
    })
  }, []);

  useEffect(() => {

    if (!post) {
      if (post?.user?.id != object?.data?.user?.id) {
        toast.error("Not your post !")
        navigate('/')
      }
    }
  }, [post])

  function handleChange(event, fieldName) {
    setPost({
      ...post,
      [fieldName]: event.target.value
    })
  }


  function updateHtml() {
    return (
      <div className='wrapper mt-3'>
        <h3>Update Post Page </h3>
        <Card className='shadow'>
          <CardBody >
            <Form onSubmit={updatePost}>
              <div className='mt-1'>
                <Label style={{ fontWeight: 'bold' }} for='title'>Post Title</Label>
                <Input type='text'
                  id='title'
                  className='rounded-0'
                  name='title'
                  value={post.title}
                  onChange={(event) =>
                    handleChange(event, 'title')}
                />
              </div>

              <div className='mt-4'>
                <Label style={{ fontWeight: 'bold' }} for='content'>Post Content</Label>

                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={newContent => setPost({ ...post, content: newContent })}
                />
              </div>

              {/* File field */}
              <div className='mt-4'>
                <Label for='image'>Upload Image</Label>
                <Input id='image' type='file' onChange={''} accept="image/*" />
              </div>

              <div className='mt-4'>
                <Label style={{ fontWeight: 'bold' }} for='category'>Post Category</Label>
                <Input type='select'
                  disabled
                  id='category'
                  className='rounded-0'
                  name='categoryId'
                  onChange={(event) => handleChange(event, 'categoryId')}
                  value={post.categoryId}

                >

                  <option disabled value={0} >---Select Category---</option>

                  {
                    categories.map((category) => (
                      <option value={category.categoryId} key={category.categoryId}>
                        {category.categoryTitle}
                      </option>
                    ))
                  }

                </Input>

                <Container className='text-center mt-4'>
                  <Button type='submit' color='success'>Update Post</Button>
                </Container>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div >
    )
  }

  return (
    <>
      <Base>
        <Container>
          {post && updateHtml()}
        </Container>
      </Base>
    </>
  )
}

export default UpdateBlog
