import React from 'react'
import { Card, CardBody, Container, Table } from 'reactstrap'

function ViewUserProfile({ user }) {
    return (
        <>
            <h3 className='text-uppercase mt-5'>User Information</h3>

            <Card className='mt-2 shadow'>
                <CardBody>
                    <Container className='text-center'>
                        <img style={{ maxWidth: '200px', maxHeight: '200px' }}
                            src='https://png.pngtree.com/png-clipart/20200225/original/pngtree-beautiful-profile-glyph-vector-icon-png-image_5261832.jpg'
                            alt='my-image' />
                    </Container>
                    <Table hover bordered={true} className='mt-5 text-center'>
                        <tbody>
                            <tr>
                                <td>
                                    BWA ID
                                </td>
                                <td>
                                    BWA{user.id}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    BWA NAME
                                </td>
                                <td>
                                    {user.name}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    BWA EMAIL
                                </td>
                                <td>
                                    {user.username}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    BWA CONTACT
                                </td>
                                <td>
                                    +91 {user.mobileNumber}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </>
    )
}

export default ViewUserProfile
