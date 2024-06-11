import React, { useEffect, useState, useContext } from 'react'
import { doLogout, getCurrentUserDetails, isLoggedIn } from '../auth'
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown, Nav } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../context/userContext'

function CustomNavbar() {

    let navigate = useNavigate();
    const userContxtData = useContext(userContext);

    // for toggler
    const [isOpen, setIsOpen] = useState(false)

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        setLogin(isLoggedIn)
        setUser(getCurrentUserDetails())

    }, [login])

    function logout() {
        doLogout(() => {
            setLogin(false)
            userContxtData?.setUser({
                data: null,
                login: false
            })
            navigate('/login')
        })
    }

    return (
        <div>
            <Navbar color='dark' dark
                expand='md'
                fixed=''
                className='px-3'
            >

                <NavbarBrand tag={Link} to='/'>
                    MyBlogs
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className='me-auto'
                        navbar
                    >
                        <NavItem>
                            <NavLink tag={Link} to='/feeds'>
                                Feeds
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} to='/category/:categoryId"'>
                                Categories
                            </NavLink>
                        </NavItem>

                        {/*    <NavItem>
                            <NavLink tag={Link} to='/about'>
                                About
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={Link} to='/services'>
                                Services
                            </NavLink>
                        </NavItem>
 */}
                        <UncontrolledDropdown
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                            >
                                More
                            </DropdownToggle>

                            <DropdownMenu right>
                                <DropdownItem tag={Link} to='/services'>
                                    Contact Us
                                </DropdownItem>
                                <DropdownItem href='https://github.com/Shadab0712' target='_blank'>
                                    GitHub Profile
                                </DropdownItem>

                            </DropdownMenu>

                        </UncontrolledDropdown>
                    </Nav>

                    <Nav navbar>

                        {
                            login && (
                                <>

                                    <NavItem >
                                        <NavLink tag={Link} to={`/user/profile-info/${user.id}`}>
                                            Profile
                                        </NavLink>
                                    </NavItem>

                                    <NavItem >
                                        <NavLink tag={Link} to={'/user/dashboard'}>
                                            {user.username}
                                        </NavLink>
                                    </NavItem>

                                    <NavItem >
                                        <NavLink onClick={logout}>
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </ >
                            )
                        }
                        {
                            !login && (
                                <>
                                    <NavItem >
                                        <NavLink tag={Link} to={'/login'}>
                                            Login
                                        </NavLink>
                                    </NavItem>

                                    <NavItem >
                                        <NavLink tag={Link} to={'/signup'}>
                                            Signup
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                    </Nav>
                </Collapse>

            </Navbar>
        </div >
    )
}

export default CustomNavbar
