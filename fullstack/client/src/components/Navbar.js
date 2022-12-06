import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaHome, FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo';
import { useAppContext } from '../context/appContext';


function Navbar() {
    const [showLogout, setShowLogout] = useState(false)

    const { user, toggleSidebar, logoutUser } = useAppContext()


    return (
        <Wrapper>
            <div className='nav-center'>
                <button className='toggle-btn' onClick={toggleSidebar}
                ><FaAlignLeft /></button>


                <div>
                    <Logo />

                    <h3 className='logo-text'>dashboard</h3>
                </div>

                <div className='btn-container'>
                    <button
                        className='btn'
                        onClick={() => setShowLogout(!showLogout)}
                    >

                        <FaUserCircle />
                        {user?.name}
                        name
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button
                            className='dropdown-btn'
                            onClick={
                                // console.log('logout')
                                logoutUser
                            }
                            type='button'
                        >logout
                        </button>
                    </div>

                </div>
            </div>
            {/* <FaHome /> */}
        </Wrapper>
    )
}

export default Navbar