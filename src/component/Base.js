import React from 'react'
import CustomNavbar from './CustomNavbar'

function Base({ title = "Welcome to Blogs Aplication", children }) {
    return (
        <div>
            <CustomNavbar />
            {children}
        </div>
    )
}

export default Base
