import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/api-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

function CategorySideMenu() {

  const [category, setCategory] = useState([])

  useEffect(() => {
    loadAllCategories().then(data => {
      setCategory([...data])
    }).catch(error => {
      console.log(error)
      toast.error("Error in loading categories")
    })
  }, [])

  return (
    <div>
      <ListGroup className='border mt-3'>
        <ListGroupItem action={true} tag={Link} to={'/feeds'}>
          All Blogs
        </ListGroupItem>
        {category && category.map((cat, index) => {
          return (
            <ListGroupItem className='border-0 shadow-0 mt-1'
              tag={Link} to={'/category/' + cat.categoryId}
              key={index} action={true}>
              {cat.categoryTitle}
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default CategorySideMenu
