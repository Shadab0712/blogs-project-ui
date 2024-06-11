import React, { useEffect, useState, useRef } from 'react'
import { Card, CardBody, Input, Form, Label, Container, Button } from 'reactstrap'
import axios from 'axios'
import { category_api_url } from '../api/helper'
import JoditEditor from 'jodit-react'
import { getCurrentUserDetails } from '../auth'
import { toast } from "react-toastify";
import { uploadPostImage } from '../services/api-service'

function AddPost() {

  const editor = useRef(null)

  const [categories, setCategories] = useState([])
  const [user, setUser] = useState(undefined)

  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryId: ''
  })

  const [image, setImage] = useState(null)

  // image change
  function handleImageChange(event) {
    console.log(event.target.files[0])
    setImage(event?.target?.files[0])
  }


  useEffect(() => {
    const fetchUser = getCurrentUserDetails();
    setUser(fetchUser)
    loadAllCategories().then((data) => {
      console.log(data)
      setCategories(data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  function submitHandler(event) {
    event.preventDefault();
    console.log(post);
    if (post.title.trim() === '') {
      alert("Post Title is required !!");
      return;
    }

    if (post.content.trim() === '') {
      alert("Post Content is required !!");
      return;
    }

    if (post.categoryId === '') {
      alert("Select some category !!");
      return;
    }

    post['userId'] = user.id;

    // Call the createPost function and handle the promise
    createPost(post)
      .then(data => {
        // Upload image after post creation and handle the promise
        return uploadPostImage(image, data?.postId);
      })
      .then(data => {
        toast.success(' Image Uploaded !!');
        toast.success(' Post Created !!');
        // Clear form fields after successful submission
        setPost({
          title: '',
          content: '',
          categoryId: ''
        });
      })
      .catch(error => {
        toast.error('Error creating post or uploading image');
        console.log(error);
      });
  }

  function createPost(post) {
    return axios.post(
      `http://localhost:8086/api/v1/user/${post.userId}/category/${post.categoryId}/posts`,
      post
    ).then(response => response.data); // Return the response data
  }

  function loadAllCategories() {
    return axios.get(`${category_api_url}/allCategory`).then(response => { return response.data })
  }

  return (

    <div className='wrapper mt-3'>
      <h3>What's going in your mind ? </h3>
      <Card className='shadow'>
        <CardBody >
          <Form onSubmit={submitHandler}>
            <div className='mt-1'>
              <Label style={{ fontWeight: 'bold' }} for='title'>Post Title</Label>
              <Input type='text'
                id='title'
                placeholder='Enter Here'
                className='rounded-0'
                name='title'
                onChange={(event) => {
                  setPost({ ...post, title: event.target.value })
                }}
              />
            </div>

            <div className='mt-4'>
              <Label style={{ fontWeight: 'bold' }} for='content'>Post Content</Label>

              <JoditEditor
                ref={editor}
                value={post.content}
                name='content'
                tabIndex={1} // Add tabIndex to avoid potential focus issues
                onBlur={(newContent) => {
                  setPost({ ...post, content: newContent });
                }}
              />
            </div>

            {/* File field */}
            <div className='mt-4'>
              <Label for='image'>Upload Image</Label>
              <Input id='image' type='file' onChange={handleImageChange} accept="image/*" />
            </div>

            <div className='mt-4'>
              <Label style={{ fontWeight: 'bold' }} for='category'>Post Category</Label>
              <Input type='select'
                id='category'
                placeholder='Enter Here'
                className='rounded-0'
                name='categoryId'
                onChange={(event) => {
                  setPost({ ...post, categoryId: event.target.value })
                }}
                defaultValue={0}
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
                <Button type='submit' color='success'>Create Post</Button>
                <Button className='ms-3' color='danger'>Reset Content</Button>
              </Container>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div >
  )
}

export default AddPost
