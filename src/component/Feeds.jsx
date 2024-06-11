import React, { useEffect, useState } from 'react'
import { loadAllPosts } from '../services/api-service'
import { Row, Col, PaginationItem, Pagination, PaginationLink, Container } from 'reactstrap'
import Post from './Post';
import Base from './Base';
import { toast } from "react-toastify";
import InfiniteScroll from 'react-infinite-scroll-component'
import { loadPostUserWise, deletePostById } from '../services/api-service'

function Feeds() {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        pageNumber: '',
        totalElements: '',
        pageSize: '',
        lastPage: false
    });

    const [currentPage, setCurrentPage] = useState(0);


    useEffect(() => {
        changePage(currentPage)
    }, [currentPage]);

    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return
        }

        if (pageNumber < postContent.pageNumber && postContent.lastPage == 0) {
            return
        }

        loadAllPosts(pageNumber, pageSize).then((data) => {

            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                pageNumber: data.pageNumber,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage
            });
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading post")
        })
    }

    function deletePost(post) {
        deletePostById(post.postId).then(data => {
            console.log(data)
            toast.success("Post deleted successfully !!")
            let newPostContents = postContent.content.filter(p => p.postId != post.postId)
            setPostContent({ ...postContent, content: newPostContents })
        }).catch(error => {
            console.log(error)
            toast.error("Error deleting post")
        })
    }

    function changePageInfinite() {
        (setCurrentPage(currentPage + 1))
    }

    return (
        <>
            <Base>
                <div className='container-fluid'>
                    <Row>
                        <Col md={
                            {
                                size: 12
                            }
                        }>
                            <h1>Blogs Content ({postContent?.totalElements})</h1>
                            <InfiniteScroll
                                dataLength={postContent.content.length}
                                next={changePageInfinite}
                                hasMore={!postContent.lastPage}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }

                            >
                                {
                                    postContent.content.map((post) => (
                                        <Post deletePost={deletePost} post={post} key={post.postId} />
                                    ))
                                }
                            </InfiniteScroll>

                            {/* <Container className='mt-3'>
                            <Pagination>
                                <PaginationItem
                                    onClick={() => changePage(postContent.pageNumber - 1)}
                                    disabled={postContent.pageNumber === 0}>
                                    <PaginationLink previous >
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>
                                {
                                    [...Array(postContent.totalPages)].map((item, index) => (

                                        <PaginationItem onClick={() => changePage(index)} active={index === postContent.pageNumber} key={index}>
                                            <PaginationLink>
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))
                                }

                                <PaginationItem
                                    onClick={() => changePage(postContent.pageNumber + 1)}
                                    disabled={postContent.lastPage}>
                                    <PaginationLink next>
                                        Next
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </Container> */}
                        </Col>
                    </Row>
                </div>
            </Base>
        </>
    )
}

export default Feeds
