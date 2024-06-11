import axios from 'axios';

import {
    category_api_url, update_post, comment_api_url, get_post_api_url,
    get_posts_api_url, image_api_url, get_posts_by_user, get_user
} from '../api/helper';

// loading all categories from database
export function loadAllCategories() {
    return axios.get(`${category_api_url}/allCategory`).then(response => { return response.data })
}


// loading all posts from database
export function loadAllPosts(pageNumber, pageSize) {
    return axios.get(`${get_posts_api_url}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(response => { return response.data })
}

// loading single post of particular Id from database
export function loadPostById(postId) {
    return axios.get(`${get_post_api_url}/${postId}`)
        .then(response => { return response.data })
}

// creating comment
export function createComment(comment, postId) {
    return axios.post(`${comment_api_url}/${postId}/comment`, comment)
        .then(response => { return response.data })
}

export function loadPostByCategory(categoryId) {
    return axios.get(`${category_api_url}/${categoryId}/posts`)
        .then(response => { return response.data })

}

export function loadPostUserWise(userId) {
    return axios.get(`${get_posts_by_user}/${userId}/posts`)
        .then(response => { return response.data })
}

export function deletePostById(postId) {
    return axios.delete(`${get_post_api_url}/${postId}`)
        .then(response => { return response.data })
}

// upload image
export function uploadPostImage(image, postId) {
    const formData = new FormData();
    formData.append("image", image);
    return axios
        .post(`${image_api_url}/${postId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => { return response.data })
}

// update Post
export function updatePost(post, postId) {
    console.log(post)
    return axios.put(`${update_post}/${postId}`, post)
        .then(response => { return response.data })
}

export function getUser(userId) {
    return axios.get(`${get_user}/${userId}`)
        .then(response => { return response.data })
}