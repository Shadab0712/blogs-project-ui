import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../auth';

function Privateroute() {

    if (isLoggedIn()) {
        return <Outlet />
    } else {
        return <Navigate to={'/login'} />
    }

}

export default Privateroute
