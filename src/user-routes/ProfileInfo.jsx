import React, { useContext, useEffect, useState } from 'react'
import Base from '../component/Base'
import userContext from '../context/userContext'
import { useParams } from 'react-router-dom'
import { getUser } from '../services/api-service'
import { Row, Col } from 'reactstrap'
import ViewUserProfile from '../component/ViewUserProfile'


function ProfileInfo() {

  const object = useContext(userContext)
  const { userId } = useParams()
  const [user, setUser] = useState(null)


  useEffect(() => {
    getUser(userId).then(data => {
      console.log(data)
      setUser({ ...data })
    })
  }, [])

  function userView() {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <ViewUserProfile user={user} />
        </Col>
      </Row>
    )
  }

  return (
    <Base>
      {user ? userView() : 'Loading user...'}
    </Base >
  )
}

export default ProfileInfo
